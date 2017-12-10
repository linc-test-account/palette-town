const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

module.exports = () => {
  return new StaticSiteGeneratorPlugin({
    paths: ["/"],
    entry: "render",
    globals: {
      window: {},
      __NODE_RENDER: true
    }
  });
};
