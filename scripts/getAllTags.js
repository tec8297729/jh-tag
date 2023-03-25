const execa = require("execa");

module.exports = async function getAllTags(version) {
  await execa("git fetch");
  const oo = await execa(`git tag -l ${version}.*`);
  return oo.stdout;
};
