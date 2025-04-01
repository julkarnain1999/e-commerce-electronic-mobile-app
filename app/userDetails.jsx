import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { collection, where, getDocs, query, addDoc } from "firebase/firestore";
import { db } from "./config/firebaseConfig"; // Firebase configuration
import { useRouter } from "expo-router";

const UserDetails = () => {
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // User details
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!productId) {
      Alert.alert("Error", "Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("id", "==", productId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setProduct(querySnapshot.docs[0].data());
        } else {
          Alert.alert("❌ Error", "Product not found.");
        }
      } catch (error) {
        console.error("🔥 Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleOrder = async () => {
    if (
      !name ||
      !address ||
      !email ||
      !phoneNumber ||
      !zipcode ||
      !paymentMethod
    ) {
      Alert.alert("Error", "Please fill in all details.");
      return;
    }

    // Validate credit card details if "Credit Card" is selected
    if (paymentMethod === "Credit Card") {
      if (!cardNumber || cardNumber.length !== 16) {
        Alert.alert("Error", "Please enter a valid 16-digit card number.");
        return;
      }
      if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        Alert.alert("Error", "Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (!cvv || cvv.length !== 3) {
        Alert.alert("Error", "Please enter a valid 3-digit CVV.");
        return;
      }
    }

    try {
      await addDoc(collection(db, "orders"), {
        name,
        email,
        phoneNumber,
        address,
        productId,
        zipcode,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        paymentMethod,
        timestamp: new Date(),
      });

      Alert.alert("✅ Payment Successful!", "Your order has been placed.");
      router.push("/checkoutOrdered"); // Redirect to order confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Error", "Could not place order. Try again.");
    }
  };

  if (loading) return <Text>Loading product...</Text>;
  if (!product) return <Text>❌ Product not found!</Text>;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Image
          source={{ uri: product.image }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold">{product.name}</Text>
        <Text className="text-lg text-green-600 font-semibold">
          ${product.price}
        </Text>

        <Text className="text-lg font-bold mt-4">Enter Your Details</Text>
        <TextInput
          className="border p-2 mt-2 bg-gray-200 rounded-lg"
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border p-2 mt-2 bg-gray-200 rounded-lg"
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          className="border p-2 mt-2 bg-gray-200 rounded-lg"
          placeholder="Your Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          className="border p-2 mt-2 bg-gray-200 rounded-lg"
          placeholder="Your Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          className="border p-2 mt-2 mb-4 bg-gray-200 rounded-lg"
          placeholder="Your Zip Code"
          value={zipcode}
          onChangeText={setZipcode}
          keyboardType="numeric"
        />

        <Text className="text-lg font-bold mt-4">Choose Payment Method</Text>
        <TouchableOpacity
          className={`p-4 my-2 border rounded-lg ${
            paymentMethod === "Credit Card"
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
          onPress={() => setPaymentMethod("Credit Card")}
        >
          <Text className="text-lg font-semibold">💳 Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`p-4 my-2 border rounded-lg ${
            paymentMethod === "PayPal"
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
          onPress={() => setPaymentMethod("PayPal")}
        >
          <Text className="text-lg font-semibold">🅿️ PayPal</Text>
        </TouchableOpacity>

        {/* Show credit card inputs only if "Credit Card" is selected */}
        {paymentMethod === "Credit Card" && (
          <View className="mt-4">
            <Text className="text-lg font-bold">Enter Card Details</Text>
            <TextInput
              className="border p-2 mt-2 bg-gray-200 rounded-lg"
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />
            <TextInput
              className="border p-2 mt-2 bg-gray-200 rounded-lg"
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChangeText={setExpiryDate}
              maxLength={5}
            />
            <TextInput
              className="border p-2 mt-2 bg-gray-200 rounded-lg"
              placeholder="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        )}

        <TouchableOpacity
          className={`mt-6 p-4 rounded-lg ${
            paymentMethod ? "bg-green-700" : "bg-gray-400"
          }`}
          disabled={!paymentMethod}
          onPress={handleOrder}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {paymentMethod ? "Proceed to Pay" : "Select a Payment Method"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserDetails;
