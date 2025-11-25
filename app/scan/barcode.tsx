import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

export default function BarcodeScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  if (!permission) {
    return <View style={styles.center}><Text style={styles.sub}>Loading camera permission…</Text></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Allow camera to scan barcodes</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnTxt}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = (res: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    setData(res.data);
  };

  const handleCopy = () => {
    if (data) {
      Clipboard.setStringAsync(data);
      Alert.alert("Copied!", "Scanned code copied to clipboard.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: [
            "ean13","ean8","upc_a","upc_e",
            "code39","code93","code128",
            "itf14","interleaved2of5","codabar","pdf417"
          ],
        }}
        onBarcodeScanned={handleScan}
      />

      <View style={styles.overlayTop} />
      <View style={styles.row}>
        <View style={styles.side} />
        <View style={styles.frame} />
        <View style={styles.side} />
      </View>
      <View style={styles.overlayBottom}>
        <Text style={styles.hint}>Align the barcode inside the frame</Text>

        {data && (
          <>
            <Text style={styles.result}>{data}</Text>
            <TouchableOpacity style={[styles.btn, { marginTop: 10 }]} onPress={handleCopy}>
              <Text style={styles.btnTxt}>Copy</Text>
            </TouchableOpacity>
          </>
        )}

        {scanned && (
          <TouchableOpacity style={[styles.btn, { marginTop: 14 }]} onPress={() => { setScanned(false); setData(null); }}>
            <Text style={styles.btnTxt}>Scan Again</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.btnGhost} onPress={() => router.back()}>
          <Text style={styles.btnGhostTxt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const overlayColor = "rgba(0,0,0,0.5)";
const frameSize = 260;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  sub: { fontSize: 16, opacity: 0.7 },
  btn: { backgroundColor: "#2563EB", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  btnTxt: { color: "#fff", fontWeight: "700" },
  btnGhost: { marginTop: 10, paddingVertical: 10, paddingHorizontal: 14 },
  btnGhostTxt: { color: "#fff", opacity: 0.8 },
  overlayTop: { backgroundColor: overlayColor, height: (1000 - frameSize) / 3, width: "100%" },
  row: { flexDirection: "row", alignItems: "center" },
  side: { backgroundColor: overlayColor, flex: 1, height: frameSize },
  frame: { width: frameSize, height: frameSize, borderWidth: 3, borderColor: "#22D3EE", borderRadius: 16 },
  overlayBottom: { flex: 1, backgroundColor: overlayColor, alignItems: "center", paddingTop: 16 },
  hint: { color: "#fff", fontWeight: "600" },
  result: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 14, marginBottom: 2 },
});
