const fs = require("fs");
const path = require("path");
const execa = require("execa");
const { runCommand } = require("./util");

/** 获取版本号 */
function getFileVersion(fileName) {
  try {
    const name = typeof fileName === "string" ? fileName : "build.gradle";
    const p = path.isAbsolute(name) ? name : path.join(process.cwd(), name);
    const data = fs.readFileSync(p, "utf-8");
    const array = data.split("\n");
    for (let index = 0; index < array.length; index++) {
      const value = array[index];
      if (value.startsWith("version")) {
        const versions = value.split("=");
        let version = versions.length >= 1 ? versions[1] : 0;
        version = version.replace(/"/g, "").replace(/\s+/g, "");
        return version.split(".").length <= 2 ? version + ".0" : version;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

/** 写入版本号 */
async function saveFileVersion({ version, programValues }) {
  if (!programValues.saveTag) return
  try {
    const p = path.join(process.cwd(), "package.json");
    const data = fs.readFileSync(p, "utf-8");
    const dataJson = JSON.parse(data)
    const versionArr = version?.split('.') || []
    if (versionArr.length > 0) {
      dataJson.subversion = versionArr[versionArr.length - 1]
    }
    fs.writeFileSync(p, JSON.stringify(dataJson, null, 2))
    await runCommand(
      `git add . && git commit -m "feat: 更新tag版本"`,
    ).finally(async () => {
      const result = await execa(
        `git push`
      );
      if (result.failed) {
        return Promise.reject(new Error("git push 失败"));
      }
    })

  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getFileVersion,
  saveFileVersion
}