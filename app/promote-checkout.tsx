import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  CheckCircle, 
  Calendar,
  Package,
  User
} from 'lucide-react-native';
import colors from '@/constants/colors';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'visa',
    name: 'Visa Card',
    icon: <CreditCard size={24} color={colors.primary} />,
    description: 'Pay securely with your Visa card'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <DollarSign size={24} color={colors.primary} />,
    description: 'Pay with your PayPal account'
  },
  {
    id: 'easycash',
    name: 'EasyCash',
    icon: <Smartphone size={24} color={colors.primary} />,
    description: 'Mobile payment solution'
  }
];

export default function PromoteCheckout() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('visa');
  const [processing, setProcessing] = useState(false);

  const productData = params.productData ? JSON.parse(params.productData as string) : null;
  const price = Number(params.price) || 5;
  const duration = params.duration || '7';

  if (!productData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid product data</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would integrate with a payment processor here
      // For now, we'll simulate a successful payment
      
      Alert.alert(
        'Payment Successful!',
        `Your product "${productData.productName}" has been successfully promoted for ${duration} days. It will appear with a "🔥 Sponsored" badge to all Smart Shopping users.`,
        [
          {
            text: 'View Promoted Products',
            onPress: () => router.push('/promoted-products')
          },
          {
            text: 'OK',
            onPress: () => router.push('/')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Complete Payment',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.productInfo}>
              {productData.imageUri && (
                <Image source={{ uri: productData.imageUri }} style={styles.productImage} />
              )}
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{productData.productName}</Text>
                <Text style={styles.vendorName}>by {productData.vendorName}</Text>
                <Text style={styles.productPrice}>{productData.price}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.promotionDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color={colors.text} />
                <Text style={styles.detailLabel}>Promotion Duration:</Text>
                <Text style={styles.detailValue}>{duration} days</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Package size={16} color={colors.text} />
                <Text style={styles.detailLabel}>Badge:</Text>
                <Text style={styles.badgeText}>🔥 Sponsored</Text>
              </View>
              
              <View style={styles.detailRow}>
                <User size={16} color={colors.text} />
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>{productData.category}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Promotion Fee:</Text>
              <Text style={styles.totalAmount}>${price}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method.id && styles.selectedPaymentMethod
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <View style={styles.paymentMethodContent}>
                  <View style={styles.paymentMethodLeft}>
                    {method.icon}
                    <View style={styles.paymentMethodText}>
                      <Text style={styles.paymentMethodName}>{method.name}</Text>
                      <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                    </View>
                  </View>
                  <View style={styles.radioButton}>
                    {selectedPaymentMethod === method.id && (
                      <CheckCircle size={20} color={colors.primary} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Your product will be promoted for the selected duration{'\n'}
            • Promotion starts immediately after payment confirmation{'\n'}
            • Products will display with a "🔥 Sponsored" badge{'\n'}
            • Refunds are available within 24 hours of purchase{'\n'}
            • By proceeding, you agree to our Terms of Service
          </Text>
        </View>

        {/* Payment Button */}
        <TouchableOpacity
          style={[styles.payButton, processing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={processing}
        >
          <Text style={styles.payButtonText}>
            {processing ? 'Processing Payment...' : `Pay $${price} with ${selectedMethod?.name}`}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  summarySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 15,
  },
  promotionDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  paymentSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedPaymentMethod: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodText: {
    marginLeft: 12,
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  paymentMethodDescription: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
  },
  radioButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  termsText: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    lineHeight: 18,
  },
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  payButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 30,
  },
});