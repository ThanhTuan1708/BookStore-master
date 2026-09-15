import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from './BookCard'; 

interface BookGridCardProps {
  book?: Book;
}

export default function BookGridCard({ book }: BookGridCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: book?.imageUrl || 'https://via.placeholder.com/150x200' }}
        style={styles.coverImage}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {book?.title || 'Tên sách'}
        </Text>
        <Text style={styles.priceText}>
          {book?.price || '0 đ'}
        </Text>
      </View>
    </View>
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
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d9534f',
  },
});