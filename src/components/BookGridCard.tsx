import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BookCover from './BookCover';
import { formatVND, type Book } from '../data/books';

interface BookGridCardProps {
  book: Book;
  onPress?: (book: Book) => void;
}

function BookGridCard({ book, onPress }: BookGridCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]}
      onPress={() => onPress?.(book)}
      accessibilityRole="button"
      accessibilityLabel={book.title}
    >
      <BookCover book={book} style={styles.coverImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.authorText} numberOfLines={1}>
          {book.author}
        </Text>
        <Text style={styles.priceText}>{formatVND(book.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
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
    width: '100%',
    aspectRatio: 3 / 4,
  },
  infoContainer: {
    padding: 8,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    minHeight: 36,
  },
  authorText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d9534f',
  },
});

export default React.memo(BookGridCard);
