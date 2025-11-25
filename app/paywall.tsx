import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Crown, Sparkles, Bot, Mic, Camera, Heart, X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PaywallScreen() {
  const router = useRouter();
  const { feature } = useLocalSearchParams<{ feature?: string }>();
  const { upgradeToPremium, isLoading } = useSubscription();
  const { t, isRTL } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const handleUpgrade = async () => {
    const success = await upgradeToPremium();
    if (success) {
      router.back();
    }
  };

  const handleClose = () => {
    router.back();
  };

  const premiumFeatures = [
    {
      icon: Bot,
      title: 'AI Shopping Assistant',
      description: 'Get personalized product recommendations and smart shopping advice',
    },
    {
      icon: Mic,
      title: 'Voice Search',
      description: 'Search for products using your voice with advanced AI recognition',
    },
    {
      icon: Camera,
      title: 'Image Search',
      description: 'Find products by taking photos or uploading images',
    },
    {
      icon: Heart,
      title: 'Smart Recommendations',
      description: 'AI-powered suggestions based on your shopping history and preferences',
    },
    {
      icon: Sparkles,
      title: 'Ad-Free Experience',
      description: 'Enjoy uninterrupted shopping without any advertisements',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
          presentation: 'modal',
        }} 
      />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradientContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Crown size={48} color="#FFD700" />
            <Text style={[styles.headerTitle, isRTL && styles.headerTitleRTL]}>
              Upgrade to Premium
            </Text>
            <Text style={[styles.headerSubtitle, isRTL && styles.headerSubtitleRTL]}>
              {feature ? `Unlock ${feature} and more premium features` : 'Unlock all AI-powered features'}
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Features List */}
          <View style={styles.featuresContainer}>
            <Text style={[styles.featuresTitle, isRTL && styles.featuresTitleRTL]}>
              What's included:
            </Text>
            
            {premiumFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <feature.icon size={20} color="#667eea" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, isRTL && styles.featureTitleRTL]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, isRTL && styles.featureDescriptionRTL]}>
                    {feature.description}
                  </Text>
                </View>
                <Check size={16} color="#28a745" />
              </View>
            ))}
          </View>

          {/* Pricing Plans */}
          <View style={styles.pricingContainer}>
            <Text style={[styles.pricingTitle, isRTL && styles.pricingTitleRTL]}>
              Choose your plan:
            </Text>
            
            {/* Monthly Plan */}
            <TouchableOpacity
              style={[
                styles.planOption,
                selectedPlan === 'monthly' && styles.planOptionSelected
              ]}
              onPress={() => setSelectedPlan('monthly')}
              activeOpacity={0.8}
            >
              <View style={styles.planHeader}>
                <Text style={[styles.planTitle, isRTL && styles.planTitleRTL]}>
                  Monthly
                </Text>
                <Text style={[styles.planPrice, isRTL && styles.planPriceRTL]}>
                  $5.00
                </Text>
              </View>
              <Text style={[styles.planDescription, isRTL && styles.planDescriptionRTL]}>
                Billed monthly • Cancel anytime
              </Text>
            </TouchableOpacity>

            {/* Yearly Plan */}
            <TouchableOpacity
              style={[
                styles.planOption,
                selectedPlan === 'yearly' && styles.planOptionSelected
              ]}
              onPress={() => setSelectedPlan('yearly')}
              activeOpacity={0.8}
            >
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>SAVE 40%</Text>
              </View>
              <View style={styles.planHeader}>
                <Text style={[styles.planTitle, isRTL && styles.planTitleRTL]}>
                  Yearly
                </Text>
                <View style={styles.yearlyPricing}>
                  <Text style={[styles.planPriceOriginal, isRTL && styles.planPriceOriginalRTL]}>
                    $60.00
                  </Text>
                  <Text style={[styles.planPrice, isRTL && styles.planPriceRTL]}>
                    $36.00
                  </Text>
                </View>
              </View>
              <Text style={[styles.planDescription, isRTL && styles.planDescriptionRTL]}>
                Billed yearly • $3.00/month
              </Text>
            </TouchableOpacity>
          </View>

          {/* Upgrade Button */}
          <TouchableOpacity
            style={[styles.upgradeButton, isLoading && styles.upgradeButtonDisabled]}
            onPress={handleUpgrade}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#28a745', '#20c997']}
              style={styles.upgradeButtonGradient}
            >
              <Text style={[styles.upgradeButtonText, isRTL && styles.upgradeButtonTextRTL]}>
                {isLoading ? 'Processing...' : `Start ${selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'} Plan`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={[styles.termsText, isRTL && styles.termsTextRTL]}>
            By subscribing, you agree to our Terms of Service and Privacy Policy. 
            Subscription automatically renews unless cancelled.
          </Text>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.select({ ios: 60, android: 40 }),
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerTitleRTL: {
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  headerSubtitleRTL: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featuresTitleRTL: {
    textAlign: 'right',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureTitleRTL: {
    textAlign: 'right',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  featureDescriptionRTL: {
    textAlign: 'right',
  },
  pricingContainer: {
    marginBottom: 24,
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricingTitleRTL: {
    textAlign: 'center',
  },
  planOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planOptionSelected: {
    borderColor: '#28a745',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  planBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#ff6b35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planTitleRTL: {
    textAlign: 'right',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
  },
  planPriceRTL: {
    textAlign: 'right',
  },
  yearlyPricing: {
    alignItems: 'flex-end',
  },
  planPriceOriginal: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  planPriceOriginalRTL: {
    textAlign: 'right',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
  planDescriptionRTL: {
    textAlign: 'right',
  },
  upgradeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  upgradeButtonDisabled: {
    opacity: 0.7,
  },
  upgradeButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  upgradeButtonTextRTL: {
    textAlign: 'center',
  },
  termsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsTextRTL: {
    textAlign: 'center',
  },
});