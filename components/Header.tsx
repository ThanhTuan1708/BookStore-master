import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>BookStore</Text>
      </View>

      <View style={styles.rightContainer}>
        <Pressable>
          <FontAwesome5 name="search" size={20} color="white" />
        </Pressable>

        <Pressable>
          <FontAwesome5 name="shopping-cart" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'indigo',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});