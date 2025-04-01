import { useAuth } from "../config/firebaseConfig";
import { View, Text, Image, Button, ImageBackground } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { router } from "expo-router";

const ProfileScreen = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text className="text-center text-lg mt-5">Loading...</Text>;
  }

  return (
    <ImageBackground 
      source={require("../../assets/images/profile.png")}
      className="w-full h-full flex-1 "
      resizeMode="cover"
      blurRadius={8}
      >
      <View className="flex-1 items-center justify-center p-4 ">
        {user ? (
          <>
            <Image
              source={{
                uri:
                  user.photoURL ||
                  "https://media.licdn.com/dms/image/v2/D5603AQF8Cuf2bXlc1w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720038788220?e=1748476800&v=beta&t=R8EAc-6YEGpJj2LOzbNqmSlU_HcJHa0zZnUr5IYYuhE",
              }}
              className="w-24 h-24 rounded-full mb-4 border border-gray-300"
            />
            <Text className="text-2xl font-bold mb-2 text-white">
              {user.displayName || "User Name"}
            </Text>
            <Text className="text-white mb-6 font-semibold text-lg">{user.email}</Text>
            <Button
         
              title="Sign Out"
              color="red"
              onPress={() => router.push("/sign-in")}
            />
          </>
        ) : (
          <Text className="text-lg text-gray-500">Please log in.</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
