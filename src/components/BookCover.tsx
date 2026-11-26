import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import type { Book } from '../data/books';

interface BookCoverProps {
  book: Book;
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'medium' | 'large';
}

/** Bìa sách minh hoạ (không cần tải ảnh): màu riêng + tên sách + tác giả. */
export default function BookCover({ book, style, size = 'medium' }: BookCoverProps) {
  const titleSize = size === 'small' ? 10 : size === 'large' ? 22 : 15;
  const authorSize = size === 'small' ? 8 : size === 'large' ? 14 : 11;

  return (
    <View style={[styles.cover, { backgroundColor: book.color }, style]}>
      <View style={styles.spine} />
      <Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={4}>
        {book.title}
      </Text>
      <View style={styles.rule} />
      <Text style={[styles.author, { fontSize: authorSize }]} numberOfLines={2}>
        {book.author}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  title: {
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
  },
  rule: {
    alignSelf: 'center',
    width: '40%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginVertical: 6,
  },
  author: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
});
