// app/(tabs)/search.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCartStore } from "../../lib/cartStore";

// --- Demo product catalog (search suggestions only) ---
const CATALOG = [
  { id: "1", title: "Wireless Headphones", price: 30 },
  { id: "2", title: "Smart Watch", price: 55 },
  { id: "3", title: "Bluetooth Speaker", price: 40 },
  { id: "4", title: "Phone Charger", price: 12 },
  { id: "5", title: "USB-C Cable", price: 8 },
  { id: "6", title: "Laptop Stand", price: 25 },
];

function slug(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>(); // AI tab එකෙන් query pass කරන්න
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<typeof CATALOG>([]);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const addItem = useCartStore((s) => s.addItem);
  const listRef = useRef<FlatList>(null);

  // search logic
  const handleSearch = () => {
    const filtered = CATALOG.filter((item) =>
      item.title.toLowerCase().includes(query.trim().toLowerCase())
    );
    setResults(filtered);
  };

  // Add the currently typed query to cart (single button)
  const handleAddCurrentToCart = () => {
    const title = query.trim();
    if (!title) return;
    const exact = results.find(
      (x) => x.title.toLowerCase() === title.toLowerCase()
    );

    // If exact match exists, use its id/price; else create a lightweight custom item
    const id = exact ? exact.id : `q-${slug(title)}`;
    const price = exact?.price;

    addItem({ id, title, price });
    setHighlightId(id);
  };

  // When AI opens this page with ?q=..., prefill & search & scroll/highlight
  useEffect(() => {
    if (typeof q === "string" && q.trim()) {
      const initial = q.trim();
      setQuery(initial);
      // run search then scroll to the exact item if present
      const filtered = CATALOG.filter((item) =>
        item.title.toLowerCase().includes(initial.toLowerCase())
      );
      setResults(filtered);

      // scroll after state paint
      setTimeout(() => {
        const idx = filtered.findIndex(
          (x) => x.title.toLowerCase() === initial.toLowerCase()
        );
        if (idx >= 0 && listRef.current) {
          listRef.current.scrollToIndex({ index: idx, animated: true });
          setHighlightId(filtered[idx].id);
        } else {
          // not in catalog → still allow add via button
          setHighlightId(null);
        }
      }, 50);
    }
  }, [q]);

  const onScrollToTop = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (highlightId) setHighlightId(null);
  };

  // for FlatList getItemLayout (to make scrollToIndex safe)
  const getItemLayout = (_: any, index: number) => ({
    length: 86,
    offset: 86 * index,
    index,
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1, padding: 16 }}>


       <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0f172a", marginBottom: 12, textAlign: "center" }}>
       Search Items

        </Text>

        {/* Search box + Search button */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Type anything to search..."
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              color: "#0f172a",
              backgroundColor: "#f9fafb",
            }}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={{
              marginLeft: 8,
              backgroundColor: "#0ea5e9",
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* One button to add the CURRENT query to cart */}
        <TouchableOpacity
          onPress={handleAddCurrentToCart}
          disabled={!query.trim()}
          style={{
            backgroundColor: query.trim() ? "#16a34a" : "#94a3b8",
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Add “{query.trim() || "…" }” to Cart
          </Text>
        </TouchableOpacity>

        {/* Results (no add button per item) */}
        {results.length === 0 ? (
          <Text style={{ color: "#64748b" }}>Type something and tap Search 🔍</Text>
        ) : (
          <FlatList
            ref={listRef}
            data={results}
            keyExtractor={(item) => item.id}
            getItemLayout={getItemLayout}
            onScroll={onScrollToTop}
            renderItem={({ item }) => {
              const highlighted = item.id === highlightId;
              return (
                <View
                  style={{
                    backgroundColor: highlighted ? "#e0f2fe" : "#f8fafc",
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: highlighted ? "#38bdf8" : "#e2e8f0",
                  }}
                >
                  <Text style={{ fontWeight: "700", color: "#0f172a" }}>{item.title}</Text>
                  <Text style={{ color: "#475569" }}>${item.price}</Text>
                  {highlighted && (
                    <Text style={{ color: "#0369a1", marginTop: 6, fontWeight: "600" }}>
                      (Focused from AI query)
                    </Text>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
