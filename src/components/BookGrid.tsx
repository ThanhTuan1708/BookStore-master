import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BookCard from './BookCard';
import BookGridCard from './BookGridCard';
import type { Book } from '../data/books';

interface BookGridProps {
  books: Book[];
  layout?: 'grid' | 'list';
  onPressBook?: (book: Book) => void;
}

/** Danh sách sách dạng lưới 2 cột hoặc dạng hàng (render bên trong một ScrollView cha). */
export default function BookGrid({ books, layout = 'grid', onPressBook }: BookGridProps) {
  if (books.length === 0) {
    return <Text style={styles.empty}>Không có sách phù hợp</Text>;
  }

  if (layout === 'list') {
    return (
      <View style={styles.listContainer}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} onPress={onPressBook} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      {books.map((book) => (
        <BookGridCard key={book.id} book={book} onPress={onPressBook} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  listContainer: {
    padding: 12,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});
