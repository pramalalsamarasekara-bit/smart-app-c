// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function RootLayout() {
  
  useEffect(() => {
    
  }, []);

  return (
    <LanguageProvider>
      {/*
        
      */}
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}