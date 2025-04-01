import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = auth.currentUser; // Get the authenticated user

  // Fetch Cart Items
  useEffect(() => {
    if (!user) return;

    const fetchCartItems = async () => {
      try {
        const q = query(
          collection(db, "cart"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCartItems(items);
      } catch (error) {
        console.error("❌ Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "cart", itemId));
            setCartItems(cartItems.filter((item) => item.id !== itemId));
            Alert.alert("✅ Removed", "Item removed from cart.");
          } catch (error) {
            console.error("❌ Error removing item:", error);
          }
        },
      },
    ]);
  };

  // Increase Quantity
  const increaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate Total Price
const totalPrice = cartItems.reduce(
  (total, item) => total + (item.price || 0) * (item.quantity || 1),
  0
);

  // Place Order
const placeOrder = async () => {
  if (cartItems.length === 0) {
    Alert.alert("Cart is Empty", "Add some items before checking out.");
    return;
  }

  try {
    const orderPromises = cartItems.map(async (item) => {
      if (!item.productName || !item.price || !item.image || !item.quantity) {
        console.error("❌ Missing data in order:", item);
        return;
      }
      return addDoc(collection(db, "orders"), {
        userId: user.uid,
        productId: item.productId || "unknown", // ✅ Fallback value
        productName: item.productName || "Unnamed Product",
        productImage: item.image || "https://via.placeholder.com/150",
        price: item.price || 0, // ✅ Default price to 0
        quantity: item.quantity || 1, // ✅ Default quantity to 1
        timestamp: new Date(),
      });
    });

    await Promise.all(orderPromises);

    // Remove items from cart after order placement
    const deletePromises = cartItems.map((item) =>
      deleteDoc(doc(db, "cart", item.id))
    );
    await Promise.all(deletePromises);

    setCartItems([]);
    Alert.alert("✅ Order Placed", "Your order has been confirmed!");
  } catch (error) {
    console.error("❌ Error placing order:", error);
  }
};

  return (
    <View className="p-4 bg-gray-100 flex-1">
      <Text className="text-2xl font-bold text-gray-800">🛒 Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text className="text-gray-500 mt-4">Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center border p-3 my-2 rounded-lg bg-white shadow-md">
              {/* Product Image */}
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />

              {/* Product Details */}
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{item.productName}</Text>
                <Text className="text-green-600">${item.price}</Text>

                {/* Quantity Control */}
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    className="bg-gray-300 p-2 rounded-lg"
                  >
                    <MaterialIcons name="remove" size={20} color="black" />
                  </TouchableOpacity>

                  <Text className="text-lg font-bold mx-3">
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    className="bg-gray-300 p-2 rounded-lg"
                  >
                    <MaterialIcons name="add" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                className="bg-red-500 px-3 py-2 rounded-lg"
                onPress={() => removeFromCart(item.id)}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Total Price & Checkout */}
      {cartItems.length > 0 && (
        <View className="bg-white p-4 rounded-lg shadow-md mt-4">
          <Text className="text-lg font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </Text>

          <TouchableOpacity
            className="bg-blue-600 p-3 rounded-lg mt-3 items-center shadow-lg"
            onPress={placeOrder}
          >
            <Text className="text-white text-lg font-bold">🛍 Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;
