const calculateVersion = require("./calculateVersion");
const getCWDPackageVersion = require("./getCWDPackageVersion");
const { getFileVersion, saveFileVersion } = require("./fileVersion");
const getAllTags = require("./getAllTags");
const pushNewTag = require("./pushNewTag");

module.exports = async function tags(program) {
  const isFromFile = !!program.file;
  let version
  let result
  let tag
  let isTagsScriptsError = false
  try {
    if(isTagsScriptsError) return
    version = isFromFile
    ? await getFileVersion(program.file)
    : getCWDPackageVersion();
  } catch (error) {
    isTagsScriptsError = true
    console.error("获取version失败", error);
  }

  try {
    if(isTagsScriptsError) return
    result = await getAllTags(version);
  } catch (error) {
    isTagsScriptsError = true
    console.error("获取所有tags失败", error);
  }

  try {
    if(isTagsScriptsError) return
    tag = calculateVersion(program._optionValues, result, version);
  } catch (error) {
    isTagsScriptsError = true
    console.error("更新version失败", error);
  }

  try {
    if(isTagsScriptsError) return
    await saveFileVersion({
      version: tag,
      programValues: program._optionValues,
    });
    console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", tag);
  } catch (error) {
    isTagsScriptsError = true
    console.error("保存version失败", error);
  }

  try {
    if(isTagsScriptsError) return
    await pushNewTag({ tag, comment: program.comment });
  } catch (error) {
    isTagsScriptsError = true
    console.error("pushNewTag失败", error);
  }
};
