// app/(tabs)/assistant.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { useLanguage } from '../../contexts/LanguageContext'; 

import { useCartStore } from '../../lib/cartStore'; // ⬅️ cart store

type Msg = { id: string; from: 'user' | 'bot'; text: string };

// Localized strings
const L = {
  en: {
    title: 'AI Assistant',
    placeholder: 'Type your question...',
    send: 'Send',
    addToCart: 'Add to Cart',
    added: (t: string) => `"${t}" added to cart.`,
    hello: 'Hello! Ask me about products, deals, or shopping tips.',
    echo: (q: string) => `You said: "${q}". (AI reply placeholder)`,
  },
  si: {
    title: 'AI ආධාරක',
    placeholder: 'ඔබගේ ප්‍රශ්නය ටයිප් කරන්න...',
    send: 'යවන්න',
    addToCart: 'Cart එකට දාන්න',
    added: (t: string) => `"${t}" cart එකට දාලා.`,
    hello: 'හෙලෝ! භාණ්ඩ, ඩිල්ස්, හෝ සාප්පු ඉඟි ගැන අහන්න.',
    echo: (q: string) => `ඔයා කිව්වේ: "${q}". (AI පිළිතුර placeholder)`,
  },
  ar: {
    title: 'المساعد الذكي',
    placeholder: 'اكتب سؤالك...',
    send: 'إرسال',
    addToCart: 'أضِف إلى السلة',
    added: (t: string) => `تمت إضافة "${t}" إلى السلة.`,
    hello: 'مرحبًا! اسألني عن المنتجات أو العروض أو نصائح التسوّق.',
    echo: (q: string) => `قلت: "${q}". (ردّ افتراضي)`,
  },
  ta: {
    title: 'AI உதவியாளர்',
    placeholder: 'உங்கள் கேள்வியை தட்டச்சு செய்க...',
    send: 'அனுப்பு',
    addToCart: 'வண்டியில் சேர்',
    added: (t: string) => `"${t}" வண்டியில் சேர்க்கப்பட்டது.`,
    hello: 'வணக்கம்! பொருட்கள், சலுகைகள், ஷாப்பிங் குறிப்புகள் குறித்து கேளுங்கள்.',
    echo: (q: string) => `நீங்கள் சொன்னது: "${q}". (AI பதில் placeholder)`,
  },
  hi: {
    title: 'एआई सहायक',
    placeholder: 'अपना प्रश्न लिखें...',
    send: 'भेजें',
    addToCart: 'कार्ट में जोड़ें',
    added: (t: string) => `"${t}" कार्ट में जोड़ दिया गया।`,
    hello: 'नमस्ते! उत्पाद, डील्स या शॉपिंग टिप्स पूछें।',
    echo: (q: string) => `आपने कहा: "${q}". (AI उत्तर placeholder)`,
  },
  ur: {
    title: 'اسسٹنٹ',
    placeholder: 'اپنا سوال لکھیں...',
    send: 'بھیجیں',
    addToCart: 'کارٹ میں شامل کریں',
    added: (t: string) => `"${t}" کارٹ میں شامل ہوگیا۔`,
    hello: 'ہیلو! مصنوعات، ڈیلز یا شاپنگ ٹپس پوچھیں۔',
    echo: (q: string) => `آپ نے کہا: "${q}"۔ (AI جواب placeholder)`,
  },
} as const;

export default function AssistantScreen() {
  const { lang, isRTL } = useLanguage();
  const T = L[lang] || L.en;

  const addItem = useCartStore((s) => s.addItem); // ⬅️ from cart store

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    { id: '1', from: 'bot', text: T.hello },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    const userMsg: Msg = { id: Date.now().toString(), from: 'user', text };
    const botMsg: Msg = { id: (Date.now() + 1).toString(), from: 'bot', text: T.echo(text) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput('');
  };

  const addCurrentToCart = () => {
    const title = input.trim();
    if (!title) return;
    addItem({ id: 'AI-' + Date.now(), title }); // price optional
    Alert.alert(T.addToCart, T.added(title));
    // keep text (sometimes user wants to send after adding), so we don't clear input here.
  };

  const disabled = !input.trim();

  return (
    <View style={s.container}>
      <Text style={[s.title, isRTL && { textAlign: 'right' }]}>{T.title}</Text>

      <FlatList
        style={s.list}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              s.bubble,
              item.from === 'user' ? s.user : s.bot,
              isRTL && { alignSelf: item.from === 'user' ? 'flex-start' : 'flex-end' },
            ]}
          >
            <Text style={item.from === 'user' ? s.userText : s.botText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input + Send + Add to Cart */}
      <View style={[s.inputRow, isRTL && { flexDirection: 'row-reverse' }]}>
        <TextInput
          style={[s.input, isRTL && { textAlign: 'right' }]}
          placeholder={T.placeholder}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity style={[s.btn, s.sendBtn, disabled && s.btnDisabled]} onPress={send} disabled={disabled}>
          <Text style={s.btnTxt}>{T.send}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.cartBtn, disabled && s.btnDisabled]} onPress={addCurrentToCart} disabled={disabled}>
          <Text style={s.btnTxt}>{T.addToCart}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },

 title: { fontSize: 22, fontWeight: '800', marginBottom: 8, textAlign: 'center' },

  list: { flex: 1 },
  bubble: { maxWidth: '80%', padding: 10, borderRadius: 12, marginVertical: 6 },
  user: { alignSelf: 'flex-end', backgroundColor: '#DCFCE7' },
  bot: { alignSelf: 'flex-start', backgroundColor: '#E5E7EB' },
  userText: { color: '#065F46' },
  botText: { color: '#111827' },

  inputRow: { flexDirection: 'row', gap: 8, paddingTop: 8 },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },

  btn: {
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  btnTxt: { color: 'white', fontWeight: '700' },
  sendBtn: { backgroundColor: '#3B82F6' },
  cartBtn: { backgroundColor: '#16A34A' },
  btnDisabled: { opacity: 0.5 },
});
