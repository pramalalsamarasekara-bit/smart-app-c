import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CATS = ["Electronics", "Fashion", "Home & Garden", "Sports", "Beauty"];
const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"];

export default function SellProduct() {
  const [cat, setCat] = useState("Electronics");
  const [cond, setCond] = useState("New");

  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.label}>Product Images <Text style={{ color: "#ef4444" }}>*</Text></Text>
      <View style={s.imagesRow}>
        <TouchableOpacity style={s.uploader}>
          <Ionicons name="cloud-upload-outline" size={24} color="#1e88e5" />
          <Text style={s.upText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.uploader}>
          <Ionicons name="camera" size={24} color="#1e88e5" />
          <Text style={s.upText}>Camera</Text>
        </TouchableOpacity>
      </View>

      <Text style={[s.groupTitle]}>Basic Information</Text>
      <Text style={s.inputLabel}>Product Name <Text style={{ color: "#ef4444" }}>*</Text></Text>
      <TextInput placeholder="Product Name" style={s.input} />
      <Text style={s.inputLabel}>Product Description <Text style={{ color: "#ef4444" }}>*</Text></Text>
      <TextInput placeholder="Write a short description" style={[s.input, { height: 100, textAlignVertical: "top" }]} multiline />
      <Text style={s.inputLabel}>Brand</Text>
      <TextInput placeholder="Brand (optional)" style={s.input} />

      <Text style={[s.groupTitle]}>Category & Condition</Text>
      <Text style={s.inputLabel}>Category <Text style={{ color: "#ef4444" }}>*</Text></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {CATS.map(c => (
          <TouchableOpacity key={c} onPress={() => setCat(c)} style={[s.chip, cat === c && s.chipActive]}>
            <Text style={[s.chipText, cat === c && s.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[s.inputLabel, { marginTop: 14 }]}>Condition <Text style={{ color: "#ef4444" }}>*</Text></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {CONDITIONS.map(c => (
          <TouchableOpacity key={c} onPress={() => setCond(c)} style={[s.chip, cond === c && s.chipActive]}>
            <Text style={[s.chipText, cond === c && s.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={s.submitBtn}>
        <Text style={s.submitText}>Continue</Text>
        <Ionicons name="arrow-forward" color="#fff" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },
  label: { fontWeight: "700", color: "#111827", marginBottom: 8 },
  imagesRow: { flexDirection: "row", gap: 12, marginBottom: 10 },
  uploader: {
    borderWidth: 1, borderColor: "#e5e7eb", borderStyle: "dashed", borderRadius: 12,
    height: 90, flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fafafa"
  },
  upText: { marginTop: 6, color: "#1e88e5", fontWeight: "700" },
  groupTitle: { marginTop: 12, fontWeight: "700", color: "#111827" },
  inputLabel: { marginTop: 10, marginBottom: 6, color: "#374151", fontWeight: "600" },
  input: {
    borderWidth: 1, borderColor: "#e5e7eb", backgroundColor: "#fff", borderRadius: 12,
    paddingHorizontal: 12, height: 44, color: "#111827"
  },
  chip: { paddingHorizontal: 12, height: 36, borderRadius: 20, borderWidth: 1, borderColor: "#e5e7eb", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  chipActive: { backgroundColor: "#e3f2fd", borderColor: "#90caf9" },
  chipText: { color: "#374151", fontWeight: "600" },
  chipTextActive: { color: "#1e88e5" },
  submitBtn: { marginTop: 20, height: 48, backgroundColor: "#1e88e5", borderRadius: 12, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  submitText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
