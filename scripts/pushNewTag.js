const execa = require("execa");

module.exports = async function pushNewTag({ tag, comment }) {
  const result = await execa(
    `git tag -a ${tag} -m '${comment ? comment : tag}'`
  );

  if (result.failed) {
    return Promise.reject(new Error("push tag failed ...  try again"));
  }

  return execa(`git push origin ${tag}`);
};
