import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BOOKS } from '../data/books';
import { cartCount, cartReducer, cartTotal, type CartAction, type CartLine } from './cart';

const STORAGE_KEY = 'bookstore/cart/v1';

interface CartContextValue {
  lines: CartLine[];
  dispatch: React.Dispatch<CartAction>;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const hydrated = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        const saved = raw ? JSON.parse(raw) : null;
        if (Array.isArray(saved)) {
          dispatch({ type: 'hydrate', lines: saved });
        }
      })
      .catch((error) => console.warn('Không đọc được giỏ hàng', error))
      .finally(() => {
        hydrated.current = true;
      });
  }, []);

  useEffect(() => {
    if (!hydrated.current) {
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lines)).catch((error) =>
      console.warn('Không lưu được giỏ hàng', error)
    );
  }, [lines]);

  const value = useMemo(
    () => ({ lines, dispatch, count: cartCount(lines), total: cartTotal(lines, BOOKS) }),
    [lines]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
