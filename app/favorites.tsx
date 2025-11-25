import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react-native';

const C = {
  bg: '#F5F5F5',
  card: '#FFFFFF',
  text: '#111827',
  sub: '#6B7280',
  border: '#E5E7EB',
  primary: '#1E88E5',
  shadow: '#000000',
};

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
};

const SEED: Item[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=60',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 249.99,
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=60',
    rating: 4.8,
  },
];

export default function FavoritesScreen() {
  const router = useRouter();
  const [items, setItems] = React.useState<Item[]>(SEED);

  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace('/(tabs)/profile');

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const addToCart = (it: Item) => Alert.alert('Added to cart', it.name);

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View style={s.card}>
        <Image source={{ uri: item.image }} style={s.img} />
        <View style={{ flex: 1 }}>
          <Text style={s.name}>{item.name}</Text>
          <Text style={s.price}>${item.price.toFixed(2)}</Text>
          <Text style={s.meta}>⭐ {item.rating}</Text>

          <View style={s.row}>
            <TouchableOpacity style={s.cartBtn} onPress={() => addToCart(item)}>
              <ShoppingCart size={16} color="#fff" />
              <Text style={s.cartTxt}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.removeBtn} onPress={() => remove(item.id)}>
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={s.container}>
      {/* header */}
      <View style={s.header}>
        <TouchableOpacity onPress={goBack} style={s.hBtn}>
          <ArrowLeft size={22} color={C.text} />
        </TouchableOpacity>
        <Text style={s.hTitle}>Favorites</Text>
        <View style={s.hBtn} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={s.empty}>
            <Heart size={80} color={C.border} />
            <Text style={s.empty1}>No Favorites Yet</Text>
            <Text style={s.empty2}>
              Add items to your favorites to see them here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  hBtn: { padding: 8, width: 48, alignItems: 'center' },
  hTitle: { fontSize: 18, fontWeight: '800', color: C.text },

  card: {
    flexDirection: 'row',
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: C.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  img: { width: 82, height: 82, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '700', color: C.text },
  price: { fontSize: 16, fontWeight: '800', color: C.primary, marginTop: 4 },
  meta: { fontSize: 12, color: C.sub, marginTop: 2, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  cartTxt: { color: '#fff', fontWeight: '700' },
  removeBtn: { backgroundColor: '#F3F4F6', padding: 8, borderRadius: 8 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  empty1: { fontSize: 20, fontWeight: '800', color: C.text },
  empty2: { color: C.sub, textAlign: 'center' },
});
