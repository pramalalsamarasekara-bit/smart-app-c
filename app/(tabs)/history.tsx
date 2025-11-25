import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { ArrowLeft, Search, Clock, Trash2, X, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

// Define colors directly
const appColors = {
  background: '#F5F5F5',
  cardBackground: '#FFFFFF',
  primary: '#2196F3',
  text: '#333333',
  textSecondary: '#666666',
  white: '#FFFFFF',
  error: '#F44336',
  shadow: '#000000',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FF9800',
};

// Sample search history data
const sampleSearchHistory = [
  { id: 1, query: 'Samsung Galaxy S24', timestamp: '2 hours ago', category: 'Electronics' },
  { id: 2, query: 'Nike Air Max', timestamp: '1 day ago', category: 'Shoes' },
  { id: 3, query: 'iPhone 15 Pro', timestamp: '2 days ago', category: 'Electronics' },
  { id: 4, query: 'MacBook Air M2', timestamp: '3 days ago', category: 'Computers' },
  { id: 5, query: 'Sony Headphones', timestamp: '5 days ago', category: 'Audio' },
  { id: 6, query: 'Adidas Running Shoes', timestamp: '1 week ago', category: 'Shoes' },
  { id: 7, query: 'Dell Monitor', timestamp: '1 week ago', category: 'Electronics' },
  { id: 8, query: 'Gaming Mouse', timestamp: '2 weeks ago', category: 'Accessories' },
];

// Trending searches
const trendingSearches = [
  'Latest iPhone',
  'Gaming Laptop',
  'Wireless Earbuds',
  'Smart Watch',
  'Home Decor',
  'Kitchen Appliances',
];

export default function SearchHistoryScreen() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState(sampleSearchHistory);
  const [searchQuery, setSearchQuery] = useState('');

  const goBack = () => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/(tabs)/profile');
      }
    } catch (error) {
      console.log('Navigation error:', error);
      router.replace('/(tabs)');
    }
  };

  const handleRemoveItem = (id: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setSearchHistory(searchHistory.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear Search History',
      'Are you sure you want to clear all search history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            setSearchHistory([]);
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
          },
        },
      ]
    );
  };

  const handleSearch = (query: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Add to search history
    const newSearch = {
      id: Date.now(),
      query: query,
      timestamp: 'Just now',
      category: 'Search',
    };
    
    setSearchHistory([newSearch, ...searchHistory]);
    setSearchQuery('');
    
    // Navigate to search results (placeholder)
    Alert.alert('Search', `Searching for: "${query}"`, [{ text: 'OK' }]);
  };

  const handleTrendingSearch = (query: string) => {
    handleSearch(query);
  };

  const SearchHistoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleSearch(item.query)}
      activeOpacity={0.7}
    >
      <View style={styles.historyItemLeft}>
        <Clock size={18} color={appColors.textSecondary} />
        <View style={styles.historyItemDetails}>
          <Text style={styles.historyQuery}>{item.query}</Text>
          <View style={styles.historyMeta}>
            <Text style={styles.historyTimestamp}>{item.timestamp}</Text>
            <Text style={styles.historyCategory}>• {item.category}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={16} color={appColors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const TrendingItem = ({ query }: { query: string }) => (
    <TouchableOpacity
      style={styles.trendingItem}
      onPress={() => handleTrendingSearch(query)}
      activeOpacity={0.7}
    >
      <TrendingUp size={16} color={appColors.primary} />
      <Text style={styles.trendingText}>{query}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={appColors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search History</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity
            onPress={handleClearAll}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color={appColors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor={appColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => searchQuery.trim() && handleSearch(searchQuery.trim())}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchButton}
            >
              <X size={18} color={appColors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trending Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Searches</Text>
          <View style={styles.trendingContainer}>
            {trendingSearches.map((query, index) => (
              <TrendingItem key={index} query={query} />
            ))}
          </View>
        </View>

        {/* Search History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {searchHistory.length > 0 ? (
            <View style={styles.historyContainer}>
              {searchHistory.map((item) => (
                <SearchHistoryItem key={item.id} item={item} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Clock size={60} color={appColors.textSecondary} />
              <Text style={styles.emptyTitle}>No Search History</Text>
              <Text style={styles.emptyMessage}>
                Your recent searches will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Created by Smart Shopping Team
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: appColors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
    elevation: 2,
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.text,
    flex: 1,
    textAlign: 'center',
    marginLeft: -32, // Compensate for the clear button
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: appColors.error,
    fontWeight: '600',
  },
  searchSection: {
    backgroundColor: appColors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.background,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: appColors.text,
  },
  clearSearchButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  trendingContainer: {
    paddingHorizontal: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
    elevation: 1,
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  trendingText: {
    fontSize: 14,
    color: appColors.text,
    fontWeight: '500',
  },
  historyContainer: {
    backgroundColor: appColors.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: appColors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  historyItemDetails: {
    flex: 1,
  },
  historyQuery: {
    fontSize: 16,
    color: appColors.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTimestamp: {
    fontSize: 12,
    color: appColors.textSecondary,
  },
  historyCategory: {
    fontSize: 12,
    color: appColors.textSecondary,
    marginLeft: 4,
  },
  removeButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 102, 102, 0.1)',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: appColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: appColors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: appColors.border,
  },
  footerText: {
    fontSize: 12,
    color: appColors.textSecondary,
    textAlign: 'center',
    fontWeight: '300',
  },
});