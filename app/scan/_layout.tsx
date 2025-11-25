import { Stack } from "expo-router";

export default function ScanLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pick a scan type" }} />
      <Stack.Screen name="barcode" options={{ title: "Scan Barcode" }} />
      <Stack.Screen name="qr" options={{ title: "Scan QR Code" }} />
    </Stack>
  );
}
