import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BookGridCard from './BookGridCard'; 
import { Book } from './BookCard';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.gridContainer}>
      {books?.map((book) => (
        <BookGridCard key={book.id} book={book} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
});