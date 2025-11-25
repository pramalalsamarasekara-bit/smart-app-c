// app/(tabs)/market/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function MarketHome() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      {/* Search (no sample data) */}
      <View style={styles.row}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#6b7280" />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* Empty state */}
      <View style={styles.emptyWrap}>
        <Ionicons name="bag-handle-outline" size={48} color="#9ca3af" />
        <Text style={styles.emptyTitle}>No items yet</Text>
        <Text style={styles.emptySub}>Add your first product or upgrade your plan to start selling.</Text>
      </View>

      {/* Primary actions */}
      <View style={[styles.row, { marginTop: 12 }]}>
        <Link asChild href="/(tabs)/market/sell-product">
          <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]}>
            <Ionicons name="add-circle" size={18} color="#fff" />
            <Text style={styles.primaryBtnText}>Sell Product</Text>
          </TouchableOpacity>
        </Link>
        <View style={{ width: 10 }} />
        <Link asChild href="/(tabs)/market/choose-plan">
          <TouchableOpacity style={[styles.outlineBtn, { flex: 1 }]}>
            <Ionicons name="arrow-up-circle" size={18} color="#1e88e5" />
            <Text style={styles.outlineBtnText}>Choose Plan</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 8 },
  row: { flexDirection: "row", paddingHorizontal: 16 },
  searchBox: {
    flex: 1, flexDirection: "row", alignItems: "center",
    backgroundColor: "#f3f4f6", borderRadius: 14, paddingHorizontal: 12, height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, color: "#111827" },

  emptyWrap: { alignItems: "center", justifyContent: "center", marginTop: 40, paddingHorizontal: 24 },
  emptyTitle: { marginTop: 10, fontSize: 16, fontWeight: "700", color: "#111827" },
  emptySub: { marginTop: 6, textAlign: "center", color: "#6b7280" },

  primaryBtn: {
    backgroundColor: "#1e88e5", height: 44, borderRadius: 12,
    alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, paddingHorizontal: 12
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  outlineBtn: {
    borderWidth: 1, borderColor: "#90caf9", height: 44, borderRadius: 12,
    alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, backgroundColor: "#f8fbff"
  },
  outlineBtnText: { color: "#1e88e5", fontWeight: "700" },
});
