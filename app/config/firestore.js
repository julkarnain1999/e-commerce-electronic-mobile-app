import { db } from "./firebaseConfig";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";

// Function to fetch a product by ID
export const fetchProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return productSnap.data();
    } else {
      console.log("❌ Product not found in Firestore:", productId);
      return null;
    }
  } catch (error) {
    console.error("🔥 Error fetching product:", error);
    return null;
  }
};

// Function to place an order
export const placeOrder = async (orderData) => {
  try {
    await addDoc(collection(db, "orders"), {
      ...orderData,
      timestamp: new Date(),
    });
    return { success: true, message: "✅ Order successfully placed!" };
  } catch (error) {
    console.error("🔥 Error placing order:", error);
    return { success: false, message: "❌ Could not place order. Try again." };
  }
};
