import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { carouselData } from "../../constants/carousel";

const CarouselDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🛠 Simulating the original carousel data (You should fetch this dynamically)
 

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      console.log("🛠 Fetching Firestore document with ID:", id);

      // Try fetching by document ID
      let docRef = doc(db, "products", id);
      let docSnap = await getDoc(docRef);

      let productData = null;

      if (docSnap.exists()) {
        console.log("✅ Document found (by doc ID):", docSnap.data());
        productData = docSnap.data();
      } else {
        console.warn("⚠️ Document not found by ID, trying 'id' field...");

        // If document doesn't exist, try querying by 'id' field
        const q = query(collection(db, "products"), where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log("✅ Document found (by 'id' field):", doc.data());
            productData = doc.data();
          });
        } else {
          console.error("❌ No document found in Firestore for ID:", id);
        }
      }

      // Find the carousel data matching this product
      const carouselProduct = carouselData.find((item) => item.id === id);

      // Merge both data sources
      const mergedProduct = {
        id: id,
        title: productData?.name || carouselProduct?.title || "No Title",
        description:
          productData?.description ||
          carouselProduct?.description ||
          "No Description Available",
        image: productData?.image || carouselProduct?.image,
        discount: carouselProduct?.discount || "No Discount",
        rating: carouselProduct?.rating || productData?.rating || "N/A",
        price: productData?.price || "Not Available",
        specifications: productData?.specifications || null,
      };

      setProduct(mergedProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!product)
    return (
      <Text className="text-center text-red-500 mt-10">No product found!</Text>
    );

  return (
    <ScrollView className="p-4 bg-white">
      <Image
        source={{ uri: product.image }}
        style={{ width: "100%", height: 300, borderRadius: 10 }}
      />
      <Text className="text-2xl font-bold mt-4">{product.title}</Text>
      <Text className="text-lg text-gray-600">{product.description}</Text>
      <Text className="text-lg font-semibold mt-2">
        ⭐ Rating: {product.rating}
      </Text>
      <Text className="text-lg font-semibold text-green-600">
        {product.discount}
      </Text>
      <Text className="text-lg font-bold mt-4">💰 Price: ${product.price}</Text>
      <Text className="text-blue-500 mt-2">{product.link}</Text>

      {/* Specifications Section */}
      {product.specifications && (
        <View className="mt-4">
          <Text className="text-xl font-bold">Specifications:</Text>
          {product.specifications.processor && (
            <Text className="text-lg">
              🔹 Processor: {product.specifications.processor}
            </Text>
          )}
          {product.specifications.display && (
            <Text className="text-lg">
              🔹 Display: {product.specifications.display}
            </Text>
          )}
          {product.specifications.camera && (
            <Text className="text-lg">
              🔹 Camera: {product.specifications.camera}
            </Text>
          )}
          {product.specifications.battery && (
            <Text className="text-lg">
              🔹 Battery: {product.specifications.battery}
            </Text>
          )}
          {product.specifications.storage && (
            <Text className="text-lg">
              🔹 Storage Options: {product.specifications.storage.join(", ")}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CarouselDetail;
