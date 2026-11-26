import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../store/CartProvider';

export const HEADER_COLOR = 'indigo';

export default function Header() {
  const insets = useSafeAreaInsets();
  const { count } = useCart();

  return (
    <View style={[styles.container, { paddingTop: insets.top, height: 56 + insets.top }]}>
      <Text style={styles.logoText}>BookStore</Text>

      <View style={styles.rightContainer}>
        <Pressable
          onPress={() => router.navigate('/search')}
          accessibilityRole="button"
          accessibilityLabel="Tìm kiếm sách"
          style={styles.iconButton}
        >
          <FontAwesome5 name="search" size={20} color="white" />
        </Pressable>

        <Pressable
          onPress={() => router.navigate('/cart')}
          accessibilityRole="button"
          accessibilityLabel={`Giỏ hàng, ${count} sản phẩm`}
          style={styles.iconButton}
        >
          <FontAwesome5 name="shopping-cart" size={20} color="white" />
          {count > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: HEADER_COLOR,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: '#f43f5e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
