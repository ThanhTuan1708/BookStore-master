import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import BookCard from '../../components/BookCard';
import { BOOKS, searchBooks, type Book } from '../../data/books';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchBooks(BOOKS, query), [query]);

  const openBook = useCallback((book: Book) => {
    router.push({ pathname: '/book/[id]', params: { id: book.id } });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Nhập tên sách hoặc tác giả (không cần dấu)..."
        placeholderTextColor="#999"
        style={styles.input}
        autoFocus
        returnKeyType="search"
        accessibilityLabel="Tìm sách"
      />
      <Text style={styles.count}>
        {query.trim() ? `${results.length} kết quả cho "${query.trim()}"` : `${BOOKS.length} đầu sách`}
      </Text>
      <FlatList
        data={results}
        keyExtractor={(book) => book.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <BookCard book={item} onPress={openBook} />}
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy sách phù hợp</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  input: {
    margin: 12,
    marginBottom: 4,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  count: {
    marginHorizontal: 14,
    color: '#777',
    fontSize: 12,
  },
  list: {
    padding: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});
