// ===== TOP of file: app/(tabs)/market/_layout.tsx =====
import React from 'react';
import { Stack } from 'expo-router';

export default function MarketLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <Stack.Screen name="index"           options={{ title: 'Market' }} />
      <Stack.Screen name="choose-plan"     options={{ title: 'Choose Plan' }} />
      <Stack.Screen name="checkout"        options={{ title: 'Checkout' }} />
      <Stack.Screen name="payment-result"  options={{ title: 'Payment Result' }} />
      <Stack.Screen name="sell-product"    options={{ title: 'Sell Product' }} />
    </Stack>
  );
}
// ===== BOTTOM of file =====
