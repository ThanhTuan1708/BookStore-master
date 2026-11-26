import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import BookGrid from '../../components/BookGrid';
import Header from '../../components/Header';
import { ALL_CATEGORIES, BOOKS, getCategories, searchBooks, type Book } from '../../data/books';

export default function HomeScreen() {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const categories = useMemo(() => getCategories(BOOKS), []);
  const books = useMemo(() => searchBooks(BOOKS, '', category), [category]);

  const openBook = useCallback((book: Book) => {
    router.push({ pathname: '/book/[id]', params: { id: book.id } });
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {categories.map((item) => {
            const active = item === category;
            return (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                style={[styles.chip, active && styles.chipActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            {category === ALL_CATEGORIES ? 'Tất cả sách' : category} ({books.length})
          </Text>
          <View style={styles.layoutToggle}>
            <Pressable
              onPress={() => setLayout('grid')}
              accessibilityLabel="Hiển thị dạng lưới"
              style={styles.layoutButton}
            >
              <FontAwesome5 name="th-large" size={16} color={layout === 'grid' ? 'indigo' : '#aaa'} />
            </Pressable>
            <Pressable
              onPress={() => setLayout('list')}
              accessibilityLabel="Hiển thị dạng danh sách"
              style={styles.layoutButton}
            >
              <FontAwesome5 name="list" size={16} color={layout === 'list' ? 'indigo' : '#aaa'} />
            </Pressable>
          </View>
        </View>

        <BookGrid books={books} layout={layout} onPressBook={openBook} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    flex: 1,
  },
  chips: {
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipActive: {
    backgroundColor: 'indigo',
    borderColor: 'indigo',
  },
  chipText: {
    color: '#333',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  layoutToggle: {
    flexDirection: 'row',
  },
  layoutButton: {
    padding: 8,
  },
});
