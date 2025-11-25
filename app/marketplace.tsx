// app/marketplace.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PackageSearch, Store, ShoppingBag, PlusCircle } from 'lucide-react-native';

const C = {
  bg: '#F6F7FB',
  card: '#FFFFFF',
  text: '#111827',
  sub: '#6B7280',
  border: '#E5E7EB',
  primary: '#1E88E5',
  success: '#16A34A',
};

export default function MarketplacePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        {/* Header */}
        <Text style={s.title}>Marketplace</Text>
        <Text style={s.sub}>Find great deals or advertise your business</Text>

        {/* Search “field” → navigates to /search */}
        <TouchableOpacity style={s.searchBtn} activeOpacity={0.9} onPress={() => router.push('/search')}>
          <PackageSearch size={18} color={C.sub} />
          <Text style={s.searchTxt}>Search products, stores…</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Quick Actions</Text>
          <View style={s.actions}>
            <TouchableOpacity
              style={[s.actionBtn, { backgroundColor: C.primary }]}
              activeOpacity={0.9}
              onPress={() => router.push('/sell')}
            >
              <PlusCircle size={20} color="#fff" />
              <Text style={s.actionTxt}>Post an Ad</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.actionBtn, { backgroundColor: C.success }]}
              activeOpacity={0.9}
              onPress={() => router.push('/favorites')}
            >
              <ShoppingBag size={20} color="#fff" />
              <Text style={s.actionTxt}>My Saved</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Stores */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Nearby Stores</Text>

          {STORES.map((name) => (
            <TouchableOpacity key={name} style={s.storeRow} activeOpacity={0.8}>
              <View style={s.storeIcon}>
                <Store size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.storeName}>{name}</Text>
                <Text style={s.storeSub}>Tap to view offers</Text>
              </View>
              <Text style={s.chev}>{'›'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.footerNote}>Smart Shopping • Marketplace</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const STORES = ['City Mart', 'Tech Zone', 'Green Foods', 'Mobile Hub'];

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 16, paddingBottom: 32 },

  title: { fontSize: 22, fontWeight: '800', color: C.text },
  sub: { color: C.sub, marginTop: 6 },

  searchBtn: {
    marginTop: 12,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingVertical: Platform.select({ android: 10, default: 12 }),
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...Platform.select({ android: { elevation: 0.5 } }),
  },
  searchTxt: { color: C.sub, fontWeight: '500' },

  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: C.border,
    ...Platform.select({ android: { elevation: 1 } }),
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: C.text, marginBottom: 8 },

  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  actionTxt: { color: '#fff', fontWeight: '800' },

  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.border,
    gap: 10,
  },
  storeIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeName: { color: C.text, fontWeight: '800' },
  storeSub: { color: C.sub, marginTop: 2 },
  chev: { color: C.sub, fontSize: 20, marginLeft: 6 },

  footerNote: { textAlign: 'center', color: C.sub, marginTop: 18, fontSize: 12 },
});
