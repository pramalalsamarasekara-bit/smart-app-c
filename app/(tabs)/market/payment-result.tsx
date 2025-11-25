// app/(tabs)/market/payment-result.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentResult() {
  const { status = "success", plan = "", amount = "", method = "", last4 = "" } =
    useLocalSearchParams<{ status?: string; plan?: string; amount?: string; method?: string; last4?: string }>();

  const ok = status === "success";
  const methodLabel =
    method === "card" ? (last4 ? `Card •••• ${last4}` : "Card")
    : method === "payhere" ? "PayHere"
    : method === "paypal" ? "PayPal"
    : method === "googlepay" ? "Google Pay"
    : "";

  return (
    <View style={styles.wrap}>
      <Ionicons name={ok ? "checkmark-circle" : "close-circle"} size={72} color={ok ? "#16a34a" : "#ef4444"} />
      <Text style={styles.title}>{ok ? "Payment Successful" : "Payment Failed"}</Text>
      {ok && (
        <>
          <Text style={styles.sub}>Plan: {String(plan)} — ${String(amount)}</Text>
          {!!methodLabel && <Text style={styles.sub}>Method: {methodLabel}</Text>}
        </>
      )}

      <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)/market")}>
        <Text style={styles.btnText}>Back to Market</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ flex:1, backgroundColor:"#fff", alignItems:"center", justifyContent:"center", padding:16 },
  title:{ marginTop:10, fontSize:18, fontWeight:"800", color:"#111827" },
  sub:{ marginTop:6, color:"#6b7280" },
  btn:{ marginTop:18, height:46, paddingHorizontal:18, borderRadius:12, backgroundColor:"#1e88e5", alignItems:"center", justifyContent:"center" },
  btnText:{ color:"#fff", fontWeight:"800" }
});
