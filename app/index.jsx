import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Index = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("../assets/images/bgimage.png")}
        className="w-full h-full flex-1 justify-center items-center"
        resizeMode="cover"
      >
        <View className="absolute top-10 items-center w-full px-6">
          <Image
            source={require("../assets/images/watch.png")}
            className="w-32 h-32"
            resizeMode="contain"
          />
          <View className="flex-row items-center space-x-2 mt-4">
            <Text
              className="text-white text-4xl font-bold"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5,
              }}
            >
              👋Hi, I'm <Text style={{ color: "#ffcc00" }}>Julkarnain </Text>
              Welcome to My{" "}
              <Text style={{ color: "#db0707" }}>E-commerce Mobile App.</Text>
            </Text>
          </View>
          <View className="absolute top-20 items-center w-full px-6 mt-10 space-x-3 ">
            <Image
              source={require("../assets/images/iphone.png")}
              className="w-100 h-100"
              resizeMode="contain"
            />
          </View>
          <View className="flex-row items-center space-x-2 mt-4">
            <Text
              className="text-white text-4xl font-bold"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5,
              }}
            >
              Shop for smartwatches,
              <Text style={{ color: "#1de007" }}>smart home devices </Text>, and
              more.
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            className="border border-white py-3 px-6 rounded-xl items-center justify-center flex-row"
            style={{
              backgroundColor: "#8205e8",
              flexDirection: "row",
              gap: 10,
            }}
            onPress={() => router.push("/sign-in")}
          >
            <FontAwesome name="shopping-cart" size={15} color="white" />
          </TouchableOpacity>
        </View>

        <View className="w-full px-8 absolute bottom-24 space-y-1 ">
          <TouchableOpacity
            className="py-2 rounded-xl items-center border border-black"
            style={{ backgroundColor: "#369602" }}
            onPress={() => router.push("/sign-in")}
          >
            <Text className="text-white text-lg font-semibold ">Sign In</Text>
          </TouchableOpacity>
          <View style={{ height: 3 }} />
          <TouchableOpacity
            className="border border-white py-2 rounded-xl items-center"
            style={{ backgroundColor: "#8205e8" }}
            onPress={() => router.push("/sign-up")}
          >
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Index;
