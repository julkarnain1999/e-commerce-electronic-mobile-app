export const products = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 1199,
    image:
      "https://img.freepik.com/free-photo/smartphone-nature-concept_23-2150246099.jpg?t=st=1743065365~exp=1743068965~hmac=f44cb35441369e26a76d9fa918c468f60ee7013ab23b33a2796052871bf03547&w=740",
    category: "Smartphone",
    brand: "Apple",
    description:
      "Experience the power of the A17 Bionic chip with the all-new iPhone 15 Pro Max. Featuring a titanium body, ProMotion display, and an advanced 48MP triple-camera system with 5x optical zoom.",
    specifications: {
      display: "6.7-inch Super Retina XDR",
      processor: "A17 Bionic Chip",
      camera: "48MP + 12MP + 12MP",
      battery: "4,852mAh",
      storage: ["128GB", "256GB", "512GB", "1TB"],
    },
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    image:
      "https://img.freepik.com/free-vector/two-modern-all-screen-phones_1284-30462.jpg?t=st=1743065328~exp=1743068928~hmac=bb6820587ed6ed9870a25db10f318b1725132548c094a85548f584cdf5412629&w=826",
    category: "Smartphone",
    brand: "Samsung",
    description:
      "Samsung Galaxy S24 Ultra redefines smartphone photography with its 200MP main sensor, S Pen support, and ultra-smooth 120Hz Dynamic AMOLED display.",
    specifications: {
      display: "6.8-inch Dynamic AMOLED 2X, 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "200MP + 12MP + 10MP + 10MP",
      battery: "5,000mAh",
      storage: ["256GB", "512GB", "1TB"],
    },
  },
  {
    id: "3",
    name: "MacBook Pro 16-inch M3 Max",
    price: 2999,
    image:
      "https://plus.unsplash.com/premium_photo-1681302427948-2fd0eca629b1?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Laptop",
    brand: "Apple",
    description:
      "The most powerful MacBook ever. Featuring the M3 Max chip, 38-core GPU, and up to 96GB unified memory for unparalleled performance.",
    specifications: {
      display: "16.2-inch Liquid Retina XDR",
      processor: "Apple M3 Max",
      RAM: "32GB / 64GB / 96GB",
      storage: ["512GB", "1TB", "2TB", "4TB"],
      battery: "22-hour battery life",
    },
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Headphones",
    brand: "Sony",
    description:
      "Industry-leading noise cancellation headphones with crystal-clear sound, adaptive sound control, and 30-hour battery life.",
    specifications: {
      type: "Over-ear",
      noiseCancellation: "Active Noise Cancelling (ANC)",
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.2, 3.5mm AUX",
      weight: "250g",
    },
  },
  {
    id: "5",
    name: "PlayStation 5",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Gaming Console",
    brand: "Sony",
    description:
      "PlayStation 5 takes gaming to the next level with 4K resolution, Ray Tracing, ultra-fast SSD, and the new DualSense controller.",
    specifications: {
      processor: "Custom AMD Ryzen Zen 2",
      GPU: "AMD RDNA 2",
      storage: "825GB SSD",
      resolution: "4K UHD, 120Hz",
      features: ["Ray Tracing", "HDR", "3D Audio"],
    },
  },
  {
    id: "6",
    name: "Apple Watch Series 9",
    price: 429,
    image:
      "https://images.unsplash.com/photo-1705307543536-06ebcb39bb0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Smartwatch",
    brand: "Apple",
    description:
      "Stay connected, track your fitness, and monitor your health with the Apple Watch Series 9. Featuring an Always-On Retina display and advanced health sensors.",
    specifications: {
      display: "1.9-inch Retina OLED",
      batteryLife: "18 hours",
      healthFeatures: ["ECG", "Blood Oxygen", "Heart Rate Monitor"],
      connectivity: "Wi-Fi, LTE, Bluetooth 5.3",
    },
  },
  {
    id: "7",
    name: "Samsung 55-inch OLED TV",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "TV",
    brand: "Samsung",
    description:
      "Immerse yourself in true-to-life visuals with the Samsung OLED TV, featuring Quantum HDR, 120Hz refresh rate, and AI-powered 4K upscaling.",
    specifications: {
      display: "55-inch 4K OLED",
      refreshRate: "120Hz",
      HDR: "Quantum HDR 10+",
      features: ["Dolby Atmos", "Smart Hub", "AI Upscaling"],
    },
  },
  {
    id: "8",
    name: "DJI Mini 3 Pro Drone",
    price: 999,
    image:
      "https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Drone",
    brand: "DJI",
    description:
      "Capture stunning 4K HDR aerial footage with the DJI Mini 3 Pro. Features 47-minute flight time and advanced obstacle detection.",
    specifications: {
      camera: "4K HDR, 48MP",
      batteryLife: "47 minutes",
      maxSpeed: "57.6 km/h",
      range: "12km",
      weight: "249g",
    },
  },
];
