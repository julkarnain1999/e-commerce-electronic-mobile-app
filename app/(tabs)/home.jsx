import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native"; // ✅ Bell icon for notifications
import { ImageBackground } from "react-native";
import Footer from "../components/footer";
import { MotiView } from "moti";

const { width } = Dimensions.get("window");
const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const router = useRouter();


 useEffect(() => {
   const fetchProducts = async () => {
     try {
       const querySnapshot = await getDocs(collection(db, "products"));
       const productList = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));

      // Debugging

       setProducts(productList);
       setFilteredProducts(productList);
     } catch (error) {
       console.error("❌ Error fetching products:", error);
     }
   };

   fetchProducts();
 }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "carousel"));
        const carouselList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCarouselData(carouselList);
      } catch (error) {
        console.error("❌ Error fetching carousel data:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log("✅ Carousel Data:", carouselData);


  // 🔹 Handle Category Filter
  const categoryMappings = {
    Electronics: [
      "Smartphone",
      "Laptop",
      "Gaming Console",
      "Smartwatch",
      "Headphones",
      "TV",
      "Drone",
    ],
    Sports: ["Fitness Tracker", "Sports Gear"], // Example for sports-related products
    Technology: ["Smartphone", "Laptop", "TV", "Drone"],
    Fashion: ["Shoes", "Clothing", "Accessories"],
    Home: ["Furniture", "Kitchen Appliances"], // Adjust as needed
  };
  const handleCategoryFilter = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      setSelectedCategory(category);
      const allowedCategories = categoryMappings[category] || [];
      const filtered = products.filter(
        (item) => item.category && allowedCategories.includes(item.category)
      );
      setFilteredProducts(filtered);
    }
  };



  // ✅ Search Functionality
 const handleSearch = (text) => {
   setSearchQuery(text);
   if (!text.trim()) {
     setFilteredProducts(products);
     return;
   }
   const filtered = products.filter((product) =>
     product.name.toLowerCase().includes(text.toLowerCase())
   );
   setFilteredProducts(filtered);
 };



  return (
    <ImageBackground
      source={require("../../assets/images/homeBg.png")}
      className="w-full h-full"
      resizeMode="cover"
    >
      <ScrollView className="flex-1">
        <View className="flex-1 p-4 ">
          {/* ✅ Navbar with Search Input & Bell Icon */}
          <View className=" flex-row justify-between items-center mb-4 ">
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2 flex-1 text-white"
              placeholder="Search products..."
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              className="ml-4
          "
            >
              <Bell size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* ✅ Banner Poster */}
          <View className="mb-4 ">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1660866838675-c84e140c3c24?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="w-full h-32 rounded-lg mb-4"
              resizeMode="cover"
            />

            <Text className="text-white font-bold text-lg mt-2">
              Trending Products
            </Text>
            <Text className="text-gray-400 text-sm">
              Discover the latest trends in electronics, sports, and technology.
            </Text>
          </View>
          {/* ✅ Carousel Section */}
          <View className="mb-4 ">
            <FlatList
              data={carouselData}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="m-2 rounded-lg shadow-lg mb-2"
                  onPress={() => {
                    console.log("🔥 Navigating to:", `/carousel/${item.id}`);
                    router.push(`/carousel/${item.id}`);
                  }}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: width * 0.6, height: 150 }} // ✅ Set width dynamically
                    className="rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="text-white text-md font-semibold mt-2 text-center">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* 🔹 Category Buttons (Scrollable) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 mb-4"
          >
            {Object.keys(categoryMappings).map((category) => (
              <TouchableOpacity
                key={category}
                className={`m-2 px-4 py-2 rounded-lg ${
                  selectedCategory === category ? "bg-red-500" : "bg-slate-500"
                }`}
                onPress={() => handleCategoryFilter(category)}
              >
                <Text className="text-white font-medium">{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity >
            <Text className="text-white font-semibold text-lg">Shop Now</Text>
            <Text className="text-gray-400 text-sm">
              Special Offer: Get 20% off on selected products and purchases
            </Text>
          </TouchableOpacity>
          {/* ✅ Product List */}
          {filteredProducts.length === 0 ? (
            <Text className="text-center text-lg font-bold mt-10">
              No products found!
            </Text>
          ) : (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <MotiView
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "spring", duration: 500 }}
                  className="bg-transparent p-4 rounded-lg mb-4"
                >
                  <TouchableOpacity
                    onPress={() => router.push(`/product/${item.id}`)}
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="h-40 w-full rounded-lg"
                      resizeMode="cover"
                    />
                    <Text className="text-lg font-bold mt-2 text-white">
                      {item.name}
                    </Text>
                    <Text className="text-green-600 font-semibold text-sm">
                      ${item.price}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              )}
              ListFooterComponent={<Footer />}
            />
          )}
          
        </View>
        
      </ScrollView>
      
    </ImageBackground>
  );
};

export default Home;
