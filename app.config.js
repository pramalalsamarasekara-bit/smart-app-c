// app.config.js

module.exports = ({ config }) => {
  return {
    ...config,
    // Android Configuration
    android: {
      package: "com.smartshopping.app"
    },
    // Plugins array එක සම්පූර්ණයෙන් ඉවත් කර ඇත
    extra: {
      eas: {
        projectId: "ed9407ec-71fb-4969-98ec-3253b870b945"
      }
    }
  };
};