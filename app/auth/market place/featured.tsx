import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationHeader from '@/components/NavigationHeader';

export default function FeaturedProductsScreen() {
  return (
    <View style={styles.container}>
      <NavigationHeader title="Featured Products" />
      <View style={styles.content}>
        <Text style={styles.title}>Featured Products</Text>
        <Text style={styles.description}>Featured products will be displayed here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});