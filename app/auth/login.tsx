import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, TextInput, Alert, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

const C = { bg:'#F5F5F5', card:'#FFFFFF', text:'#111827', sub:'#6B7280', border:'#E5E7EB', primary:'#1E88E5' };

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [hide, setHide] = useState(true);

  const back = () => (router.canGoBack() ? router.back() : router.replace('/(tabs)'));
  const onSignIn = () => Alert.alert('Sign In', 'Demo');

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={back} style={s.hBtn}>
          <ArrowLeft size={22} color={C.text} />
        </TouchableOpacity>
        <Text style={s.hTitle}>Welcome Back</Text>
        <View style={s.hBtn} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text style={s.subtitle}>Sign in to your account to continue shopping</Text>

        {/* Email */}
        <View style={s.inputWrap}>
          <Mail size={18} color={C.sub} />
          <TextInput
            style={s.input}
            placeholder="Email Address"
            placeholderTextColor={C.sub}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={s.inputWrap}>
          <Lock size={18} color={C.sub} />
          <TextInput
            style={s.input}
            placeholder="Password"
            placeholderTextColor={C.sub}
            secureTextEntry={hide}
            value={pw}
            onChangeText={setPw}
          />
          <TouchableOpacity onPress={() => setHide(!hide)} style={s.eyeBtn}>
            {hide ? <Eye size={18} color={C.sub} /> : <EyeOff size={18} color={C.sub} />}
          </TouchableOpacity>
        </View>

        {/* Sign In */}
        <TouchableOpacity style={s.primaryBtn} onPress={onSignIn} activeOpacity={0.8}>
          <Text style={s.primaryTxt}>Sign In</Text>
        </TouchableOpacity>

        {/* Helper row (No gap! Use marginLeft) */}
        <View style={s.rowCenter}>
          <Text style={s.link}>Create Account</Text>
          <Text style={[s.muted, {marginLeft: 6}]}>Don't have an account?</Text>
        </View>

        {/* Guest */}
        <TouchableOpacity style={s.ghostBtn} onPress={() => router.replace('/(tabs)')} activeOpacity={0.8}>
          <Text style={s.ghostTxt}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:C.bg },
  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between',
    paddingHorizontal:12, paddingVertical:12, backgroundColor:'#fff',
    borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:C.border },
  hBtn:{ width:48, padding:8, alignItems:'center' },
  hTitle:{ fontSize:18, fontWeight:'800', color:C.text },

  subtitle:{ textAlign:'center', color:C.sub, marginTop:8, marginBottom:16, fontSize:Platform.OS==='android'?14:15 },

  inputWrap:{ flexDirection:'row', alignItems:'center', backgroundColor:'#fff',
    borderRadius:12, borderWidth:StyleSheet.hairlineWidth, borderColor:C.border,
    paddingHorizontal:12, paddingVertical:Platform.OS==='android'?10:12, marginBottom:12 },
  input:{ flex:1, color:C.text, fontSize:16 }, eyeBtn:{ padding:6 },

  primaryBtn:{ backgroundColor:C.primary, paddingVertical:14, borderRadius:14, alignItems:'center', marginTop:8,
    elevation:Platform.OS==='android'?2:0 },
  primaryTxt:{ color:'#fff', fontSize:16, fontWeight:'800' },

  rowCenter:{ flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:16 },
  muted:{ color:C.sub, fontSize:14 },
  link:{ color:C.primary, fontSize:14, fontWeight:'700' },

  ghostBtn:{ marginTop:20, borderWidth:2, borderColor:C.border, backgroundColor:'#fff',
    paddingVertical:14, borderRadius:14, alignItems:'center' },
  ghostTxt:{ color:C.text, fontSize:16, fontWeight:'700' },
});