const { runCommand } = require("./util");

module.exports = async function getAllTags(version) {
  await runCommand("git fetch");
  const oo = await runCommand(
    `git tag -l "${version}.*" --sort=-creatordate | head -n 10`
  );
  return (oo.stdout && oo.stdout.toString()) || "";
};
