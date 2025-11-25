import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Camera-Related Imports are Disabled
// import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

export default function BarcodeScannerScreen() {
  // Camera-Related Hooks and States are Disabled
  // const [permission, requestPermission] = useCameraPermissions();
  // const [scanned, setScanned] = useState(false);
  // const [data, setData] = useState<string | null>(null);
  // const cameraRef = useRef<CameraView>(null);
  
  const router = useRouter();

  // Handle Permission Check (Disabled)
  // if (!permission) {
  //   return <View style={styles.center}><Text style={styles.sub}>Loading camera permission…</Text></Text>;
  // }
  // if (!permission.granted) {
  //   return (
  //     <View style={styles.center}>
  //       <Text style={styles.title}>Allow camera to scan barcodes</Text>
  //       <TouchableOpacity style={styles.btn} onPress={requestPermission}>
  //         <Text style={styles.btnTxt}>Grant Permission</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  // const handleScan = (res: BarcodeScanningResult) => {
  //   if (scanned) return;
  //   setScanned(true);
  //   setData(res.data);
  // };

  const handleCopy = () => {
    // Alert.alert("Disabled", "Camera functionality is disabled.");
  };

  return (
    <View style={styles.container}>
      {/* CameraView Component Disabled */}
      {/* <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        // ... other props ...
        onBarcodeScanned={handleScan}
      /> */}

      <View style={styles.center}>
        <Text style={styles.title}>Barcode Scanner Disabled</Text>
        <Text style={styles.sub}>Camera functionality is temporarily disabled to complete the build.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnTxt}>Back</Text>
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
  title: { fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 12, color: "#fff" },
  sub: { fontSize: 16, opacity: 0.7, color: "#fff", marginBottom: 20 },
  btn: { backgroundColor: "#2563EB", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  btnTxt: { color: "#fff", fontWeight: "700" },
  // Unused styles from original file can be removed or kept, but I'll keep them for simplicity.
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