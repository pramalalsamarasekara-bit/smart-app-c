// app/settings/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bell, Globe, Shield, HelpCircle, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import LanguageModal from '../../components/LanguageModal';
import { useLanguage } from '../../contexts/LanguageContext';

const STORAGE = {
  NOTIF: '@settings_notifs', // master switch
};

export default function SettingsScreen() {
  const router = useRouter();
  const { lang, languages } = useLanguage();
  const [showLang, setShowLang] = useState(false);
  const [notif, setNotif] = useState(true);

  useEffect(() => {
    (async () => {
      const a = await AsyncStorage.getItem(STORAGE.NOTIF);
      if (a != null) setNotif(a === 'true');
    })();
  }, []);

  const currentLangName = languages.find(l => l.key === lang)?.name ?? 'Language';

  const toggleNotif = async (v: boolean) => {
    setNotif(v);
    await AsyncStorage.setItem(STORAGE.NOTIF, v ? 'true' : 'false');
  };

  const Item = ({
    icon, title, sub, right, onPress, disabled,
  }: {
    icon: React.ReactNode; title: string; sub?: string; right?: React.ReactNode;
    onPress?: () => void; disabled?: boolean;
  }) => (
    <TouchableOpacity
      activeOpacity={onPress && !disabled ? 0.75 : 1}
      onPress={disabled ? undefined : onPress}
      style={[s.item, disabled && { opacity: 0.6 }]}
    >
      <View style={s.itemL}>
        <View style={s.icon}>{icon}</View>
        <View style={{ flex: 1 }}>
          <Text style={s.title}>{title}</Text>
          {sub ? <Text style={s.sub}>{sub}</Text> : null}
        </View>
      </View>
      {right}
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* Card 1: Notifications + Language */}
        <View style={s.card}>
          <Item
            icon={<Bell size={22} color="#1E88E5" />}
            title="Notifications"
            sub="Manage your notification preferences"
            right={<Switch value={notif} onValueChange={toggleNotif} />}
            onPress={() => router.push('/settings/notifications')}
          />
          <View style={s.sep} />
          <Item
            icon={<Globe size={22} color="#1E88E5" />}
            title="Language"
            sub={currentLangName}
            onPress={() => setShowLang(true)}
          />
        </View>

        {/* Card 2: Privacy + Help + About */}
        <View style={s.card}>
          <Item
            icon={<Shield size={22} color="#1E88E5" />}
            title="Privacy & Security"
            sub="Manage your privacy settings"
            onPress={() => router.push('/settings/privacy')}
          />
          <View style={s.sep} />
          <Item
            icon={<HelpCircle size={22} color="#1E88E5" />}
            title="Help & Support"
            sub="Get help and contact support"
            onPress={() => router.push('/help')}  // change to '/settings/help' if your help screen is inside settings
          />
          <View style={s.sep} />
          <Item
            icon={<Info size={22} color="#1E88E5" />}
            title="About"
            sub="App version and information"
            onPress={() => router.push('/settings/about')}
          />
        </View>

        <Text style={s.footer}>Smart Shopping v1.0.0</Text>
      </ScrollView>

      <LanguageModal visible={showLang} onClose={() => setShowLang(false)} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7F9' },
  content: { padding: 16, paddingBottom: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderColor: '#E5E7EB',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 14,
  },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  itemL: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  icon: { height: 36, width: 36, borderRadius: 8, backgroundColor: '#E9F3FE', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  sub: { color: '#6B7280', marginTop: 2, fontSize: 13 },
  sep: { height: 1, backgroundColor: '#EEF0F3' },
  footer: { textAlign: 'center', color: '#9CA3AF', marginTop: 6 },
});
