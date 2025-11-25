// app/(tabs)/profile.tsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, TouchableOpacity,
  Alert, Platform, Image, ActionSheetIOS, Modal, TextInput,
  KeyboardAvoidingView, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User as UserIcon, Settings, Heart, History, LogIn, LogOut, Camera } from 'lucide-react-native';

const C = {
  bg: '#F6F7FB',
  card: '#FFFFFF',
  text: '#0F172A',
  sub: '#64748B',
  border: '#E2E8F0',
  primary: '#2563EB',
  error: '#EF4444',
};

const STORE_KEYS = {
  name: '@user_name',
  email: '@user_email',
  photo: '@user_photo',
  signed: '@user_signed',
};

export default function ProfileScreen() {
  const router = useRouter();
  const [signed, setSigned] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [showSignIn, setShowSignIn] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');

  useEffect(() => {
    (async () => {
      // permissions
      await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      // load saved user
      const [s, n, e, p] = await Promise.all([
        AsyncStorage.getItem(STORE_KEYS.signed),
        AsyncStorage.getItem(STORE_KEYS.name),
        AsyncStorage.getItem(STORE_KEYS.email),
        AsyncStorage.getItem(STORE_KEYS.photo),
      ]);
      setSigned(s === '1');
      if (n) setName(n);
      if (e) setEmail(e);
      if (p) setPhoto(p);
    })();
  }, []);

  const openPhotoSheet = () => {
    const take = async () => {
      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (!res.canceled) {
        const uri = res.assets[0].uri;
        setPhoto(uri);
        await AsyncStorage.setItem(STORE_KEYS.photo, uri);
      }
    };

    const pick = async () => {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (!res.canceled) {
        const uri = res.assets[0].uri;
        setPhoto(uri);
        await AsyncStorage.setItem(STORE_KEYS.photo, uri);
      }
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Take Photo', 'Choose from Gallery', 'Cancel'], cancelButtonIndex: 2 },
        (i) => { if (i === 0) take(); if (i === 1) pick(); }
      );
    } else {
      Alert.alert('Select Profile Photo', 'Choose how to add your photo', [
        { text: 'Take Photo', onPress: take },
        { text: 'Choose from Gallery', onPress: pick },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  const handleSignInPress = () => {
    setFormName('');
    setFormEmail('');
    setShowSignIn(true);
  };

  const saveSignIn = async () => {
    const n = formName.trim();
    const e = formEmail.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!n || !e) {
      Alert.alert('Missing info', 'Please enter your name and email.');
      return;
    }
    if (!emailOk) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    await AsyncStorage.multiSet([
      [STORE_KEYS.name, n],
      [STORE_KEYS.email, e],
      [STORE_KEYS.signed, '1'],
    ]);
    setName(n);
    setEmail(e);
    setSigned(true);
    setShowSignIn(false);
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out', style: 'destructive', onPress: async () => {
          await AsyncStorage.multiRemove([
            STORE_KEYS.name, STORE_KEYS.email, STORE_KEYS.photo, STORE_KEYS.signed,
          ]);
          setSigned(false);
          setName('');
          setEmail('');
          setPhoto(null);
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>Profile</Text>

      <View style={s.card}>
        <TouchableOpacity style={s.avatar} onPress={openPhotoSheet} activeOpacity={0.85}>
          {photo ? <Image source={{ uri: photo }} style={s.avatarImg} /> : <UserIcon size={56} color="#fff" />}
          <View style={s.camBadge}><Camera size={14} color="#fff" /></View>
        </TouchableOpacity>

        {signed ? (
          <>
            <Text style={s.name}>{name || 'User'}</Text>
            <Text style={s.sub}>{email}</Text>
            <TouchableOpacity style={[s.primaryBtn, { backgroundColor: C.error }]} onPress={handleSignOut} activeOpacity={0.85}>
              <LogOut size={18} color="#fff" />
              <Text style={s.primaryTxt}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={s.name}>Guest User</Text>
            <Text style={s.sub}>Sign in to access all features</Text>
            <TouchableOpacity style={s.primaryBtn} onPress={handleSignInPress} activeOpacity={0.85}>
              <LogIn size={18} color="#fff" />
              <Text style={s.primaryTxt}>Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={s.list}>
        <Item icon={<Settings size={20} color={C.primary} />} title="Settings" onPress={() => router.push('/settings')} />
        <Divider />
        <Item icon={<Heart size={20} color={C.primary} />} title="Favorites" onPress={() => router.push('/favorites')} />
        <Divider />
        <Item icon={<History size={20} color={C.primary} />} title="Search History" onPress={() => router.push('/search-history')} />
      </View>

      {/* Sign In Modal */}
      <Modal animationType="slide" visible={showSignIn} onRequestClose={() => setShowSignIn(false)} transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.modalWrap}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Sign In</Text>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={s.label}>Name</Text>
              <TextInput
                placeholder="Your name"
                value={formName}
                onChangeText={setFormName}
                style={s.input}
                autoCapitalize="words"
              />
              <Text style={s.label}>Email</Text>
              <TextInput
                placeholder="you@example.com"
                value={formEmail}
                onChangeText={setFormEmail}
                style={s.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={s.row}>
                <TouchableOpacity style={[s.btnOutline, { flex: 1, marginRight: 8 }]} onPress={() => setShowSignIn(false)}>
                  <Text style={s.btnOutlineTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.btnFill, { flex: 1, marginLeft: 8 }]} onPress={saveSignIn}>
                  <Text style={s.btnFillTxt}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

function Item({
  icon, title, onPress, danger,
}: { icon: React.ReactNode; title: string; onPress: () => void; danger?: boolean; }) {
  return (
    <TouchableOpacity style={s.item} onPress={onPress} activeOpacity={0.75}>
      <View style={s.icon}>{icon}</View>
      <Text style={[s.itemTxt, danger && { color: C.error }]}>{title}</Text>
      <Text style={s.chev}>›</Text>
    </TouchableOpacity>
  );
}
function Divider() { return <View style={s.divider} />; }

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: C.text, marginBottom: 12 },
  card: {
    backgroundColor: C.card, borderRadius: 16, alignItems: 'center', padding: 16,
    marginBottom: 14, ...Platform.select({ android: { elevation: 2 } }),
  },
  avatar: {
    width: 110, height: 110, borderRadius: 55, backgroundColor: C.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10, overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%' },
  camBadge: {
    position: 'absolute', bottom: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12, paddingHorizontal: 6, paddingVertical: 4, borderWidth: 1, borderColor: '#fff',
  },
  name: { fontSize: 18, fontWeight: '800', color: C.text },
  sub: { color: C.sub, marginTop: 2, textAlign: 'center' },
  primaryBtn: {
    marginTop: 12, backgroundColor: C.primary, flexDirection: 'row', gap: 8,
    alignItems: 'center', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10,
  },
  primaryTxt: { color: '#fff', fontWeight: '800' },

  list: { backgroundColor: C.card, borderRadius: 14, paddingHorizontal: 8, paddingVertical: 4 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 8 },
  icon: { width: 28, alignItems: 'center' },
  itemTxt: { flex: 1, color: C.text, fontSize: 15, fontWeight: '700' },
  chev: { color: C.sub, fontSize: 18, marginLeft: 6 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: C.border },

  // modal
  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '70%' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: C.text, marginBottom: 10 },
  label: { color: C.sub, marginTop: 6, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12,
    color: C.text, backgroundColor: '#fff',
  },
  row: { flexDirection: 'row', marginTop: 14 },
  btnOutline: { borderWidth: 1, borderColor: C.border, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  btnOutlineTxt: { color: C.text, fontWeight: '700' },
  btnFill: { backgroundColor: C.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  btnFillTxt: { color: '#fff', fontWeight: '800' },
});
