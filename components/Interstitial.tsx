import React, { useEffect, useRef } from "react";
import { Button, Platform } from "react-native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

// ⚙️ Use test id in dev, real id in release
const interstitialUnitId =
  __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({
        android: "ca-app-pub-2070544535045714/6279110769", // 👈 Your real interstitial id
        ios: "YOUR_IOS_INTERSTITIAL_ID",
      })!;

export default function InterstitialButton() {
  const adRef = useRef<InterstitialAd | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    adRef.current = InterstitialAd.createForAdRequest(interstitialUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    const unsubLoaded = adRef.current.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("✅ Interstitial loaded");
        loaded.current = true;
      }
    );

    const unsubClosed = adRef.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log("🔁 Reload after close");
        loaded.current = false;
        adRef.current?.load();
      }
    );

    adRef.current.load();

    return () => {
      unsubLoaded();
      unsubClosed();
    };
  }, []);

  const showAd = () => {
    if (loaded.current) {
      adRef.current?.show();
    } else {
      console.log("⚠️ Ad not ready yet, reloading...");
      adRef.current?.load();
    }
  };

  return <Button title="Show Interstitial Ad" onPress={showAd} />;
}
