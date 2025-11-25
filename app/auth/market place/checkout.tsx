import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {
  CreditCard,
  Lock,
  Check,
  ArrowRight,
  Shield,
  Star,
  Calendar,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import colors from '@/constants/colors';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard size={24} color={colors.primary} />,
    description: 'Visa, Mastercard, American Express',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <Shield size={24} color={colors.primary} />,
    description: 'Pay with your PayPal account',
  },
];

export default function CheckoutScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [loading, setLoading] = useState<boolean>(false);
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const planDetails = {
    id: params.planId as string,
    name: params.planName as string,
    price: parseFloat(params.price as string) || 0,
    duration: params.duration as string,
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardForm(prev => ({ ...prev, [field]: formattedValue }));
  };

  const validateCardForm = () => {
    if (!cardForm.number || cardForm.number.replace(/\s/g, '').length < 16) {
      Alert.alert('Error', 'Please enter a valid card number');
      return false;
    }
    if (!cardForm.expiry || cardForm.expiry.length < 5) {
      Alert.alert('Error', 'Please enter a valid expiry date');
      return false;
    }
    if (!cardForm.cvv || cardForm.cvv.length < 3) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return false;
    }
    if (!cardForm.name.trim()) {
      Alert.alert('Error', 'Please enter the cardholder name');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (selectedPaymentMethod === 'card' && !validateCardForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      Alert.alert(
        'Payment Successful!',
        `Your ${planDetails.name} subscription has been activated. You can now start selling with enhanced features.`,
        [
          {
            text: 'Go to Dashboard',
            onPress: () => router.push('/marketplace/seller-dashboard'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Please check your payment details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentMethodCard = (method: PaymentMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethodCard,
        selectedPaymentMethod === method.id && styles.selectedPaymentMethodCard,
      ]}
      onPress={() => setSelectedPaymentMethod(method.id)}
    >
      <View style={styles.paymentMethodHeader}>
        <View style={styles.paymentMethodIcon}>{method.icon}</View>
        <View style={styles.paymentMethodInfo}>
          <Text style={styles.paymentMethodName}>{method.name}</Text>
          <Text style={styles.paymentMethodDescription}>{method.description}</Text>
        </View>
        <View
          style={[
            styles.radioButton,
            selectedPaymentMethod === method.id && styles.selectedRadioButton,
          ]}
        >
          {selectedPaymentMethod === method.id && (
            <Check size={16} color={colors.white} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCardForm = () => (
    <View style={styles.cardFormContainer}>
      <Text style={styles.formSectionTitle}>Card Details</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          value={cardForm.number}
          onChangeText={(text) => handleCardInputChange('number', text)}
          keyboardType="numeric"
          maxLength={19}
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      
      <View style={styles.cardRow}>
        <View style={styles.cardRowItem}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={cardForm.expiry}
            onChangeText={(text) => handleCardInputChange('expiry', text)}
            keyboardType="numeric"
            maxLength={5}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <View style={styles.cardRowItem}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            value={cardForm.cvv}
            onChangeText={(text) => handleCardInputChange('cvv', text)}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={cardForm.name}
          onChangeText={(text) => handleCardInputChange('name', text)}
          autoCapitalize="words"
          placeholderTextColor={colors.textSecondary}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Checkout',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Star size={24} color={colors.primary} />
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{planDetails.name}</Text>
                <Text style={styles.planDuration}>{planDetails.duration}</Text>
              </View>
              <Text style={styles.planPrice}>${planDetails.price}</Text>
            </View>
            
            <View style={styles.planFeatures}>
              <View style={styles.featureItem}>
                <Check size={16} color={colors.success} />
                <Text style={styles.featureText}>Enhanced product visibility</Text>
              </View>
              <View style={styles.featureItem}>
                <Check size={16} color={colors.success} />
                <Text style={styles.featureText}>Priority customer support</Text>
              </View>
              <View style={styles.featureItem}>
                <Check size={16} color={colors.success} />
                <Text style={styles.featureText}>Advanced analytics dashboard</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${planDetails.price}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax</Text>
              <Text style={styles.totalValue}>$0.00</Text>
            </View>
            <View style={[styles.totalRow, styles.finalTotal]}>
              <Text style={styles.finalTotalLabel}>Total</Text>
              <Text style={styles.finalTotalValue}>${planDetails.price}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(renderPaymentMethodCard)}
        </View>

        {/* Card Form */}
        {selectedPaymentMethod === 'card' && renderCardForm()}

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Lock size={20} color={colors.success} />
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure
          </Text>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            Your subscription will automatically renew unless cancelled.
          </Text>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.disabledButton]}
          onPress={handlePayment}
          disabled={loading}
        >
          <Lock size={20} color={colors.white} />
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : `Pay $${planDetails.price}`}
          </Text>
          <ArrowRight size={20} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.footerInfo}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.footerInfoText}>
            Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  orderSummary: {
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  planCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planInfo: {
    flex: 1,
    marginLeft: 12,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  planDuration: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  planFeatures: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    gap: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    marginTop: 8,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentSection: {
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  paymentMethodCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedPaymentMethodCard: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cardFormContainer: {
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  cardRowItem: {
    flex: 1,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  securityText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  termsSection: {
    margin: 16,
    marginBottom: 32,
  },
  termsText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});