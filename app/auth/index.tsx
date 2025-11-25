// app/auth/index.tsx
import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthIndex() {
  const router = useRouter();
  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>Welcome Back</Text>
      <Text style={s.sub}>Sign in to your account to continue shopping</Text>

      <View style={s.card}>
        <Text style={s.label}>Email Address</Text>
        <TextInput placeholder="you@example.com" style={s.input} />
        <Text style={[s.label, { marginTop:12 }]}>Password</Text>
        <TextInput placeholder="••••••••" secureTextEntry style={s.input} />

        <TouchableOpacity style={s.primary} onPress={() => router.replace('/(tabs)')}>
          <Text style={s.primaryTxt}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={s.link}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, padding:16, backgroundColor:'#fff' },
  title:{ fontSize:28, fontWeight:'800', marginTop:8 },
  sub:{ color:'#6B7280', marginTop:6 },
  card:{ marginTop:16 },
  label:{ color:'#111827', fontWeight:'700', marginBottom:6 },
  input:{ borderWidth:1, borderColor:'#E5E7EB', borderRadius:10, padding:12 },
  primary:{ backgroundColor:'#1E88E5', paddingVertical:14, borderRadius:12, alignItems:'center', marginTop:16 },
  primaryTxt:{ color:'#fff', fontWeight:'800' },
  link:{ color:'#1E88E5', textAlign:'center', marginTop:16, fontWeight:'700' },
});
