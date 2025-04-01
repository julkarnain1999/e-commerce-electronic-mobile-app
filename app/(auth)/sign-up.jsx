import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";


const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/home"); // Navigate to Home after signup
    } catch (err) {
      setError("Failed to create an account.");
    }
    setLoading(false);
  };

  return (
    
    <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center px-6">
       <View className="flex-row items-center justify-center mt-10 mb-16">
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
                    <Text style={{ color: "#db0707" }}>Sign Up Page.</Text>
                  </Text>
                </View>
     

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
          loading ? "bg-gray-600" : "bg-green-600"
        }`}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push("/sign-in")}
      >
        <Text className="text-gray-400">
          Already have an account?{" "}
          <Text className="text-green-400">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
