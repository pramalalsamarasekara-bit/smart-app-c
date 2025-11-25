import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

const C = {
  bg: '#F5F5F5',
  card: '#FFFFFF',
  text: '#111827',
  sub: '#6B7280',
  border: '#E5E7EB',
  primary: '#1E88E5',
  shadow: '#000000',
};

const SUPPORT_EMAIL = 'support@smartshopping.app';
const SUPPORT_PHONE = '+11234567890';     // intl format
const WHATSAPP     = '+11234567890';     // same number for wa.me

type FAQ = { q: string; a: string };

const FAQS: FAQ[] = [
  {
    q: 'How do I change the app language?',
    a: 'Open Settings → Language and choose your preferred language. Arabic will switch the layout to RTL automatically.',
  },
  {
    q: 'Why can’t the camera scan my barcode?',
    a: 'Make sure there is enough light and the camera permission is granted in system settings. Hold the device 15–25cm away.',
  },
  {
    q: 'How do I contact support?',
    a: 'Use the Email / WhatsApp / Call buttons below. We usually respond within 24 hours.',
  },
];

export default function SupportScreen() {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(0);

  const back = () => (router.canGoBack() ? router.back() : router.replace('/(tabs)'));

  const openMail = async () => {
    const url = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Smart Shopping - Support')}`;
    const ok = await Linking.canOpenURL(url);
    if (!ok) return Alert.alert('Email not available', `Please email us at ${SUPPORT_EMAIL}`);
    Linking.openURL(url);
  };

  const openWhatsApp = async () => {
    const url = `https://wa.me/${WHATSAPP.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hello, I need help with the app')}`;
    const ok = await Linking.canOpenURL(url);
    if (!ok) return Alert.alert('WhatsApp not available', 'Please try Email or Call.');
    Linking.openURL(url);
  };

  const openCall = async () => {
    const url = `tel:${SUPPORT_PHONE}`;
    const ok = await Linking.canOpenURL(url);
    if (!ok) return Alert.alert('Call not available', `You can reach us at ${SUPPORT_PHONE}`);
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={back} style={s.hBtn}>
          <ArrowLeft size={22} color={C.text} />
        </TouchableOpacity>
        <Text style={s.hTitle}>Help &amp; Support</Text>
        <View style={s.hBtn} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.hero}>
          <HelpCircle size={36} color={C.primary} />
          <Text style={s.heroTitle}>How can we help?</Text>
          <Text style={s.heroSub}>
            Find quick answers, or contact our team via Email, WhatsApp, or a phone call.
          </Text>
        </View>

        {/* Quick actions */}
        <View style={s.row}>
          <TouchableOpacity style={[s.action, { backgroundColor: '#E8F1FD' }]} onPress={openMail} activeOpacity={0.8}>
            <Mail size={20} color={C.primary} />
            <Text style={s.actionTxt}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.action, { backgroundColor: '#E8F9F1' }]} onPress={openWhatsApp} activeOpacity={0.8}>
            <MessageCircle size={20} color="#10B981" />
            <Text style={s.actionTxt}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.action, { backgroundColor: '#FFF1F2' }]} onPress={openCall} activeOpacity={0.8}>
            <Phone size={20} color="#EF4444" />
            <Text style={s.actionTxt}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <Text style={s.sectionTitle}>Frequently Asked Questions</Text>
        <View style={s.card}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <View key={i}>
                <TouchableOpacity
                  style={s.faqRow}
                  onPress={() => setOpen(isOpen ? null : i)}
                  activeOpacity={0.7}
                >
                  <Text style={s.faqQ}>{item.q}</Text>
                  {isOpen ? <ChevronUp size={18} color={C.sub} /> : <ChevronDown size={18} color={C.sub} />}
                </TouchableOpacity>
                {isOpen && <Text style={s.faqA}>{item.a}</Text>}
                {i < FAQS.length - 1 && <View style={s.divider} />}
              </View>
            );
          })}
        </View>

        {/* Footer note */}
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={s.note}>
            Support hours: Mon–Fri, 9am–6pm (GMT)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  hBtn: { width: 48, padding: 8, alignItems: 'center' },
  hTitle: { fontSize: 18, fontWeight: '800', color: C.text },

  hero: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: C.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    marginBottom: 12,
  },
  heroTitle: { fontSize: 18, fontWeight: '800', color: C.text, marginTop: 6 },
  heroSub: { color: C.sub, textAlign: 'center', marginTop: 4 },

  row: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  action: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTxt: { marginTop: 6, fontWeight: '700', color: C.text },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.text, marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: C.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  faqRow: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQ: { fontSize: 15, fontWeight: '700', color: C.text, flex: 1, paddingRight: 10 },
  faqA: { color: C.sub, lineHeight: 20, paddingHorizontal: 4, paddingBottom: 12 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: C.border },
  note: { fontSize: 12, color: C.sub },
});
