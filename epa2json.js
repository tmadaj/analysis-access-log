#!/usr/bin/env node

const fs = require('fs');

const [inputFile, prettify, ...argv] = process.argv.slice(2);
const stdinString = fs.readFileSync(inputFile || 0, 'binary').toString(); // STDIN_FILENO = 0
const parsedInput = parseEPA(stdinString);

printJSON(parsedInput);

function parseEPA(epaStr) {
  const controlCharRegex = /[\x00-\x1f\x7f-\xff]/g;
  const lineRegex = /^(\S+) \[(\d\d):(\d\d):(\d\d):(\d\d)\] "(.+)" (\d+) (\d+|-)$/;
  const requestRegex = /(?:^([A-Z]+) |^)(|.+?)(?: (\S+)\/(\S+)$|$)/;

  return epaStr
    .split(/\r?\n/)
    .filter((line) => line.length)
    .map((line) => {
      const [, host, day, hour, minute, second, request, responseCode, documentSize] = line
        .replace(controlCharRegex, '')
        .match(lineRegex);
      const [, method = 'missing', url = '', protocol = 'missing', protocolVersion = 'missing'] = request.match(
        requestRegex,
      );

      return {
        host,
        datetime: { day, hour, minute, second },
        request: { method, url, protocol, protocolVersion },
        responseCode,
        documentSize: documentSize === '-' ? '0' : documentSize,
      };
    });
}

function printJSON(json) {
  const filenameRegex = /(.*)\..+/;
  const outputFile = inputFile ? `${inputFile.match(filenameRegex)[1]}.json` : 1; // STDOUT_FILENO = 1
  const params = prettify ? [null, 2] : [];
  const outputStr = JSON.stringify(json, ...params);

  fs.writeFile(outputFile, outputStr, (err) => err && console.error(err));
}
