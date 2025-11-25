// app/(tabs)/scan/index.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ScanPickScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Scan Type</Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/(tabs)/scan/barcode")}
      >
        <MaterialCommunityIcons name="barcode-scan" size={120} color="#1E293B" />
        <Text style={styles.cardTitle}>Scan Barcode</Text>
        <Text style={styles.cardSub}>Use camera to scan product barcodes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/(tabs)/scan/qr")}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={120} color="#1E293B" />
        <Text style={styles.cardTitle}>Scan QR Code</Text>
        <Text style={styles.cardSub}>Use camera to scan QR codes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 30,
    color: "#111827",
  },
  card: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingVertical: 40,
    marginBottom: 25,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    color: "#111827",
  },
  cardSub: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
});
