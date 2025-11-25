import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Plus, Edit, Trash2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      lastFour: '4532',
      expiry: '12/25',
      default: true
    },
    {
      id: '2',
      type: 'Mastercard',
      lastFour: '8901',
      expiry: '03/26',
      default: false
    }
  ];

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete:', id) }
      ]
    );
  };

  const handleAddNew = () => {
    Alert.alert('Add Payment Method', 'This would open a form to add a new payment method');
  };

  return (
    <LinearGradient
      colors={['#1E88E5', '#FFC107']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Payment Methods',
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>Manage Payment Methods</Text>
          <Text style={styles.headerSubtitle}>Add, edit, or remove your payment methods</Text>

          {/* Add New Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
            <Plus size={24} color="#1E88E5" />
            <Text style={styles.addButtonText}>Add New Payment Method</Text>
          </TouchableOpacity>

          {/* Payment Methods List */}
          <View style={styles.methodsList}>
            {paymentMethods.map(method => (
              <View key={method.id} style={styles.methodCard}>
                <View style={styles.methodInfo}>
                  <View style={styles.methodHeader}>
                    <CreditCard size={24} color="#1E88E5" />
                    <View style={styles.methodDetails}>
                      <Text style={styles.methodType}>{method.type}</Text>
                      <Text style={styles.methodNumber}>**** **** **** {method.lastFour}</Text>
                      <Text style={styles.methodExpiry}>Expires {method.expiry}</Text>
                    </View>
                    {method.default && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.methodActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => Alert.alert('Edit', 'Edit payment method')}
                  >
                    <Edit size={18} color="#666" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDelete(method.id)}
                  >
                    <Trash2 size={18} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Text style={styles.securityTitle}>Security Notice</Text>
            <Text style={styles.securityText}>
              Your payment information is encrypted and secure. We never store your full card details.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  methodsList: {
    marginBottom: 30,
  },
  methodCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodDetails: {
    marginLeft: 12,
    flex: 1,
  },
  methodType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  methodNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  methodExpiry: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  methodActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  securityNotice: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});