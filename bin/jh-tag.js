#!/usr/bin/env node

var program = require("commander");
var version = require("../package.json").version;
var tags = require("../scripts/tags");

program
  .version(version, '-v --version')
  .helpOption('-h --help')
  .option("-p, --isProduction", "Production Version")
  .option("-st, --saveTag", "保存tag版本号")
  .option("-n, --isNoBeta", "Privatisation Version")
  .option("-m, --isMinio", "Minio Version")
  .option("-s, --suffix [value]", "Append Tag Suffix")
  .option("-c, --comment [value]", "Append Tag Comment")
  .option("-f, --file [value]", "Get Version From File")
  .parse(process.argv);

tags(program);
