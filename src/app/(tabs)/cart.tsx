import React from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import BookCover from '../../components/BookCover';
import { BOOKS, formatVND } from '../../data/books';
import { MAX_PER_BOOK } from '../../store/cart';
import { useCart } from '../../store/CartProvider';

function notify(title: string, message: string) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export default function CartScreen() {
  const { lines, dispatch, count, total } = useCart();
  const items = lines
    .map((line) => ({ ...line, book: BOOKS.find((b) => b.id === line.bookId) }))
    .filter((line): line is typeof line & { book: NonNullable<typeof line.book> } => !!line.book);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <FontAwesome5 name="shopping-basket" size={48} color="#ccc" />
        <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
        <Pressable style={styles.primary} onPress={() => router.navigate('/')}>
          <Text style={styles.primaryText}>Khám phá sách</Text>
        </Pressable>
      </View>
    );
  }

  const checkout = () => {
    dispatch({ type: 'clear' });
    notify('Đặt hàng thành công', `Bạn đã đặt ${count} cuốn sách, tổng ${formatVND(total)}.`);
    router.navigate('/');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.bookId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable
              onPress={() => router.push({ pathname: '/book/[id]', params: { id: item.bookId } })}
            >
              <BookCover book={item.book} size="small" style={styles.cover} />
            </Pressable>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.book.title}
              </Text>
              <Text style={styles.price}>{formatVND(item.book.price)}</Text>
              <View style={styles.stepper}>
                <Pressable
                  style={styles.stepButton}
                  accessibilityLabel={`Giảm số lượng ${item.book.title}`}
                  onPress={() =>
                    dispatch({ type: 'setQuantity', bookId: item.bookId, quantity: item.quantity - 1 })
                  }
                >
                  <Text style={styles.stepText}>−</Text>
                </Pressable>
                <Text style={styles.qty}>{item.quantity}</Text>
                <Pressable
                  style={[styles.stepButton, item.quantity >= MAX_PER_BOOK && styles.disabled]}
                  disabled={item.quantity >= MAX_PER_BOOK}
                  accessibilityLabel={`Tăng số lượng ${item.book.title}`}
                  onPress={() =>
                    dispatch({ type: 'setQuantity', bookId: item.bookId, quantity: item.quantity + 1 })
                  }
                >
                  <Text style={styles.stepText}>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.right}>
              <Pressable
                onPress={() => dispatch({ type: 'remove', bookId: item.bookId })}
                accessibilityLabel={`Xoá ${item.book.title}`}
                style={styles.removeButton}
              >
                <FontAwesome5 name="trash-alt" size={16} color="#d9534f" />
              </Pressable>
              <Text style={styles.lineTotal}>{formatVND(item.book.price * item.quantity)}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng cộng ({count} cuốn)</Text>
          <Text style={styles.totalValue}>{formatVND(total)}</Text>
        </View>
        <Pressable style={styles.primary} onPress={checkout} accessibilityRole="button">
          <Text style={styles.primaryText}>Đặt hàng</Text>
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
  list: {
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    gap: 10,
  },
  cover: {
    width: 56,
    height: 78,
    borderRadius: 4,
    paddingHorizontal: 6,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    color: '#777',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepButton: {
    width: 28,
    height: 28,
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
    minWidth: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 4,
  },
  lineTotal: {
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 14,
    borderTopWidth: 1,
    borderColor: '#eee',
    gap: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    color: '#555',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d9534f',
  },
  primary: {
    backgroundColor: 'indigo',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});
