import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Heart, ShoppingCart, Trash2, Star } from 'lucide-react-native';
import { useLanguage } from '../contexts/LanguageContext';

const colors = {
  background: '#F9FAFB',
  text: '#111827',
  primary: '#3B82F6',
  white: '#FFFFFF',
  lightGray: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
  shadow: '#000000',
};

const L = {
  en: {
    myWishlist: 'My Wishlist',
    items: 'items',
    reviews: 'reviews',
    inStock: 'In stock',
    outOfStock: 'Out of stock',
    addToCart: 'Add to Cart',
    emptyWishlist: 'Your wishlist is empty',
    emptyWishlistSubtext: 'Save products you love to compare and buy later.',
    startShopping: 'Start shopping',
  },
  si: {
    myWishlist: 'මගේ Wish List',
    items: 'අයිතම්',
    reviews: 'සමාලෝචන',
    inStock: 'స్టොක් ඇත',
    outOfStock: 'స్టోක් නොමැත',
    addToCart: 'කරත්තයට දමන්න',
    emptyWishlist: 'ඔබගේ Wish List හි අයිතම නැහැ',
    emptyWishlistSubtext: 'ඊළඟට මිලදී ගැනීමට කැමති දේවල් මෙතැන සුරකින්න.',
    startShopping: 'ගෙදර යාම අරඹන්න',
  },
  ar: {
    myWishlist: 'قائمتي المفضلة',
    items: 'عناصر',
    reviews: 'تقييمات',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    addToCart: 'أضف إلى السلة',
    emptyWishlist: 'قائمة المفضلة فارغة',
    emptyWishlistSubtext: 'احفظ المنتجات المفضلة للمقارنة والشراء لاحقًا.',
    startShopping: 'ابدأ التسوق',
  },
  ta: {
    myWishlist: 'என் விருப்பப் பட்டியல்',
    items: 'உருப்படிகள்',
    reviews: 'விமர்சனங்கள்',
    inStock: 'ஸ்டாக்கில் உள்ளது',
    outOfStock: 'ஸ்டாக்கில் இல்லை',
    addToCart: 'வண்டியில் சேர்',
    emptyWishlist: 'உங்கள் விருப்பப் பட்டியல் காலியாக உள்ளது',
    emptyWishlistSubtext: 'பின்னர் வாங்க சேமித்துப் போடுங்கள்.',
    startShopping: 'ஷாப்பிங் தொடங்கு',
  },
  hi: {
    myWishlist: 'मेरी विशलिस्ट',
    items: 'आइटम',
    reviews: 'समीक्षाएँ',
    inStock: 'उपलब्ध',
    outOfStock: 'उपलब्ध नहीं',
    addToCart: 'कार्ट में डालें',
    emptyWishlist: 'आपकी विशलिस्ट खाली है',
    emptyWishlistSubtext: 'पसंदीदा प्रोडक्ट सेव करें और बाद में खरीदें।',
    startShopping: 'खरीदारी शुरू करें',
  },
  ur: {
    myWishlist: 'میری پسندیدہ فہرست',
    items: 'اشیاء',
    reviews: 'ریویوز',
    inStock: 'اسٹاک میں موجود',
    outOfStock: 'اسٹاک ختم',
    addToCart: 'کارٹ میں ڈالیں',
    emptyWishlist: 'آپ کی پسندیدہ فہرست خالی ہے',
    emptyWishlistSubtext: 'پسندیدہ اشیاء محفوظ کریں اور بعد میں خریدیں۔',
    startShopping: 'خریداری شروع کریں',
  },
} as const;

// ✅ keep ONE source of truth (sample removed for release)
const wishlistItems: any[] = [];

export default function WishlistScreen() {
  const router = useRouter();
  const { t, isRTL, lang } = useLanguage();
  const S = (L as any)[lang] || L.en;

  const [items, setItems] = React.useState(wishlistItems);

  const removeFromWishlist = (id: string) => setItems(prev => prev.filter(item => item.id !== id));
  const addToCart = (item: any) => console.log('Added to cart:', item.name);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('wishlist'),
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {items.length > 0 ? (
            <>
              <View style={styles.headerSection}>
                <Heart size={32} color={colors.error} />
                <Text style={[styles.headerTitle, isRTL && styles.headerTitleRTL]}>{S.myWishlist}</Text>
                <Text style={[styles.itemCount, isRTL && styles.itemCountRTL]}>{items.length} {S.items}</Text>
              </View>

              {items.map((item) => (
                <View key={item.id} style={styles.wishlistCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={[styles.itemDetails, isRTL && styles.itemDetailsRTL]}>
                    <Text style={[styles.itemName, isRTL && styles.itemNameRTL]}>{item.name}</Text>

                    <View style={[styles.ratingContainer, isRTL && styles.ratingContainerRTL]}>
                      <Star size={14} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <Text style={styles.reviewsText}>({item.reviews} {S.reviews})</Text>
                    </View>

                    <View style={[styles.priceContainer, isRTL && styles.priceContainerRTL]}>
                      <Text style={styles.currentPrice}>${item.price}</Text>
                      {item.originalPrice > item.price && (
                        <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                      )}
                    </View>

                    <View style={[styles.stockContainer, isRTL && styles.stockContainerRTL]}>
                      <View style={[styles.stockIndicator, { backgroundColor: item.inStock ? colors.success : colors.error }]} />
                      <Text style={[styles.stockText, { color: item.inStock ? colors.success : colors.error }]}>
                        {item.inStock ? S.inStock : S.outOfStock}
                      </Text>
                    </View>

                    <View style={[styles.actionButtons, isRTL && styles.actionButtonsRTL]}>
                      <TouchableOpacity
                        style={[styles.cartButton, !item.inStock && styles.disabledButton]}
                        onPress={() => addToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart size={16} color={colors.white} />
                        <Text style={styles.cartButtonText}>{S.addToCart}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromWishlist(item.id)}>
                        <Trash2 size={16} color={colors.error} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Heart size={80} color={colors.lightGray} />
              <Text style={[styles.emptyTitle, isRTL && styles.emptyTitleRTL]}>{S.emptyWishlist}</Text>
              <Text style={[styles.emptySubtitle, isRTL && styles.emptySubtitleRTL]}>{S.emptyWishlistSubtext}</Text>
              <TouchableOpacity style={styles.shopButton} onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.shopButtonText}>{S.startShopping}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  backButton: { padding: 8, marginLeft: -8 },
  scrollContainer: { flex: 1 },
  content: { padding: 16 },
  headerSection: { alignItems: 'center', marginBottom: 24, paddingVertical: 20 },

  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginTop: 12, marginBottom:  8, textAlign: 'center'    },

  headerTitleRTL: { textAlign: 'center' },
  itemCount: { fontSize: 16, color: '#666' },
  itemCountRTL: { textAlign: 'center' },
  wishlistCard: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 12, padding: 12, marginBottom: 16,
    elevation: 2, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2,
  },
  itemImage: { width: 100, height: 100, borderRadius: 8, marginRight: 12 },
  itemDetails: { flex: 1 },
  itemDetailsRTL: { alignItems: 'flex-end' },
  itemName: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 6 },
  itemNameRTL: { textAlign: 'right' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 4 },
  ratingContainerRTL: { flexDirection: 'row-reverse' },
  ratingText: { fontSize: 14, fontWeight: '600', color: colors.text },
  reviewsText: { fontSize: 12, color: '#666' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 },
  priceContainerRTL: { flexDirection: 'row-reverse' },
  currentPrice: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  originalPrice: { fontSize: 14, color: '#666', textDecorationLine: 'line-through' },
  stockContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 6 },
  stockContainerRTL: { flexDirection: 'row-reverse' },
  stockIndicator: { width: 8, height: 8, borderRadius: 4 },
  stockText: { fontSize: 12, fontWeight: '600' },
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionButtonsRTL: { flexDirection: 'row-reverse' },
  cartButton: {
    backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, gap: 6, flex: 1,
  },
  disabledButton: { backgroundColor: '#ccc' },
  cartButtonText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  removeButton: { backgroundColor: colors.lightGray, padding: 8, borderRadius: 8 },
  emptyContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginTop: 16, marginBottom: 8 },
  emptyTitleRTL: { textAlign: 'center' },
  emptySubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 24, paddingHorizontal: 40 },
  shopButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  shopButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});
