const { runCommand } = require("./util");

module.exports = async function getAllTags(version) {
  await runCommand("git fetch");
  const oo = await runCommand(`git tag -l ${version}.*`);
  return oo.stdout?.toString() || "";
};
