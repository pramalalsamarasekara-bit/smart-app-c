// app.config.js

module.exports = ({ config }) => {
  return {
    ...config,
    // ... අනෙකුත් configuration
    extra: {
      eas: {
        // projectId: "ed9407ec-71fb-4969-98ec-3253b870b945"  <-- මෙය Delete කරන්න
      }
    }
  };
};