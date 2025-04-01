import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";


const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home"); // Navigate to Home after login
    } catch (err) {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/cover.png")}
      className="w-full h-full flex-1 "
      resizeMode="cover"
    >
   <View className="flex-row items-center justify-center mt-10">
            <Text
              className="text-white text-4xl font-bold"
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5,
              }}
            >
              👋Hi, I'm <Text style={{ color: "#ffcc00" }}>Julkarnain </Text>
              Welcome to{" "}
              <Text style={{ color: "#db0707" }}>Sign In Page.</Text>
            </Text>
          </View>
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-3xl font-bold mb-6">Sign In</Text>

        {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

        <TextInput
          className="w-full p-4 bg-gray-800 text-white rounded-lg mb-4"
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-4 bg-gray-800 text-white rounded-lg mb-4"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className={`w-full p-4 rounded-lg items-center ${
            loading ? "bg-gray-600" : "bg-blue-600"
          }`}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-semibold">Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="text-gray-400">
            Don't have an account?{" "}
            <Text className="text-blue-500">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
