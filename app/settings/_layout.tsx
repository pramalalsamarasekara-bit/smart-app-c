// app/settings/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '800' },
        contentStyle: { backgroundColor: '#F6F7F9' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notification Settings' }} />
      <Stack.Screen name="privacy" options={{ title: 'Privacy & Security' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
}
