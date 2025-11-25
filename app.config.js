// app.config.js

module.exports = ({ config }) => {
  return {
    ...config,
    // Android Configuration
    android: {
      package: "com.smartshopping.app"
    },
    // AdMob Plugin Configuration
    plugins: [
      [
        "expo-ads-google-mobile-ads",
        {
          "android": {
            "applicationId": "ca-app-pub-2078544657145672986187"
          }
        }
      ]
    ],
    // Extra Fields
    extra: {
      eas: {
        projectId: "ed9407ec-71fb-4969-98ec-3255b870b945"
      }
    }
  };
};