// app/(tabs)/market/checkout.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';

const RETURN_URL = 'smartshopping://payhere-result';

// Sandbox preview link (Homepage නෙවෙයි!)
const PAYMENT_LINK_BASE = 'https://sandbox.payhere.lk/pay/merchant-test';

type Plan = { id: 'P8' | 'P12' | 'P99'; title: string; amount: number; currency: 'USD' | 'LKR' };

const PLANS: Plan[] = [
  { id: 'P8',  title: 'Starter — $8',  amount: 8.00,  currency: 'USD' },
  { id: 'P12', title: 'Pro — $12',     amount: 12.00, currency: 'USD' },
  { id: 'P99', title: 'Business — $99', amount: 99.00, currency: 'USD' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Plan>(PLANS[0]);
  const [showWV, setShowWV] = useState(false);
  const [payUrl, setPayUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const order = useMemo(() => ({
    order_id: 'ORD-' + Math.floor(Math.random() * 1e6),
    amount: selected.amount,
    currency: selected.currency,
    title: selected.title
  }), [selected]);

  const buildUrl = () => {
    // If your real PayHere Payment Link supports query params, these will be read by PayHere
    const u =
      `${PAYMENT_LINK_BASE}` +
      `?order_id=${encodeURIComponent(order.order_id)}` +
      `&amount=${order.amount.toFixed(2)}` +
      `&currency=${order.currency}` +
      `&return_url=${encodeURIComponent(RETURN_URL)}`;
    return u;
  };

  const onPay = async () => {
    try {
      setSubmitting(true);
      const u = buildUrl();
      setPayUrl(u);
      setShowWV(true); // open inside app (no external browser)
    } catch (e: any) {
      console.error(e);
      Alert.alert('Payment Error', e?.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  // Deep-link fallback (some Android cases)
  React.useEffect(() => {
    const sub = Linking.addEventListener('url', (ev) => {
      if (ev.url?.startsWith(RETURN_URL)) {
        setShowWV(false);
        router.push({
          pathname: '/(tabs)/market/payment-result',
          params: { fullUrl: ev.url, orderId: order.order_id },
        });
      }
    });
    return () => sub.remove();
  }, [router, order.order_id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.subtitle}>Order ID: {order.order_id}</Text>

      {/* Plan selector */}
      <View style={styles.planRow}>
        {PLANS.map(p => {
          const active = p.id === selected.id;
          return (
            <TouchableOpacity
              key={p.id}
              onPress={() => setSelected(p)}
              style={[styles.planBtn, active && styles.planBtnActive]}
              activeOpacity={0.9}
            >
              <Text style={[styles.planTxt, active && styles.planTxtActive]}>
                {p.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.amount}>
        Total: {order.amount.toFixed(2)} {order.currency}
      </Text>

      {/* PayHere banner (tap to pay) */}
      <TouchableOpacity onPress={onPay} activeOpacity={0.9}>
        <Image
          source={{ uri: 'https://www.payhere.lk/downloads/images/payhere_long_banner.png' }}
          style={styles.banner}
        />
      </TouchableOpacity>

      {/* Main Pay button with ORIGINAL logo on the left */}
      <TouchableOpacity
        style={[styles.payBtn, submitting && { opacity: 0.6 }]}
        disabled={submitting}
        onPress={onPay}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: 'https://www.payhere.lk/downloads/images/payhere_square_banner.png' }}
          style={styles.logoSquare}
        />
        <Text style={styles.payText}>{submitting ? 'Processing…' : 'Pay with PayHere'}</Text>
      </TouchableOpacity>

      {/* In-app WebView (Sandbox page) */}
      {showWV && payUrl && (
        <View style={styles.wvWrap}>
          <WebView
            originWhitelist={['*']}
            source={{ uri: payUrl }}
            startInLoadingState
            onShouldStartLoadWithRequest={(req) => {
              if (req.url.startsWith(RETURN_URL)) {
                setShowWV(false);
                router.push({
                  pathname: '/(tabs)/market/payment-result',
                  params: { fullUrl: req.url, orderId: order.order_id },
                });
                return false;
              }
              return true;
            }}
          />
          <TouchableOpacity style={styles.closeBar} onPress={() => setShowWV(false)}>
            <Text style={styles.closeTxt}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, opacity: 0.7, marginBottom: 10 },

  planRow: { flexDirection: 'row', gap: 10, marginBottom: 14, flexWrap: 'wrap', justifyContent: 'center' },
  planBtn: {
    paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12,
    borderWidth: 1, borderColor: '#cfd8dc', backgroundColor: '#fff'
  },
  planBtnActive: { borderColor: '#1E88E5', backgroundColor: '#E3F2FD' },
  planTxt: { fontWeight: '700', color: '#37474f' },
  planTxtActive: { color: '#1E88E5' },

  amount: { fontSize: 18, fontWeight: '800', marginBottom: 18 },

  banner: { width: 320, height: 45, resizeMode: 'contain', marginBottom: 16 },

  payBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#1E88E5', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12
  },
  logoSquare: { width: 24, height: 24, borderRadius: 4, resizeMode: 'contain' },
  payText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  wvWrap: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff'
  },
  closeBar: {
    position: 'absolute', top: 40, right: 16,
    backgroundColor: '#000000aa', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8
  },
  closeTxt: { color: '#fff', fontWeight: '700' },
});