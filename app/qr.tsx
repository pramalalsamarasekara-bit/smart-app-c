import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function QRScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Screen (old)</Text>
      <Text style={styles.subtitle}>This file is not used now.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
  },
});
