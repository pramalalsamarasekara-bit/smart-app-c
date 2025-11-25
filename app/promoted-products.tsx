import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  RefreshControl,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Heart, 
  ExternalLink, 
  Clock,
  Package,
  User,
  Mail,
  Phone
} from 'lucide-react-native';
import colors from '@/constants/colors';

interface PromotedProduct {
  id: string;
  vendorName: string;
  productName: string;
  description: string;
  imageUri: string;
  price: string;
  category: string;
  duration: string;
  contactEmail: string;
  contactPhone: string;
  promotedUntil: Date;
  views: number;
  likes: number;
}

// Mock data for promoted products
const mockPromotedProducts: PromotedProduct[] = [
  {
    id: '1',
    vendorName: 'TechGear Pro',
    productName: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    imageUri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    price: '$89.99',
    category: 'Electronics',
    duration: '14',
    contactEmail: 'sales@techgearpro.com',
    contactPhone: '+1 (555) 123-4567',
    promotedUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    views: 1247,
    likes: 89
  },
  {
    id: '2',
    vendorName: 'Fashion Forward',
    productName: 'Designer Summer Dress',
    description: 'Elegant summer dress made from premium cotton blend. Available in multiple colors and sizes. Perfect for casual and formal occasions.',
    imageUri: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
    price: '$45.00',
    category: 'Fashion',
    duration: '7',
    contactEmail: 'info@fashionforward.com',
    contactPhone: '+1 (555) 987-6543',
    promotedUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    views: 892,
    likes: 156
  },
  {
    id: '3',
    vendorName: 'Home Essentials',
    productName: 'Smart LED Desk Lamp',
    description: 'Adjustable LED desk lamp with wireless charging pad, USB ports, and app control. Energy efficient and modern design.',
    imageUri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    price: '$67.50',
    category: 'Home & Garden',
    duration: '30',
    contactEmail: 'support@homeessentials.com',
    contactPhone: '+1 (555) 456-7890',
    promotedUntil: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
    views: 2156,
    likes: 234
  }
];

export default function PromotedProducts() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<PromotedProduct[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPromotedProducts();
  }, []);

  const loadPromotedProducts = () => {
    // In a real app, this would fetch from your backend
    setProducts(mockPromotedProducts);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    loadPromotedProducts();
    setRefreshing(false);
  };

  const toggleLike = (productId: string) => {
    const newLikedProducts = new Set(likedProducts);
    if (likedProducts.has(productId)) {
      newLikedProducts.delete(productId);
    } else {
      newLikedProducts.add(productId);
    }
    setLikedProducts(newLikedProducts);

    // Update the product's like count
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
              ...product,
              likes: likedProducts.has(productId) 
                ? product.likes - 1 
                : product.likes + 1
            }
          : product
      )
    );
  };

  const getDaysRemaining = (promotedUntil: Date): number => {
    const now = new Date();
    const diffTime = promotedUntil.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const renderProduct = (product: PromotedProduct) => {
    const daysRemaining = getDaysRemaining(product.promotedUntil);
    const isLiked = likedProducts.has(product.id);

    return (
      <View key={product.id} style={styles.productCard}>
        {/* Sponsored Badge */}
        <View style={styles.sponsoredBadge}>
          <Text style={styles.sponsoredText}>🔥 Sponsored</Text>
        </View>

        {/* Product Image */}
        <Image source={{ uri: product.imageUri }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product.productName}</Text>
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => toggleLike(product.id)}
            >
              <Heart 
                size={20} 
                color={isLiked ? colors.error : colors.text} 
                fill={isLiked ? colors.error : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.vendorInfo}>
            <User size={14} color={colors.text} />
            <Text style={styles.vendorName}>by {product.vendorName}</Text>
          </View>

          <Text style={styles.productPrice}>{product.price}</Text>
          <Text style={styles.productDescription} numberOfLines={3}>
            {product.description}
          </Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{product.views.toLocaleString()}</Text>
              <Text style={styles.statLabel}>views</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{product.likes}</Text>
              <Text style={styles.statLabel}>likes</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={14} color={colors.text} />
              <Text style={styles.statLabel}>{daysRemaining} days left</Text>
            </View>
          </View>

          {/* Category */}
          <View style={styles.categoryContainer}>
            <Package size={14} color={colors.primary} />
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Contact Info */}
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Contact Vendor:</Text>
            <View style={styles.contactMethods}>
              {product.contactEmail && (
                <View style={styles.contactMethod}>
                  <Mail size={14} color={colors.primary} />
                  <Text style={styles.contactText}>{product.contactEmail}</Text>
                </View>
              )}
              {product.contactPhone && (
                <View style={styles.contactMethod}>
                  <Phone size={14} color={colors.primary} />
                  <Text style={styles.contactText}>{product.contactPhone}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact Vendor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewButton}>
              <ExternalLink size={16} color={colors.primary} />
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Promoted Products',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Featured Products</Text>
          <Text style={styles.headerSubtitle}>
            Discover amazing products from verified vendors
          </Text>
        </View>

        {/* Products List */}
        <View style={styles.productsContainer}>
          {products.map(renderProduct)}
        </View>

        {/* Empty State */}
        {products.length === 0 && (
          <View style={styles.emptyState}>
            <Package size={64} color={colors.lightGray} />
            <Text style={styles.emptyTitle}>No Promoted Products</Text>
            <Text style={styles.emptySubtitle}>
              Check back later for new featured products from our vendors
            </Text>
          </View>
        )}

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
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  productsContainer: {
    padding: 15,
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
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
  sponsoredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  sponsoredText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 10,
  },
  likeButton: {
    padding: 4,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorName: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    marginLeft: 6,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 6,
  },
  contactInfo: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  contactMethods: {
    gap: 6,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 12,
    color: colors.text,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  contactButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  viewButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 6,
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});