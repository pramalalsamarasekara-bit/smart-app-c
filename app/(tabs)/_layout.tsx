// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"  // <<-- මෙන්න මේ වෙනස විතරයි කළේ --
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#0B0B0B',
          borderTopColor: '#1f2937',
          borderTopWidth: Platform.OS === 'android' ? 0.5 : StyleSheet.hairlineWidth,
        },
      }}
    >
      {/* FIXED ORDER: Home | Search | AI | Cart | Profile | Market */}
      {/* ඔබගේ Tabs.Screen කිසිවක් වෙනස් කර නැත */}
      <Tabs.Screen name="index" options={{ title: 'Home',
        tabBarIcon: ({ color, size=22 }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="search" options={{ title: 'Search',
        tabBarIcon: ({ color, size=22 }) => <Ionicons name="search-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="assistant" options={{ title: 'AI Assistant',
        tabBarIcon: ({ color, size=22 }) => <Ionicons name="sparkles-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart',
        tabBarIcon: ({ color, size=22 }) => <Ionicons name="cart-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile',
        tabBarIcon: ({ color, size=22 }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="market" options={{ title: 'Market',
        tabBarIcon: ({ color, size=22 }) => <Ionicons name="bag-handle-outline" size={size} color={color} /> }} />

      {/* keep other routes working but hidden */}
      <Tabs.Screen name="help" options={{ href: null }} />
      <Tabs.Screen name="history" options={{ href: null }} />
      <Tabs.Screen name="scan" options={{ href: null }} />
      <Tabs.Screen name="voice-order" options={{ href: null }} />
    </Tabs>
  );
}