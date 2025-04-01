import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./config/firebaseConfig";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";

const CheckoutOrdered = () => {
  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("timestamp", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setLatestOrder(querySnapshot.docs[0].data());
        } else {
          setError("No recent orders found.");
        }
      } catch (error) {
        console.error("🔥 Error fetching latest order:", error);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestOrder();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#16a34a" />
        <Text className="text-gray-600 mt-2">Fetching order details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-6">
        <Text className="text-red-500 text-lg font-bold">{error}</Text>
        <TouchableOpacity
          className="mt-4 px-6 py-3 bg-green-700 rounded-lg"
          onPress={() => router.push("home")}
        >
          <Text className="text-white text-lg font-semibold">Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <AnimatePresence>
        <MotiView
          key="success-message"
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 500 }}
          className="p-4 bg-white rounded-xl shadow-lg"
        >
          <Text className="text-2xl font-bold text-center text-green-700">
            🎉 Order Successful!
          </Text>
          <Text className="text-lg text-center text-gray-700 mt-2">
            Thank you for your purchase. Your order has been placed
            successfully.
          </Text>
        </MotiView>

        {/* Product Details */}
        <MotiView
          key="product-details"
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 200 }}
          className="mt-6 p-4 bg-white rounded-xl shadow-lg"
        >
          <Image
            source={{ uri: latestOrder.productImage }}
            className="w-full h-48 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-xl font-semibold mt-2">
            {latestOrder.productName}
          </Text>
          <Text className="text-lg text-green-600 font-bold">
            ${latestOrder.price}
          </Text>
          <Text className="text-gray-700 mt-2">
            {latestOrder.productDescription}
          </Text>
        </MotiView>

        {/* Shipping Details */}
        <MotiView
          key="shipping-details"
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 300 }}
          className="mt-6 p-4 bg-white rounded-xl shadow-lg"
        >
          <Text className="text-xl font-bold">📍 Shipping Details</Text>
          <Text className="text-lg">{latestOrder.name}</Text>
          <Text className="text-gray-600">{latestOrder.address}</Text>
          <Text className="text-gray-600">📞 {latestOrder.phoneNumber}</Text>
          <Text className="text-gray-600">📧 {latestOrder.email}</Text>
        </MotiView>

        {/* Payment Method */}
        <MotiView
          key="payment-method"
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 400 }}
          className="mt-6 p-4 bg-white rounded-xl shadow-lg"
        >
          <Text className="text-xl font-bold">💳 Payment Method</Text>
          <Text className="text-lg">{latestOrder.paymentMethod}</Text>
        </MotiView>

        {/* Back to Home Button */}
        <TouchableOpacity
          key="go-home-button"
          className="mt-6 p-4 bg-green-700 rounded-xl shadow-lg"
          onPress={() => router.push("home")}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Go to Home
          </Text>
        </TouchableOpacity>
      </AnimatePresence>
    </ScrollView>
  );
};

export default CheckoutOrdered;
