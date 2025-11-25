import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={S.container}>
      <TouchableOpacity onPress={() => router.back()} style={S.backBtn}>
        <Text style={S.backTxt}>{"< Back"}</Text>
      </TouchableOpacity>
      <Image source={{ uri: params.image as string }} style={S.img} />
      <Text style={S.name}>{params.name}</Text>
      <Text style={S.brand}>{params.brand}</Text>
      <Text style={S.price}>{params.price}</Text>
      <Text style={S.desc}>{params.description}</Text>
      <Text style={S.barcode}>Barcode: {params.barcode}</Text>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 22, alignItems: "center" },
  backBtn: { alignSelf: "flex-start", marginBottom: 12 },
  backTxt: { color: "#2563eb", fontWeight: "bold", fontSize: 16 },
  img: { width: 120, height: 120, borderRadius: 18, marginBottom: 16, backgroundColor: "#f2f2f2" },
  name: { fontSize: 21, fontWeight: "bold", color: "#222", marginBottom: 2 },
  brand: { color: "#555", fontSize: 15, marginBottom: 2 },
  price: { fontSize: 18, fontWeight: "bold", color: "#2563eb", marginBottom: 6 },
  desc: { color: "#333", fontSize: 15, marginBottom: 10, textAlign: "center" },
  barcode: { color: "#888", fontSize: 13, marginTop: 24 },
});