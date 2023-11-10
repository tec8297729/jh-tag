const cp = require("child_process");

function splitWith_N(str) {
  return str.split("\n");
}

function getBuildNo(v) {
  let s = v.split(".");

  if (s.length === 5) {
    //x.x.x-(beta|release|alpha).x.x
    return Number(s[4]);
  }

  if (s.length === 4 && s[2].indexOf("-") > -1) {
    return 0;
  }

  if (s.length <= 3) {
    return 0;
  }

  if (s[3].indexOf("-") > -1) {
    //x.x.x.x-suffix
    return Number(s[3].split("-")[0]);
  }

  return Number(s[3]);
}

function compareUnit(a, b) {
  return getBuildNo(b) - getBuildNo(a);
}

function searchUseVersion(tags, version, isProduction, isNoBeta, isMinio) {
  let validTags = tags.filter((line) =>
    /^v?\d+\.\d+\.\d+(\.\d+)?(-(\w+?)\.\d+(\.\d+)?)?((-\w+)(-\w+)?(-\w+)?)?$/.test(
      line
    )
  );

  if (isProduction) {
    validTags = validTags.filter((line) => line[0] !== "v");
  }

  if (isNoBeta) {
    validTags = validTags.filter((line) => !!~line.indexOf("-noBeta"));
  }

  if (isMinio) {
    validTags = validTags.filter((line) => !!~line.indexOf("-minio"));
  }

  return validTags
    .filter((line) => line.slice(Number(!isProduction)).startsWith(version))
    .sort(compareUnit);
}

const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    // command传入的是npm,args是[install,-d,包名],最终拼接执行了一条shell命令
    const executedCommand = cp.spawn(command, args, {
      stdio: "pipe",
      shell: true, // 开启shell功能
    });
    let stdoutData;
    // 出错时执行
    executedCommand.on("error", (error) => {
      reject(error);
    });
    executedCommand.stdout.on("data", (data) => {
      stdoutData = data;
    });
    // 退出时执行
    executedCommand.on("exit", (code, ...data) => {
      if (code === 0) {
        resolve({
          stdout: stdoutData,
          data,
        });
      } else {
        reject();
      }
    });
  });
};

module.exports = {
  split: splitWith_N,
  searchUseVersion,
  getBuildNo,
  runCommand,
};
