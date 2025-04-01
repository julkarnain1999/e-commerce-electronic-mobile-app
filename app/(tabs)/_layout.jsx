
import { Tabs } from 'expo-router'
import home from './home'
import cart from './cart'

import profile from './profile'
import { Ionicons } from '@expo/vector-icons'



const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackgroundColor: "#000",
        tabBarActiveTintColor: "#464d54",
        tabBarInactiveTintColor: "#ccc",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          paddingVertical: 10,
          paddingHorizontal: 15,
          justifyContent: "space-around",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-sharp" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabsLayout