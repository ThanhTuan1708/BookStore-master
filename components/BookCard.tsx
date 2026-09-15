import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export interface Book {
    id?: string;
    title?: string;
    author?: string;
    price?: string;
    imageUrl?: string;
  }
  
  interface BookCardProps {
    book?: Book;
  }
  
export default function BookCard({ book }: BookCardProps) { 
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: book?.imageUrl || 'https://via.placeholder.com/80x110' }}
        style={styles.coverImage}
      />
      <View style={styles.infoColumn}>
        <View>
          <Text style={styles.titleText} numberOfLines={2}>
            {book?.title || 'Tên sách'}
          </Text>

          <Text style={styles.authorText} numberOfLines={1}>
            {book?.author || 'Tác giả'}
          </Text>
        </View>
        <Text style={styles.priceText}>
          {book?.price || '0 đ'}
        </Text>
      </View>
    </View>
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
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d9534f',
  },
});