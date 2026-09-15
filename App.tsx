import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Header from './components/Header';   
import BookGrid from './components/BookGrid'; 
import { Book } from './components/BookCard'; 
const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: '86.000 đ',
    imageUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    id: '2',
    title: 'Nhà Giả Kim (Tái Bản 2020)',
    author: 'Paulo Coelho',
    price: '79.000 đ',
    imageUrl: 'https://picsum.photos/id/24/200/300',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <BookGrid books={SAMPLE_BOOKS} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});