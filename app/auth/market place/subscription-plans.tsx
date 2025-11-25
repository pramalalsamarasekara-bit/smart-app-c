import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  Check,
  Star,
  TrendingUp,
  Award,
  Zap,
  Crown,
  ArrowRight,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import colors from '@/constants/colors';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  icon: React.ReactNode;
  color: string;
  maxProducts: number;
  featuredListings: string;
  analytics: string;
  support: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: '7 Days Plan',
    duration: '7 days',
    price: 5,
    description: 'Perfect for testing the waters',
    maxProducts: 10,
    featuredListings: 'None',
    analytics: 'Basic',
    support: 'Standard',
    color: colors.primary,
    icon: <Zap size={24} color={colors.white} />,
    features: [
      { text: 'List up to 10 products', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Standard email support', included: true },
      { text: 'Product visibility boost', included: true },
      { text: 'Featured listings', included: false },
      { text: 'Priority support', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Brand verification badge', included: false },
    ],
  },
  {
    id: 'growth',
    name: '14 Days Plan',
    duration: '14 days',
    price: 8,
    originalPrice: 10,
    description: 'Great for growing businesses',
    maxProducts: 25,
    featuredListings: '2 per week',
    analytics: 'Enhanced',
    support: 'Priority',
    color: colors.success,
    icon: <TrendingUp size={24} color={colors.white} />,
    isPopular: true,
    features: [
      { text: 'List up to 25 products', included: true },
      { text: 'Enhanced analytics & insights', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Product visibility boost', included: true },
      { text: 'Featured listings (2 per week)', included: true },
      { text: 'Sales performance tracking', included: true },
      { text: 'Customer engagement metrics', included: true },
      { text: 'Brand verification badge', included: false },
    ],
  },
  {
    id: 'premium',
    name: '30 Days Plan',
    duration: '30 days',
    price: 12,
    originalPrice: 15,
    description: 'For serious sellers and brands',
    maxProducts: 999,
    featuredListings: '1 per day',
    analytics: 'Advanced',
    support: 'Premium',
    color: colors.secondary,
    icon: <Crown size={24} color={colors.white} />,
    features: [
      { text: 'Unlimited product listings', included: true },
      { text: 'Advanced analytics & insights', included: true },
      { text: 'Premium 24/7 support', included: true },
      { text: 'Maximum visibility boost', included: true },
      { text: 'Featured listings (1 per day)', included: true },
      { text: 'Detailed sales analytics', included: true },
      { text: 'Customer behavior insights', included: true },
      { text: 'Brand verification badge', included: true },
    ],
  },
];

export default function SubscriptionPlansScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('growth');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    if (plan) {
      router.push({
        pathname: '/marketplace/checkout',
        params: {
          planId: plan.id,
          planName: plan.name,
          price: plan.price.toString(),
          duration: plan.duration,
        },
      });
    }
  };

  const renderPlanCard = (plan: SubscriptionPlan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planCard,
        selectedPlan === plan.id && styles.selectedPlanCard,
        plan.isPopular && styles.popularPlanCard,
      ]}
      onPress={() => handleSelectPlan(plan.id)}
    >
      {plan.isPopular && (
        <View style={styles.popularBadge}>
          <Star size={16} color={colors.white} fill={colors.white} />
          <Text style={styles.popularBadgeText}>Most Popular</Text>
        </View>
      )}

      <View style={[styles.planHeader, { backgroundColor: plan.color }]}>
        <View style={styles.planIcon}>{plan.icon}</View>
        <View style={styles.planTitleContainer}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
        </View>
      </View>

      <View style={styles.planContent}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${plan.price}</Text>
          {plan.originalPrice && (
            <Text style={styles.originalPrice}>${plan.originalPrice}</Text>
          )}
          <Text style={styles.duration}>/{plan.duration}</Text>
        </View>

        <View style={styles.planStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{plan.maxProducts === 999 ? '∞' : plan.maxProducts}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{plan.featuredListings}</Text>
            <Text style={styles.statLabel}>Featured</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{plan.analytics}</Text>
            <Text style={styles.statLabel}>Analytics</Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View
                style={[
                  styles.featureIcon,
                  feature.included ? styles.includedIcon : styles.excludedIcon,
                ]}
              >
                <Check
                  size={12}
                  color={feature.included ? colors.white : colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.featureText,
                  !feature.included && styles.excludedFeatureText,
                ]}
              >
                {feature.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Subscription Plans',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Selling Plan</Text>
          <Text style={styles.subtitle}>
            Unlock powerful features to grow your business and reach more customers
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {subscriptionPlans.map(renderPlanCard)}
        </View>

        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>Plan Comparison</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonHeaderText}>Feature</Text>
              <Text style={styles.comparisonHeaderText}>7 Days</Text>
              <Text style={styles.comparisonHeaderText}>14 Days</Text>
              <Text style={styles.comparisonHeaderText}>30 Days</Text>
            </View>
            
            {[
              ['Max Products', '10', '25', 'Unlimited'],
              ['Featured Listings', 'None', '2/week', '1/day'],
              ['Analytics', 'Basic', 'Enhanced', 'Advanced'],
              ['Support', 'Standard', 'Priority', 'Premium 24/7'],
              ['Brand Badge', '❌', '❌', '✅'],
            ].map(([feature, starter, growth, premium], index) => (
              <View key={index} style={styles.comparisonRow}>
                <Text style={styles.comparisonFeature}>{feature}</Text>
                <Text style={styles.comparisonValue}>{starter}</Text>
                <Text style={styles.comparisonValue}>{growth}</Text>
                <Text style={styles.comparisonValue}>{premium}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why Choose Our Platform?</Text>
          <View style={styles.benefitsList}>
            {[
              'Reach millions of active shoppers',
              'Easy-to-use seller dashboard',
              'Secure payment processing',
              'Real-time sales analytics',
              'Marketing tools & promotions',
              'Dedicated seller support',
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Award size={16} color={colors.primary} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>
            Subscribe to {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
          </Text>
          <ArrowRight size={20} color={colors.white} />
        </TouchableOpacity>
        
        <Text style={styles.footerNote}>
          Cancel anytime • Secure payment • 24/7 support
        </Text>
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
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  plansContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedPlanCard: {
    borderColor: colors.primary,
    transform: [{ scale: 1.02 }],
  },
  popularPlanCard: {
    borderColor: colors.success,
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: 16,
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    gap: 4,
    zIndex: 1,
  },
  popularBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitleContainer: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  planContent: {
    padding: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  originalPrice: {
    fontSize: 18,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  duration: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  planStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  includedIcon: {
    backgroundColor: colors.success,
  },
  excludedIcon: {
    backgroundColor: colors.lightGray,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  excludedFeatureText: {
    color: colors.textSecondary,
  },
  comparisonSection: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
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
  comparisonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  comparisonTable: {
    gap: 12,
  },
  comparisonHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  comparisonHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  comparisonFeature: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  comparisonValue: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  benefitsSection: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
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
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 12,
  },
  subscribeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});