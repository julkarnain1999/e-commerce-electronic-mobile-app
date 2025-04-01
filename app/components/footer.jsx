import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const Footer = () => {
  const router = useRouter();

  return (
    <View className="bg-gray-900 p-4">
      {/* 🔹 Sections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ Get to Know Us */}
        <View className="mb-4">
          <Text className="text-white font-bold mb-2">Get to Know Us</Text>
          {["About Us", "Careers", "Press Releases", "Amazon Science"].map(
            (item, index) => (
              <TouchableOpacity key={index} className="mb-1">
                <Text className="text-gray-400">{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* ✅ Connect with Us */}
        <View className="mb-4">
          <Text className="text-white font-bold mb-2">Connect with Us</Text>
          {["Facebook", "Twitter", "Instagram"].map((item, index) => (
            <TouchableOpacity key={index} className="mb-1">
              <Text className="text-gray-400">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ✅ Make Money with Us */}
        <View className="mb-4">
          <Text className="text-white font-bold mb-2">Make Money with Us</Text>
          {[
            "Sell on E-commerce",
            "Sell under ecommerce Accelerator",
            "Protect and Build Your Brand",
            "Ecommerce Global Selling",
            "Become an Affiliate",
            "Fulfillment by E-commerce",
          ].map((item, index) => (
            <TouchableOpacity key={index} className="mb-1">
              <Text className="text-gray-400">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ✅ Let Us Help You */}
        <View className="mb-4">
          <Text className="text-white font-bold mb-2">Let Us Help You</Text>
          {[
            "Your Account",
            "Returns Centre",
            "Recalls and Product Safety Alerts",
            "100% Purchase Protection",
            "Amazon App Download",
            "Help",
          ].map((item, index) => (
            <TouchableOpacity key={index} className="mb-1">
              <Text className="text-gray-400">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 🔹 Bottom Info */}
      <View className="border-t border-gray-700 mt-4 pt-4">
        <Text className="text-center text-gray-500 text-xs">
          Conditions of Use & Sale | Privacy Notice | Interest-Based Ads
        </Text>
        <Text className="text-center text-gray-500 text-xs mt-1">
          © 1996-2025, YourEcommerceApp.com, Inc. or its affiliates
        </Text>
      </View>
    </View>
  );
};

export default Footer;
