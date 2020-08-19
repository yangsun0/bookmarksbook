const {
  override,
  disableEsLint,
  addDecoratorsLegacy,
} = require("customize-cra");
module.exports = {
  webpack: override(disableEsLint(), addDecoratorsLegacy()),
};
