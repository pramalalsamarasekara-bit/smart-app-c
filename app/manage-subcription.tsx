import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Crown, Calendar, CreditCard, User, AlertCircle, CheckCircle, XCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import NavigationHeader from '@/components/NavigationHeader';


interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  email?: string;
}

export default function ManageSubscriptionScreen() {
  const router = useRouter();
  const { plan, cancelSubscription, isLoading, subscriptionDate, expiryDate } = useSubscription();
  const { t } = useLanguage();
  const { colors: themeColors } = useTheme();
  const [loadingData, setLoadingData] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'canceled' | 'expired'>('active');

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoadingData(true);
      
      // Simulate loading subscription data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock payment method data
      if (plan === 'premium') {
        setPaymentMethod({
          id: 'pm_1234567890',
          type: 'card',
          last4: '4242',
          brand: 'Visa'
        });
        
        // Check if subscription is expired
        if (expiryDate && new Date() > expiryDate) {
          setSubscriptionStatus('expired');
        } else {
          setSubscriptionStatus('active');
        }
      }
    } catch (error) {
      console.warn('Failed to load subscription data:', error);
      Alert.alert(
        t('errorOccurred'),
        'Failed to load subscription details. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setLoadingData(false);
    }
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleUpdatePayment = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/update-payment');
  };

  const handleCancelSubscription = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    Alert.alert(
      t('cancelSubscription'),
      t('areYouSureCancel'),
      [
        { text: t('keepPremium'), style: 'cancel' },
        { 
          text: t('cancelSubscription'), 
          style: 'destructive',
          onPress: async () => {
            await cancelSubscription();
            router.back();
          }
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

  const getStatusIcon = () => {
    switch (subscriptionStatus) {
      case 'active':
        return <CheckCircle size={20} color={themeColors.success} />;
      case 'canceled':
        return <XCircle size={20} color={themeColors.error} />;
      case 'expired':
        return <AlertCircle size={20} color={themeColors.error} />;
      default:
        return <AlertCircle size={20} color={themeColors.border} />;
    }
  };

  const getStatusText = () => {
    switch (subscriptionStatus) {
      case 'active':
        return 'Active';
      case 'canceled':
        return 'Canceled';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    switch (subscriptionStatus) {
      case 'active':
        return themeColors.success;
      case 'canceled':
      case 'expired':
        return themeColors.error;
      default:
        return themeColors.text;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backButton: {
      padding: Platform.select({ android: 10, default: 8 }),
      marginLeft: Platform.select({ android: -6, default: -8 }),
    },
    scrollContainer: {
      flex: 1,
    },
    content: {
      padding: Platform.select({ android: 12, default: 16 }),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    loadingText: {
      fontSize: 16,
      fontWeight: '500',
    },
    card: {
      borderRadius: Platform.select({ android: 8, default: 12 }),
      padding: Platform.select({ android: 18, default: 20 }),
      marginBottom: Platform.select({ android: 12, default: 16 }),
      elevation: Platform.select({ android: 2, default: 0 }),
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: Platform.select({ android: 0, default: 0.1 }),
      shadowRadius: Platform.select({ android: 0, default: 2 }),
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Platform.select({ android: 16, default: 20 }),
      gap: 12,
    },
    cardTitle: {
      fontSize: Platform.select({ android: 17, default: 18 }),
      fontWeight: Platform.select({ android: '700', default: 'bold' }),
    },
    planDetails: {
      gap: Platform.select({ android: 12, default: 16 }),
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailLabel: {
      fontSize: Platform.select({ android: 14, default: 15 }),
      fontWeight: '500',
    },
    detailValue: {
      fontSize: Platform.select({ android: 14, default: 15 }),
      fontWeight: Platform.select({ android: '600', default: '500' }),
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    freeMessage: {
      marginTop: Platform.select({ android: 12, default: 16 }),
      padding: Platform.select({ android: 12, default: 16 }),
      backgroundColor: themeColors.lightGray,
      borderRadius: Platform.select({ android: 6, default: 8 }),
    },
    freeMessageText: {
      fontSize: Platform.select({ android: 13, default: 14 }),
      textAlign: 'center',
      lineHeight: Platform.select({ android: 18, default: 20 }),
    },
    paymentDetails: {
      marginBottom: Platform.select({ android: 16, default: 20 }),
    },
    paymentMethod: {
      padding: Platform.select({ android: 12, default: 16 }),
      backgroundColor: themeColors.lightGray,
      borderRadius: Platform.select({ android: 6, default: 8 }),
    },
    paymentMethodText: {
      fontSize: Platform.select({ android: 14, default: 15 }),
      fontWeight: '500',
    },
    updatePaymentButton: {
      borderWidth: 1,
      borderRadius: Platform.select({ android: 6, default: 8 }),
      paddingVertical: Platform.select({ android: 10, default: 12 }),
      paddingHorizontal: Platform.select({ android: 16, default: 20 }),
      alignItems: 'center',
    },
    updatePaymentText: {
      fontSize: Platform.select({ android: 14, default: 15 }),
      fontWeight: Platform.select({ android: '600', default: '500' }),
    },
    actionButtons: {
      gap: Platform.select({ android: 10, default: 12 }),
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Platform.select({ android: 12, default: 14 }),
      paddingHorizontal: Platform.select({ android: 16, default: 20 }),
      borderRadius: Platform.select({ android: 6, default: 8 }),
      gap: 8,
    },
    actionButtonText: {
      fontSize: Platform.select({ android: 14, default: 15 }),
      fontWeight: Platform.select({ android: '600', default: '500' }),
    },
    cancelButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Platform.select({ android: 12, default: 14 }),
      paddingHorizontal: Platform.select({ android: 16, default: 20 }),
      borderWidth: 1,
      borderRadius: Platform.select({ android: 6, default: 8 }),
      gap: 8,
    },
    cancelButtonText: {
      fontSize: Platform.select({ android: 14, default: 15 }),
      fontWeight: Platform.select({ android: '600', default: '500' }),
    },
    upgradeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Platform.select({ android: 14, default: 16 }),
      paddingHorizontal: Platform.select({ android: 16, default: 20 }),
      borderRadius: Platform.select({ android: 6, default: 8 }),
      gap: 8,
    },
    upgradeButtonText: {
      fontSize: Platform.select({ android: 15, default: 16 }),
      fontWeight: Platform.select({ android: '700', default: 'bold' }),
    },
  });

  if (loadingData) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <NavigationHeader 
          title={t('manageSubscription') || 'Manage Subscription'}
          showBackButton={true}
          backgroundColor={themeColors.background}
          textColor={themeColors.text}
        />
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.primary} />
          <Text style={[styles.loadingText, { color: themeColors.text }]}>
            {t('loading')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <NavigationHeader 
        title={t('manageSubscription') || 'Manage Subscription'}
        showBackButton={true}
        backgroundColor={themeColors.background}
        textColor={themeColors.text}
      />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Current Plan Card */}
          <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
            <View style={styles.cardHeader}>
              <Crown size={24} color={plan === 'premium' ? '#FFD700' : themeColors.border} />
              <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                {plan === 'premium' ? t('premiumPlan') : t('freePlan')}
              </Text>
            </View>
            
            <View style={styles.planDetails}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>Status:</Text>
                <View style={styles.statusContainer}>
                  {getStatusIcon()}
                  <Text style={[styles.detailValue, { color: getStatusColor() }]}>
                    {getStatusText()}
                  </Text>
                </View>
              </View>
              
              {plan === 'premium' && subscriptionDate && (
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>
                    {t('subscribed')}:
                  </Text>
                  <Text style={[styles.detailValue, { color: themeColors.text }]}>
                    {formatDate(subscriptionDate)}
                  </Text>
                </View>
              )}
              
              {plan === 'premium' && expiryDate && subscriptionStatus === 'active' && (
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>
                    Next billing:
                  </Text>
                  <Text style={[styles.detailValue, { color: themeColors.text }]}>
                    {formatDate(expiryDate)}
                  </Text>
                </View>
              )}
            </View>
            
            {plan === 'free' && (
              <View style={styles.freeMessage}>
                <Text style={[styles.freeMessageText, { color: themeColors.textSecondary }]}>
                  {t('upgradeToUnlock')}
                </Text>
              </View>
            )}
          </View>

          {/* Payment Method Card */}
          {plan === 'premium' && paymentMethod && (
            <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
              <View style={styles.cardHeader}>
                <CreditCard size={24} color={themeColors.text} />
                <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                  Payment Method
                </Text>
              </View>
              
              <View style={styles.paymentDetails}>
                {paymentMethod.type === 'card' && (
                  <View style={styles.paymentMethod}>
                    <Text style={[styles.paymentMethodText, { color: themeColors.text }]}>
                      {paymentMethod.brand} •••• {paymentMethod.last4}
                    </Text>
                  </View>
                )}
                
                {paymentMethod.type === 'paypal' && (
                  <View style={styles.paymentMethod}>
                    <Text style={[styles.paymentMethodText, { color: themeColors.text }]}>
                      PayPal - {paymentMethod.email}
                    </Text>
                  </View>
                )}
              </View>
              
              <TouchableOpacity
                style={[styles.updatePaymentButton, { borderColor: themeColors.primary }]}
                onPress={handleUpdatePayment}
                activeOpacity={0.7}
              >
                <Text style={[styles.updatePaymentText, { color: themeColors.primary }]}>
                  {t('updatePaymentMethod')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Subscription Actions */}
          {plan === 'premium' && (
            <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
              <View style={styles.cardHeader}>
                <User size={24} color={themeColors.text} />
                <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                  Subscription Actions
                </Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: themeColors.primary }]}
                  onPress={() => {
                    Alert.alert(
                      t('billingHistory'),
                      t('billingHistoryMessage'),
                      [{ text: 'OK', style: 'default' }]
                    );
                  }}
                  activeOpacity={0.8}
                >
                  <Calendar size={16} color={themeColors.white} />
                  <Text style={[styles.actionButtonText, { color: themeColors.white }]}>
                    {t('viewBillingHistory')}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: themeColors.secondary }]}
                  onPress={() => {
                    Alert.alert(
                      t('support'),
                      t('supportMessage'),
                      [{ text: 'OK', style: 'default' }]
                    );
                  }}
                  activeOpacity={0.8}
                >
                  <User size={16} color={themeColors.white} />
                  <Text style={[styles.actionButtonText, { color: themeColors.white }]}>
                    {t('contactSupport')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Cancel Subscription */}
          {plan === 'premium' && subscriptionStatus === 'active' && (
            <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: themeColors.error }]}
                onPress={handleCancelSubscription}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <XCircle size={16} color={themeColors.error} />
                <Text style={[styles.cancelButtonText, { color: themeColors.error }]}>
                  {isLoading ? 'Canceling...' : t('cancelSubscription')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Upgrade Button for Free Users */}
          {plan === 'free' && (
            <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
              <TouchableOpacity
                style={[styles.upgradeButton, { backgroundColor: themeColors.primary }]}
                onPress={() => router.push('/settings/subscription')}
                activeOpacity={0.8}
              >
                <Crown size={16} color={themeColors.white} />
                <Text style={[styles.upgradeButtonText, { color: themeColors.white }]}>
                  {t('upgradeNow')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

