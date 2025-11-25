// app/search-history.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, Search, Clock, X, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const C = { bg:'#F5F5F5', card:'#FFF', text:'#111827', sub:'#6B7280', border:'#E5E7EB', primary:'#1E88E5', shadow:'#000' };

// ✅ sample history data removed
const sample: any[] = [];

// ✅ trending sample suggestions removed
const trending: string[] = [];

export default function SearchHistory() {
  const router = useRouter();
  const [list, setList] = useState(sample);
  const [q, setQ] = useState('');

  const back = () => (router.canGoBack() ? router.back() : router.replace('/(tabs)/profile'));
  const search = (query: string) => {
    const clean = query.trim();
    if (!clean) return;
    setList([{ id: Date.now(), query: clean, time: 'Just now', cat: 'Search' }, ...list]);
    setQ('');
  };

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: C.bg }}>
      <View style={s.header}>
        <TouchableOpacity onPress={back} style={s.hBtn}><ArrowLeft size={22} color={C.text} /></TouchableOpacity>
        <Text style={s.hTitle}>Search History</Text>
        <TouchableOpacity onPress={() => setList([])} style={s.hBtn}><Text style={{ color:'#EF4444', fontWeight:'700' }}>Clear</Text></TouchableOpacity>
      </View>

      <View style={s.searchBox}>
        <Search size={18} color={C.sub} />
        <TextInput
          style={s.input}
          placeholder="Search for products..."
          placeholderTextColor={C.sub}
          value={q}
          onChangeText={setQ}
          onSubmitEditing={() => search(q)}
          returnKeyType="search"
        />
        {!!q && <TouchableOpacity onPress={() => setQ('')}><X size={18} color={C.sub} /></TouchableOpacity>}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* 🔒 Show 'Trending' only if there are items */}
        {trending.length > 0 && (
          <>
            <Text style={s.secTitle}>Trending Searches</Text>
            <View style={{ paddingHorizontal:16 }}>
              {trending.map((t, i) => (
                <TouchableOpacity key={i} style={s.trend} onPress={() => search(t)}>
                  <TrendingUp size={16} color={C.primary} /><Text style={s.trendTxt}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={[s.secTitle, { marginTop: 16 }]}>Recent Searches</Text>
        {list.length ? (
          <View style={s.listCard}>
            {list.map(it => (
              <View key={it.id} style={s.item}>
                <View style={{ flexDirection:'row', alignItems:'center', gap:10, flex:1 }}>
                  <Clock size={16} color={C.sub} />
                  <View style={{ flex:1 }}>
                    <Text style={s.q}>{it.query}</Text>
                    <Text style={s.meta}>{it.time} • {it.cat}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setList(list.filter(x => x.id !== it.id))} style={s.remove}>
                  <X size={16} color={C.sub} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ alignItems:'center', paddingVertical:40 }}>
            <Clock size={56} color={C.sub} />
            <Text style={s.empty1}>No Search History</Text>
            <Text style={s.empty2}>Your recent searches will appear here</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:12, paddingVertical:12, backgroundColor:'#fff', borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:C.border },
  hBtn:{ padding:8, width:48, alignItems:'center' },
  hTitle:{ fontSize:18, fontWeight:'800', color:C.text },
  searchBox:{ flexDirection:'row', alignItems:'center', gap:10, backgroundColor:'#fff', paddingHorizontal:16, paddingVertical:12, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:C.border },
  input:{ flex:1, fontSize:16, color:C.text },
  secTitle:{ fontSize:16, fontWeight:'800', color:C.text, marginHorizontal:16, marginTop:12, marginBottom:8 },
  trend:{ flexDirection:'row', alignItems:'center', gap:8, backgroundColor:'#fff', paddingHorizontal:14, paddingVertical:10, borderRadius:8, marginBottom:8, elevation:1, shadowColor:C.shadow, shadowOpacity:0.05, shadowRadius:1, shadowOffset:{ width:0, height:1 } },
  trendTxt:{ color:C.text, fontWeight:'600' },
  listCard:{ backgroundColor:'#fff', marginHorizontal:16, borderRadius:12, elevation:2, shadowColor:C.shadow, shadowOpacity:0.1, shadowRadius:2, shadowOffset:{ width:0, height:1 } },
  item:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16, paddingVertical:12, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:C.border },
  q:{ fontSize:16, color:C.text, fontWeight:'600', marginBottom:2 },
  meta:{ fontSize:12, color:C.sub },
  remove:{ padding:8, borderRadius:16, backgroundColor:'rgba(0,0,0,0.05)' },
  empty1:{ marginTop:12, fontSize:18, fontWeight:'800', color:C.text },
  empty2:{ color:C.sub, marginTop:4, textAlign:'center' },
});
