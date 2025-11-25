import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const C = { bg:'#F6F7FB', text:'#111827', sub:'#6B7280', primary:'#1E88E5', card:'#FFFFFF', border:'#E5E7EB' };

export default function SellHome() {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:C.bg}}>
      <ScrollView contentContainerStyle={{padding:16,paddingBottom:32}}>
        <Text style={{fontSize:22,fontWeight:'800',color:C.text}}>Seller Center</Text>
        <Text style={{color:C.sub,marginTop:6}}>Create ads and manage your shop</Text>

        <TouchableOpacity style={s.primary} onPress={()=>router.push('/sell/product-new')}>
          <Text style={s.primaryTxt}>Post an Ad</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.hollow} onPress={()=>router.push('/sell/upgrade')}>
          <Text style={s.hollowTxt}>Upgrade Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  primary:{marginTop:16,backgroundColor:C.primary,borderRadius:12,alignItems:'center',paddingVertical:14},
  primaryTxt:{color:'#fff',fontWeight:'800'},
  hollow:{marginTop:10,borderWidth:1,borderColor:C.primary,borderRadius:12,alignItems:'center',paddingVertical:14,backgroundColor:'#fff'},
  hollowTxt:{color:C.primary,fontWeight:'800'},
});
