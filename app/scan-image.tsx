import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "../contexts/LanguageContext"; // ⬅️ hook

export default function ScanImageScreen() {
  const { t } = useLanguage(); // ⬅️ translations
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") Alert.alert(t("permission"), t("cameraPermissionRequired"));
      const g = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (g.status !== "granted") {}
    })();
  }, [t]);

  const openCamera = async () => {
    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  const openGallery = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (!res.canceled) setUri(res.assets[0].uri);
  };

  const fakeSearch = () => {
    if (!uri) return;
    Alert.alert(t("imageSearch"), t("sampleResult"));
  };

  return (
    <View style={st.container}>
      <Text style={st.title}>{t("smartImageScanner")}</Text>

      <View style={st.preview}>
        {uri ? (
          <Image source={{ uri }} style={st.img} resizeMode="cover" />
        ) : (
          <Text style={{ color: "#6b7280" }}>{t("noImageSelected")}</Text>
        )}
      </View>

      <View style={st.row}>
        <Btn icon="camera" label={t("takePhoto")} onPress={openCamera} />
        <Btn icon="image-multiple" label={t("chooseFromGallery")} onPress={openGallery} />
      </View>

      <TouchableOpacity style={st.search} onPress={fakeSearch} disabled={!uri}>
        <MaterialCommunityIcons name="magnify" size={20} />
        <Text style={{ fontWeight: "700" }}>{t("findSimilarItems")}</Text>
      </TouchableOpacity>

      <View style={st.tips}>
        <Text style={st.tipTitle}>{t("tips")}</Text>
        <Text>• {t("tipClearFront")}</Text>
        <Text>• {t("tipGoodLight")}</Text>
        <Text>• {t("tipAvoidBusyBg")}</Text>
      </View>
    </View>
  );
}

function Btn({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={st.btn} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={18} />
      <Text style={{ fontWeight: "700" }}>{label}</Text>
    </TouchableOpacity>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: "700", alignSelf: "center" },
  preview: {
    height: 220, borderRadius: 14, borderWidth: 1, borderColor: "#e5e7eb",
    alignItems: "center", justifyContent: "center", backgroundColor: "#fafafa"
  },
  img: { width: "100%", height: "100%", borderRadius: 14 },
  row: { flexDirection: "row", gap: 12 },
  btn: {
    flex: 1, padding: 14, borderRadius: 10, backgroundColor: "#eef2ff",
    alignItems: "center", flexDirection: "row", gap: 8, justifyContent: "center"
  },
  search: {
    alignSelf: "center", flexDirection: "row", gap: 8, paddingHorizontal: 18, paddingVertical: 12,
    borderRadius: 10, backgroundColor: "#f3f4f6"
  },
  tips: { marginTop: 8, gap: 4, backgroundColor: "#f9fafb", padding: 12, borderRadius: 10 },
  tipTitle: { fontWeight: "700", marginBottom: 4 }
});
