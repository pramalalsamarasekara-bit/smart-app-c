// app/(tabs)/market/choose-plan.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const PLANS = [
  { id: "starter", name: "Starter (14 days)", price: "8" },
  { id: "monthly", name: "Monthly", price: "12" },
  { id: "annual",  name: "Annual",  price: "99" },
];

export default function ChoosePlan() {
  const go = (p: typeof PLANS[number]) =>
    router.push({ pathname: "/(tabs)/market/checkout", params: { plan: p.name, price: p.price } });

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Choose a plan</Text>
      {PLANS.map(p => (
        <TouchableOpacity key={p.id} style={styles.card} onPress={() => go(p)}>
          <Text style={styles.cardName}>{p.name}</Text>
          <Text style={styles.cardPrice}>${p.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:"#fff", padding:16 },
  title:{ fontSize:18, fontWeight:"800", marginBottom:12 },
  card:{
    borderWidth:1, borderColor:"#e5e7eb", borderRadius:14, padding:14, marginBottom:12,
    backgroundColor:"#fafafa"
  },
  cardName:{ fontWeight:"700", color:"#111827" },
  cardPrice:{ marginTop:4, color:"#1e88e5", fontWeight:"800" },
});
