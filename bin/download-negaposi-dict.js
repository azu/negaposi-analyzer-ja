#!/usr/bin/env node
'use strict';
const fetch = require('node-fetch');
const TextDecoder = require("text-encoding").TextDecoder;
const fs = require('fs');
const path = require('path');
const dictToJson = require("../lib/dict-to-json");
const posiNegaDictionaryURL = "http://www.lr.pi.titech.ac.jp/~takamura/pubs/pn_ja.dic";
const posiNegaJSONFilePath = path.join(__dirname, "..", "dict", "pn_ja.dic.json");
console.log("Downloading: " + posiNegaDictionaryURL);
fetch(posiNegaDictionaryURL)
.then(res => {
    return res.buffer().then(buffer =>
        new TextDecoder("shift_jis").decode(buffer)
    );
})
.then(content => dictToJson(content))
.then(json => {
    fs.writeFileSync(posiNegaJSONFilePath, JSON.stringify(json), "utf-8");
}).then(() => {
    console.log("Write: " + posiNegaJSONFilePath);
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
});