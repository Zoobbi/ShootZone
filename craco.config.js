const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
      "@app/components": path.resolve(__dirname, "src/components"),
      "@app/common/grid": path.resolve(__dirname, "src/common/grid"),
      "@app/common/*": path.resolve(__dirname, "src/common/"),
      "@common/types": path.resolve(__dirname, "src/common/types"),
      "@app/tokens": path.resolve(__dirname, "src/common/tokens"),
      "@app/utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
