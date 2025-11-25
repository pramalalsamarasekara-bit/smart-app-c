import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "../../contexts/LanguageContext";

const L = {
  en: {
    pick: "Pick a scan type",
    scanBarcode: "Scan Barcode",
    scanQR: "Scan QR Code",
    tipBarcode: "Use camera to read product barcodes",
    tipQR: "Use camera to read QR codes only",
  },
  si: {
    pick: "ස්කෑන් වර්ගයක් තෝරන්න",
    scanBarcode: "බාර්කෝඩ් ස්කෑන්",
    scanQR: "QR කේත ස්කෑන්",
    tipBarcode: "භාණ්ඩ බාර්කෝඩ් කැමරා මගින් කියවන්න",
    tipQR: "QR කේත පමණක් කැමරා මගින් කියවන්න",
  },
  ar: {
    pick: "اختر نوع المسح",
    scanBarcode: "مسح الباركود",
    scanQR: "مسح رمز QR",
    tipBarcode: "استخدم الكاميرا لقراءة الباركود",
    tipQR: "استخدم الكاميرا لقراءة رموز QR فقط",
  },
  ta: {
    pick: "ஸ்கேன் வகையைத் தேர்வு செய்க",
    scanBarcode: "பார்கோட் ஸ்கேன்",
    scanQR: "QR குறியீடு ஸ்கேன்",
    tipBarcode: "பொருள் பார்கோட்களை கேமரா மூலம் படியுங்கள்",
    tipQR: "QR குறியீடுகளை மட்டும் கேமராவால் படியுங்கள்",
  },
  hi: {
    pick: "स्कैन प्रकार चुनें",
    scanBarcode: "बारकोड स्कैन",
    scanQR: "QR कोड स्कैन",
    tipBarcode: "कैमरे से उत्पाद बारकोड पढ़ें",
    tipQR: "केवल QR कोड कैमरे से पढ़ें",
  },
  ur: {
    pick: "سکین کی قسم منتخب کریں",
    scanBarcode: "بارکوڈ اسکین",
    scanQR: "کیو آر کوڈ اسکین",
    tipBarcode: "کیمرے سے پراڈکٹ بارکوڈ پڑھیں",
    tipQR: "صرف کیو آر کوڈ کیمرے سے پڑھیں",
  },
} as const;

export default function ScanTab() {
  const { lang, isRTL } = useLanguage();
  const S = L[lang] || L.en;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800",
          textAlign: "center",
          marginVertical: 16,
        }}
      >
        {S.pick}
      </Text>

      <Pressable
        onPress={() => router.push("/scan/barcode")}
        style={{
          backgroundColor: "#f4f5f7",
          borderRadius: 16,
          padding: 16,
          marginBottom: 14,
          flexDirection: isRTL ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ maxWidth: "85%" }}>
          <Text style={{ fontSize: 18, fontWeight: "700", textAlign: isRTL ? "right" : "left" }}>{S.scanBarcode}</Text>
          <Text style={{ color: "#6b7280", marginTop: 4, textAlign: isRTL ? "right" : "left" }}>
            {S.tipBarcode}
          </Text>
        </View>
        <MaterialCommunityIcons name="barcode-scan" size={28} />
      </Pressable>

      <Pressable
        onPress={() => router.push("/scan/qr")}
        style={{
          backgroundColor: "#f4f5f7",
          borderRadius: 16,
          padding: 16,
          flexDirection: isRTL ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ maxWidth: "85%" }}>
          <Text style={{ fontSize: 18, fontWeight: "700", textAlign: isRTL ? "right" : "left" }}>{S.scanQR}</Text>
          <Text style={{ color: "#6b7280", marginTop: 4, textAlign: isRTL ? "right" : "left" }}>
            {S.tipQR}
          </Text>
        </View>
        <MaterialCommunityIcons name="qrcode-scan" size={28} />
      </Pressable>
    </View>
  );
}