#!/usr/bin/env node
'use strict';
const analyze = require('../lib/negaposi-analyzer-ja');
const kuromojin = require("kuromojin");
const concat = require('concat-stream');
const fs = require("fs");
const file = process.argv[2];
const input = file && file !== '-'
    ? fs.createReadStream(process.argv[2])
    : process.stdin;
input.pipe(concat(function(buf) {
    kuromojin(buf.toString('utf8')).then(function(tokens) {
        const score = analyze(tokens);
        console.log(String(score));
    });
}));
