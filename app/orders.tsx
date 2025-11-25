import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Package, Clock, CheckCircle } from 'lucide-react-native';

// Sample orders data
const orders = [
  {
    id: '1',
    productName: 'Wireless Headphones',
    price: '$89.99',
    status: 'Delivered',
    date: '2024-01-15',
    color: '#4CAF50'
  },
  {
    id: '2', 
    productName: 'Smart Watch',
    price: '$199.99',
    status: 'Processing',
    date: '2024-01-12',
    color: '#FF9800'
  },
  {
    id: '3',
    productName: 'Bluetooth Speaker',
    price: '$49.99',
    status: 'Shipped',
    date: '2024-01-10',
    color: '#2196F3'
  }
];

export default function OrdersScreen() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={20} color="#4CAF50" />;
      case 'Processing':
        return <Clock size={20} color="#FF9800" />;
      case 'Shipped':
        return <Package size={20} color="#2196F3" />;
      default:
        return <Package size={20} color="#666" />;
    }
  };

  return (
    <LinearGradient
      colors={['#1E88E5', '#FFC107']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Your Orders</Text>
        
        {orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.productName}>{order.productName}</Text>
              <Text style={styles.price}>{order.price}</Text>
            </View>
            
            <View style={styles.orderDetails}>
              <View style={styles.statusContainer}>
                {getStatusIcon(order.status)}
                <Text style={[styles.status, { color: order.color }]}>
                  {order.status}
                </Text>
              </View>
              <Text style={styles.date}>Ordered: {order.date}</Text>
            </View>
            
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        {orders.length === 0 && (
          <View style={styles.emptyContainer}>
            <Package size={64} color="rgba(255,255,255,0.5)" />
            <Text style={styles.emptyText}>No Orders Yet</Text>
            <Text style={styles.emptySubtext}>Your orders will appear here</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  orderDetails: {
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  trackButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
});