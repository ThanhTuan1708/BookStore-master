import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';
import { HEADER_COLOR } from '../../components/Header';
import { useCart } from '../../store/CartProvider';

export default function TabsLayout() {
  const { count } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: HEADER_COLOR },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: HEADER_COLOR,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={size - 4} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={size - 4} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          tabBarBadge: count > 0 ? count : undefined,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" size={size - 4} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
