import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BookCover from './BookCover';
import { formatVND, type Book } from '../data/books';

export type { Book } from '../data/books';

interface BookCardProps {
  book: Book;
  onPress?: (book: Book) => void;
}

/** Thẻ sách dạng hàng ngang (dùng cho chế độ danh sách và kết quả tìm kiếm). */
function BookCard({ book, onPress }: BookCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]}
      onPress={() => onPress?.(book)}
      accessibilityRole="button"
      accessibilityLabel={book.title}
    >
      <BookCover book={book} size="small" style={styles.coverImage} />
      <View style={styles.infoColumn}>
        <View>
          <Text style={styles.titleText} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.authorText} numberOfLines={1}>
            {book.author}
          </Text>
          <Text style={styles.metaText}>
            {book.category} · ★ {book.rating.toFixed(1)}
          </Text>
        </View>
        <Text style={styles.priceText}>{formatVND(book.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 6,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    height: 110,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  authorText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d9534f',
  },
});

export default React.memo(BookCard);
