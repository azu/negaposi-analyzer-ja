// MIT © 2017 azu
"use strict";
const assert = require("assert");
const kuromojin = require("kuromojin");
const analyze = require("../src/negaposi-analyzer-ja");
describe("example", () => {
    it("should return score", () => {
        return kuromojin("これは良い文章だと思います。").then(tokens => {
            const score = analyze(tokens);
            assert(score === 0.0899567537384933);
        });
    });
});