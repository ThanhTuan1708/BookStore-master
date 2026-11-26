import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import BookCover from '../../components/BookCover';
import { formatVND, getBookById } from '../../data/books';
import { useCart } from '../../store/CartProvider';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = getBookById(String(id));
  const { lines, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!book) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.muted}>Không tìm thấy sách.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const inCart = lines.find((line) => line.bookId === book.id)?.quantity ?? 0;

  const add = (goToCart: boolean) => {
    dispatch({ type: 'add', bookId: book.id, quantity });
    if (goToCart) {
      router.navigate('/cart');
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BookCover book={book} size="large" style={styles.cover} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{book.category}</Text>
          <Text style={styles.meta}>★ {book.rating.toFixed(1)}</Text>
          <Text style={styles.meta}>{book.pages} trang</Text>
        </View>
        <Text style={styles.price}>{formatVND(book.price)}</Text>
        {inCart > 0 ? <Text style={styles.inCart}>Đã có {inCart} cuốn trong giỏ</Text> : null}
        <Text style={styles.section}>Giới thiệu</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.stepper}>
          <Pressable
            style={[styles.stepButton, quantity <= 1 && styles.disabled]}
            disabled={quantity <= 1}
            onPress={() => setQuantity((q) => q - 1)}
            accessibilityLabel="Giảm số lượng"
          >
            <Text style={styles.stepText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{quantity}</Text>
          <Pressable
            style={styles.stepButton}
            onPress={() => setQuantity((q) => Math.min(q + 1, 20))}
            accessibilityLabel="Tăng số lượng"
          >
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.button, styles.outline]} onPress={() => add(false)}>
          <Text style={[styles.buttonText, styles.outlineText]}>Thêm vào giỏ</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => add(true)}>
          <Text style={styles.buttonText}>Mua ngay</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  muted: {
    color: '#777',
  },
  link: {
    color: 'indigo',
    fontWeight: 'bold',
  },
  cover: {
    width: 180,
    height: 260,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  author: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  meta: {
    color: '#555',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d9534f',
    marginTop: 10,
  },
  inCart: {
    color: 'indigo',
    marginTop: 4,
  },
  section: {
    alignSelf: 'flex-start',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 18,
    marginBottom: 6,
  },
  description: {
    alignSelf: 'stretch',
    color: '#444',
    lineHeight: 21,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepButton: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qty: {
    minWidth: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    flex: 1,
    backgroundColor: 'indigo',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'indigo',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outlineText: {
    color: 'indigo',
  },
});
