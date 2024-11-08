#!/usr/bin/node

"use strict";

import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';
import xml from 'fast-xml-parser'

const DEFAULT_INPUT_FILE = "setup.yaml"
const DEFAULT_OUTPUT_FILE = "output"

// util fn to exit the current process
function exitWithMsg(code = 1, message) {
  code === 0 && console.log(message) || console.error(message);
  process.exit(code)
}

// process the args
import { argv } from 'node:process';
argv.length != 6 && exitWithMsg(1, "Wrong usage of the command, check usage and args passed")

let arg0, currentFilePath, arg1, target, arg2, setup;
[arg0, currentFilePath, arg1, target, arg2, setup] = [...argv];

function readeInputFile(inputFile = DEFAULT_INPUT_FILE) {
  /* 
    Read the .yaml input file
  */
  const currentDir = path.resolve(path.dirname(currentFilePath))
  const inputFile = path.resolve(currentDir, inputFile)
  try {
    const data = fs.readFileSync(inputFile, 'utf8');
    const parsedData = yaml.load(data)
    return parsedData[0]
  } catch (error) {
    exitWithMsg(1, `Error reading the file! See:
    ${error}
    `)
  }
}

function parseInputFile(inputFile = DEFAULT_INPUT_FILE, readeInputFile) {
  // parse data here...
  return readeInputFile()
}

function generateWixFile(outputFolder = DEFAULT_OUTPUT_FILE, parseInputFile) {
  /* 
    Generate the WIX file
  */
  const parsedInputFile = parseInputFile()
  // build the file here...
  const builder = new xml.XMLBuilder({
    ignoreAttributes: false,
  });
  const xml = builder.buildObject(sitemap);
}

