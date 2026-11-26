import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '../store/CartProvider';
import { HEADER_COLOR } from '../components/Header';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: HEADER_COLOR },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#f5f5f5' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'BookStore' }} />
        <Stack.Screen name="book/[id]" options={{ title: 'Chi tiết sách' }} />
      </Stack>
    </CartProvider>
  );
}
