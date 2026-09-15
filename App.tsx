import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Header from './components/Header'; 
import BookCard from './components/BookCard';

const SAMPLE_BOOKS = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: '86.000 đ',
    imageUrl: 'https://via.placeholder.com/80x110/4B0082/FFFFFF?text=Book1',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim (Tái Bản 2020) - Tác phẩm kinh điển thế giới',
    author: 'Paulo Coelho',
    price: '79.000 đ',
    imageUrl: 'https://via.placeholder.com/80x110/4B0082/FFFFFF?text=Book2',
  },
  {
    id: '3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: '90.000 đ',
    imageUrl: 'https://via.placeholder.com/80x110/4B0082/FFFFFF?text=Book3',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        {SAMPLE_BOOKS.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});