import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../config/firebaseConfig"; 
import { Ionicons } from "@expo/vector-icons";


const ProductDetails = () => {
  const { id } = useLocalSearchParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get logged-in user details
  const router = useRouter();

 
useEffect(() => {
  const fetchProduct = async () => {
    if (!id) {
      console.error("❌ Error: No product ID provided.");
      setLoading(false);
      return;
    }

    console.log("🔍 Fetching product with ID:", id);

    try {
      const q = query(
        collection(db, "products"),
        where("id", "==", id.toString())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setProduct(querySnapshot.docs[0].data());
      } else {
        console.error("❌ No matching product found in Firestore!");
      }
    } catch (error) {
      console.error("🔥 Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);



  // ✅ Add to Cart Function
 const addToCart = async () => {
   if (!user) {
     Alert.alert("Login Required", "Please log in to add items to cart.");
     return;
   }

   Alert.alert(
     "Add to Cart",
     "Are you sure you want to add this item to your cart?",
     [
       { text: "Cancel", style: "cancel" },
       {
         text: "Yes",
         onPress: async () => {
           try {
             await addDoc(collection(db, "cart"), {
               userId: user.uid,
               productId: product.id,
               name: product.name,
               image: product.image,
               price: product.price,
               timestamp: new Date(),
             });

             Alert.alert("Success", "Product added to cart!");
           } catch (error) {
             console.error("Error adding to cart:", error);
           }
         },
       },
     ]
   );
 };

  // ✅ Buy Now Function (Opens User Details Page)
  const buyNow = () => {
    router.push({
      pathname: "/userDetails",
      params: { productId: id },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg text-gray-700">Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500 font-bold">
          ❌ Product not found!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      {/* Product Image */}
      <View className="bg-white rounded-lg shadow-md p-2">
        <Image
          source={{ uri: product.image }}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />
      </View>

      {/* Product Details */}
      <View className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-gray-900">{product.name}</Text>
        <Text className="text-xl text-green-600 font-semibold mt-1">
          ${product.price}
        </Text>
        <Text className="text-gray-700 mt-2">{product.description}</Text>
      </View>

      {/* Specifications */}
      <View className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800">Specifications:</Text>
        {Object.entries(product.specifications).map(([key, value]) => (
          <Text key={key} className="text-gray-700">
            {key}: {typeof value === "object" ? JSON.stringify(value) : value}
          </Text>
        ))}
      </View>

      {/* Health Features */}
      {product.specifications.healthFeatures && (
        <View className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <Text className="text-lg font-bold text-gray-800">
            Health Features:
          </Text>
          {product.specifications.healthFeatures.map((feature, index) => (
            <Text key={index} className="text-gray-700">
              • {feature}
            </Text>
          ))}
        </View>
      )}

      {/* Buttons */}
      <View className="flex-row mt-6 space-x-4">
        <TouchableOpacity
          onPress={addToCart}
          className="flex-1 bg-orange-500 p-3 rounded-lg items-center flex-row justify-center shadow-lg"
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text className="text-white text-lg font-bold ml-2">Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={buyNow}
          className="flex-1 bg-red-500 p-3 rounded-lg items-center flex-row justify-center shadow-lg"
        >
          <Ionicons name="flash" size={24} color="white" />
          <Text className="text-white text-lg font-bold ml-2">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
