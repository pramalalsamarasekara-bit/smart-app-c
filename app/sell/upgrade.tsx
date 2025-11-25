import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const C={bg:'#F6F7FB',card:'#FFF',text:'#111827',sub:'#6B7280',border:'#E5E7EB',primary:'#1E88E5',good:'#16A34A'};

export default function UpgradePlan(){
  const router = useRouter();
  const [plan,setPlan]=useState<'7'|'14'>('7');
  return(
    <SafeAreaView style={{flex:1,backgroundColor:C.bg}}>
      <ScrollView contentContainerStyle={{padding:16,paddingBottom:32}}>
        <Text style={{fontSize:22,fontWeight:'800',color:C.text}}>Choose Your Selling Plan</Text>
        <Text style={{color:C.sub,marginTop:6}}>Select a plan to boost your ads</Text>

        {[{k:'7',price:5,title:'7 Days Plan'},{k:'14',price:8,title:'14 Days Plan'}].map(p=>(
          <TouchableOpacity key={p.k} onPress={()=>setPlan(p.k as any)}
            style={[s.card, plan===p.k && {borderColor:C.primary, ...Platform.select({android:{elevation:2}})}]}>
            <Text style={s.cardTitle}>{p.title}</Text>
            <Text style={{color:C.text,fontWeight:'800'}}>${p.price} / {p.k} days</Text>
            <View style={{marginTop:8}}>
              {['Visibility boost','Analytics dashboard','Email support'].map(t=>(
                <Text key={t} style={{color:C.text,marginTop:4}}>• {t}</Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.cta} onPress={()=>router.push({pathname:'/sell/checkout',params:{plan}})}>
          <Text style={s.ctaTxt}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const s=StyleSheet.create({
  card:{backgroundColor:C.card,borderRadius:14,padding:12,marginTop:14,borderWidth:1,borderColor:C.border},
  cardTitle:{fontWeight:'800',color:C.text,marginBottom:4},
  cta:{marginTop:16,backgroundColor:C.primary,borderRadius:12,alignItems:'center',paddingVertical:14},
  ctaTxt:{color:'#fff',fontWeight:'800'},
});
