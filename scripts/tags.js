const calculateVersion = require("./calculateVersion");
const getCWDPackageVersion = require("./getCWDPackageVersion");
const { getFileVersion, saveFileVersion } = require("./fileVersion");
const getAllTags = require("./getAllTags");
const pushNewTag = require("./pushNewTag");

module.exports = async function tags(program) {
  try {
    const isFromFile = !!program.file;
    const version = isFromFile
      ? await getFileVersion(program.file)
      : getCWDPackageVersion();

    const result = await getAllTags(version);
    const tag = calculateVersion(program._optionValues, result, version);
    await saveFileVersion({
      version: tag,
      programValues: program._optionValues,
    });
    console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", tag);
    return pushNewTag({ tag, comment: program.comment });
  } catch (e) {
    console.error("error", e);
  }
};
