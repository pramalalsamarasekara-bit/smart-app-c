// app.config.js

module.exports = ({ config }) => {
  return {
    ...config,
    name: "smartshopping-clean",
    slug: "smartshopping-clean",
    version: "1.0.0",
    android: {
      package: "com.smartshopping.app"
    },
    // වෙනත් සියලුම plugins සහ extra fields ඉවත් කරන්න
  };
};