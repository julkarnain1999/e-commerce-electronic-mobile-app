import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { carouselData } from "../../constants/carousel"; // Ensure correct import

const uploadCarouselData = async () => {
  try {
    const carouselCollection = collection(db, "carousel");

    await Promise.all(
      carouselData.map(async (item) => {
        await addDoc(carouselCollection, item);
        console.log(`✅ Uploaded: ${item.name}`);
      })
    );

    console.log("🔥 All carousel items uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading carousel items:", error);
  }
};

// Run the function
// uploadCarouselData();
