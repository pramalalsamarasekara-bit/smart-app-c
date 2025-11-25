import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Crown, Check, X, Calendar, CreditCard } from 'lucide-react-native';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import colors from '@/constants/colors';

export default function SubscriptionScreen() {
  const { plan, upgradeToPremium, cancelSubscription, isLoading, subscriptionDate, expiryDate } = useSubscription();
  const { t, isRTL } = useLanguage();
  const { colors: themeColors } = useTheme();

  const handleUpgrade = async () => {
    Alert.alert(
      'Upgrade to Premium',
      'Choose your payment method to upgrade to Premium and unlock all AI features.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay with Card',
          style: 'default',
          onPress: async () => {
            const success = await upgradeToPremium();
            if (!success) {
              Alert.alert('Upgrade Failed', 'Please try again later.');
            }
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your premium subscription? You will lose access to all AI features.',
      [
        { text: 'Keep Premium', style: 'cancel' },
        { 
          text: 'Cancel Subscription', 
          style: 'destructive',
          onPress: cancelSubscription
        }
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const premiumFeatures = [
    'AI-powered shopping assistant',
    'Voice search and commands',
    'Image-based product search',
    'Personalized recommendations',
    'Ad-free experience',
    'Priority customer support',
    'Advanced price comparisons',
    'Smart shopping insights'
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Stack.Screen 
        options={{ 
          title: 'Subscription',
          headerStyle: { backgroundColor: themeColors.background },
          headerTintColor: themeColors.text,
        }} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Plan Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Crown size={32} color={plan === 'premium' ? '#FFD700' : '#999'} />
            <Text style={[styles.statusTitle, { color: themeColors.text }]}>
              {plan === 'premium' ? 'Premium Plan' : 'Free Plan'}
            </Text>
          </View>
          
          {plan === 'premium' ? (
            <View style={styles.premiumStatus}>
              <Text style={[styles.statusDescription, { color: themeColors.text }]}>
                You have access to all premium features
              </Text>
              {subscriptionDate && (
                <Text style={styles.subscriptionInfo}>
                  Subscribed: {formatDate(subscriptionDate)}
                </Text>
              )}
              {expiryDate && (
                <Text style={styles.subscriptionInfo}>
                  Renews: {formatDate(expiryDate)}
                </Text>
              )}
            </View>
          ) : (
            <Text style={[styles.statusDescription, { color: themeColors.text }]}>
              Upgrade to unlock AI features and remove ads
            </Text>
          )}
        </View>

        {/* Premium Features */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, { color: themeColors.text }]}>
            Premium Features
          </Text>
          
          {premiumFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Check 
                size={16} 
                color={plan === 'premium' ? '#28a745' : '#999'} 
              />
              <Text style={[
                styles.featureText, 
                { color: plan === 'premium' ? themeColors.text : '#999' }
              ]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <Text style={[styles.pricingTitle, { color: themeColors.text }]}>
            Premium Plan
          </Text>
          
          <View style={styles.priceBox}>
            <Text style={styles.priceAmount}>$5.00</Text>
            <Text style={styles.pricePeriod}>per month</Text>
          </View>
          
          <View style={styles.priceFeatures}>
            <View style={styles.priceFeature}>
              <CreditCard size={16} color={colors.primary} />
              <Text style={styles.priceFeatureText}>Cancel anytime</Text>
            </View>
            <View style={styles.priceFeature}>
              <Calendar size={16} color={colors.primary} />
              <Text style={styles.priceFeatureText}>Monthly billing</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {plan === 'free' ? (
            <TouchableOpacity
              style={[styles.upgradeButton, isLoading && styles.buttonDisabled]}
              onPress={handleUpgrade}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>
                {isLoading ? 'Processing...' : 'Upgrade to Premium'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.premiumActions}>
              <TouchableOpacity
                style={styles.manageButton}
                onPress={() => {
                  Alert.alert(
                    'Manage Subscription',
                    'Choose an option to manage your Premium subscription:',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Update Payment Method',
                        onPress: () => Alert.alert('Payment Method', 'This would open payment method settings in a real app.')
                      },
                      {
                        text: 'View Billing History',
                        onPress: () => Alert.alert('Billing History', 'This would show your billing history in a real app.')
                      },
                      {
                        text: 'Contact Support',
                        onPress: () => Alert.alert('Support', 'This would open support chat in a real app.')
                      }
                    ]
                  );
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.manageButtonText}>Manage Subscription</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <X size={16} color="#dc3545" />
                <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By subscribing, you agree to our Terms of Service and Privacy Policy. 
            Subscription automatically renews unless cancelled 24 hours before the end of the current period.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  premiumStatus: {
    gap: 4,
  },
  subscriptionInfo: {
    fontSize: 12,
    color: '#999',
  },
  featuresContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  pricingContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  priceBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  pricePeriod: {
    fontSize: 14,
    color: '#666',
  },
  priceFeatures: {
    gap: 8,
  },
  priceFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceFeatureText: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  premiumActions: {
    gap: 12,
  },
  manageButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  manageButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  cancelButtonText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
  },
  termsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});