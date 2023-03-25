const path = require("path");

module.exports = function getCWDPackageVersion() {
  const p = path.join(process.cwd(), "package.json");
  const obj = require(p);

  if (obj && obj.version) {
    return obj.version;
  }

  return null;
};
