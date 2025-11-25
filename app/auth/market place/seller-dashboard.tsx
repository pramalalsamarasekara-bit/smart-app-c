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
  Plus,
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Star,
  Users,
  ShoppingBag,
  Calendar,
  Settings,
  BarChart3,
  MessageCircle,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import Colors from '@/constants/colors';

interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  totalViews: number;
  averageRating: number;
  activeListings: number;
}

interface RecentActivity {
  id: string;
  type: 'sale' | 'view' | 'message' | 'review';
  title: string;
  description: string;
  time: string;
  amount?: number;
}

const mockStats: DashboardStats = {
  totalProducts: 24,
  totalSales: 156,
  totalRevenue: 12450,
  totalViews: 8920,
  averageRating: 4.7,
  activeListings: 18,
};

const mockActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'sale',
    title: 'iPhone 15 Pro Max sold',
    description: 'Sold to John D.',
    time: '2 hours ago',
    amount: 1199,
  },
  {
    id: '2',
    type: 'message',
    title: 'New message',
    description: 'Customer inquiry about Samsung Watch',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'review',
    title: 'New 5-star review',
    description: 'Great product quality!',
    time: '6 hours ago',
  },
  {
    id: '4',
    type: 'view',
    title: 'Product viewed',
    description: 'MacBook Pro M3 - 45 views today',
    time: '8 hours ago',
  },
];

export default function SellerDashboardScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <ShoppingBag size={20} color={Colors.success} />;
      case 'message':
        return <MessageCircle size={20} color={Colors.primary} />;
      case 'review':
        return <Star size={20} color={Colors.warning} />;
      case 'view':
        return <Eye size={20} color={Colors.textSecondary} />;
      default:
        return <Package size={20} color={Colors.textSecondary} />;
    }
  };

  const renderStatCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    color: string,
    subtitle?: string
  ) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
          {icon}
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Seller Dashboard',
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push('/marketplace/seller-settings' as any)}
            >
              <Settings size={24} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => router.push('/marketplace/sell')}
          >
            <Plus size={24} color={Colors.white} />
            <Text style={styles.primaryActionText}>Add Product</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => router.push('/marketplace/subscription-plans')}
          >
            <TrendingUp size={20} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Upgrade Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.selectedPeriodButtonText,
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatCard(
            'Total Revenue',
            `$${mockStats.totalRevenue.toLocaleString()}`,
            <DollarSign size={24} color={Colors.success} />,
            Colors.success,
            '+12% from last month'
          )}
          
          {renderStatCard(
            'Total Sales',
            mockStats.totalSales,
            <ShoppingBag size={24} color={Colors.primary} />,
            Colors.primary,
            '+8% from last month'
          )}
          
          {renderStatCard(
            'Product Views',
            mockStats.totalViews.toLocaleString(),
            <Eye size={24} color={Colors.secondary} />,
            Colors.secondary,
            '+15% from last month'
          )}
          
          {renderStatCard(
            'Average Rating',
            `${mockStats.averageRating}/5`,
            <Star size={24} color={Colors.warning} />,
            Colors.warning,
            'Based on 234 reviews'
          )}
          
          {renderStatCard(
            'Active Products',
            mockStats.activeListings,
            <Package size={24} color={Colors.textSecondary} />,
            Colors.textSecondary,
            `${mockStats.totalProducts} total products`
          )}
          
          {renderStatCard(
            'Profile Views',
            '2,340',
            <Users size={24} color={Colors.primary} />,
            Colors.primary,
            '+5% from last month'
          )}
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sales Analytics</Text>
            <TouchableOpacity onPress={() => router.push('/marketplace/analytics' as any)}>
              <BarChart3 size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartPlaceholder}>
            <BarChart3 size={48} color={Colors.textSecondary} />
            <Text style={styles.chartPlaceholderText}>
              Detailed analytics available in full version
            </Text>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => router.push('/marketplace/subscription-plans')}
            >
              <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/marketplace/activity' as any)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityList}>
            {mockActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  {getActivityIcon(activity.type)}
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                {activity.amount && (
                  <Text style={styles.activityAmount}>+${activity.amount}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksGrid}>
            {[
              { title: 'My Products', icon: Package, route: '/marketplace/my-products' },
              { title: 'Orders', icon: ShoppingBag, route: '/marketplace/orders' },
              { title: 'Messages', icon: MessageCircle, route: '/marketplace/messages' },
              { title: 'Reviews', icon: Star, route: '/marketplace/reviews' },
              { title: 'Analytics', icon: BarChart3, route: '/marketplace/analytics' },
              { title: 'Settings', icon: Settings, route: '/marketplace/seller-settings' },
            ].map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickLinkCard}
                onPress={() => router.push(link.route as any)}
              >
                <link.icon size={24} color={Colors.primary} />
                <Text style={styles.quickLinkText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  headerButton: {
    marginRight: 16,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  primaryAction: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  primaryActionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryActionText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedPeriodButtonText: {
    color: Colors.white,
  },
  statsGrid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chartSection: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  activitySection: {
    margin: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success,
  },
  quickLinksSection: {
    margin: 16,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLinkCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});