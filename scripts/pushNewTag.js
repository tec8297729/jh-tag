const { runCommand } = require("./util");

module.exports = async function pushNewTag({ tag, comment }) {
  const result = await runCommand(
    `git tag -a ${tag} -m '${comment ? comment : tag}'`
  );

  if (result && result.failed) {
    return Promise.reject(new Error("push tag failed ...  try again"));
  }

  return runCommand(`git push origin ${tag}`);
};
