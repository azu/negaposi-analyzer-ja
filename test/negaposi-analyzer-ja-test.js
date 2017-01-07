// MIT © 2017 azu
"use strict";
const assert = require("assert");
const analyze = require("../src/negaposi-analyzer-ja");
const exampleDict = require("../dict/example-dict.json");
const testOptions = {
    unknownWordRank: 0,
    negativeCorrections: 1,
    positiveCorrections: 1,
    posiNegaDict: exampleDict
};
describe("negaposi-analyzer-ja", () => {
    context("when tokens includes posi and nega", () => {
        it("should return total score is 0", () => {
            const tokens = [
                {
                    "word_id": 2131070,
                    "word_type": "KNOWN",
                    "word_position": 1,
                    "surface_form": "良い",
                    "pos": "形容詞",
                    "pos_detail_1": "自立",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "形容詞・アウオ段",
                    "conjugated_form": "基本形",
                    "basic_form": "良い",
                    "reading": "ヨイ",
                    "pronunciation": "ヨイ"
                },
                {
                    "word_id": 1950710,
                    "word_type": "KNOWN",
                    "word_position": 1,
                    "surface_form": "悪い",
                    "pos": "形容詞",
                    "pos_detail_1": "自立",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "形容詞・アウオ段",
                    "conjugated_form": "基本形",
                    "basic_form": "悪い",
                    "reading": "ワルイ",
                    "pronunciation": "ワルイ"
                }
            ];
            const score = analyze(tokens, testOptions);
            assert(score === 0);
        });
    });
    context("when tokens positive word", () => {
        it("should return score > 0", () => {
            const tokens = [
                {
                    "word_id": 2131070,
                    "word_type": "KNOWN",
                    "word_position": 1,
                    "surface_form": "良い",
                    "pos": "形容詞",
                    "pos_detail_1": "自立",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "形容詞・アウオ段",
                    "conjugated_form": "基本形",
                    "basic_form": "良い",
                    "reading": "ヨイ",
                    "pronunciation": "ヨイ"
                }
            ];
            const score = analyze(tokens, testOptions);
            assert(score === 1);
        });
    });
    context("when tokens negative word", () => {
        it("should return score is -1", () => {
            const tokens = [
                    {
                        "word_id": 1950710,
                        "word_type": "KNOWN",
                        "word_position": 1,
                        "surface_form": "悪い",
                        "pos": "形容詞",
                        "pos_detail_1": "自立",
                        "pos_detail_2": "*",
                        "pos_detail_3": "*",
                        "conjugated_type": "形容詞・アウオ段",
                        "conjugated_form": "基本形",
                        "basic_form": "悪い",
                        "reading": "ワルイ",
                        "pronunciation": "ワルイ"
                    }
                ]
                ;
            const score = analyze(tokens, testOptions);
            assert(score === -1);
        });
    });
    context("when tokens unknown word", () => {
        it("should return score by unknownScore", () => {
            const tokens = [
                {
                    "word_id": 2118700,
                    "word_type": "KNOWN",
                    "word_position": 1,
                    "surface_form": "未知",
                    "pos": "名詞",
                    "pos_detail_1": "一般",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "未知",
                    "reading": "ミチ",
                    "pronunciation": "ミチ"
                },
                {
                    "word_id": 93100,
                    "word_type": "KNOWN",
                    "word_position": 3,
                    "surface_form": "の",
                    "pos": "助詞",
                    "pos_detail_1": "連体化",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "の",
                    "reading": "ノ",
                    "pronunciation": "ノ"
                },
                {
                    "word_id": 2429280,
                    "word_type": "KNOWN",
                    "word_position": 4,
                    "surface_form": "単語",
                    "pos": "名詞",
                    "pos_detail_1": "一般",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "単語",
                    "reading": "タンゴ",
                    "pronunciation": "タンゴ"
                }
            ];
            const score = analyze(tokens, testOptions);
            assert(score === 0);
        });
        it("can set unknownScore via options", () => {
            const tokens = [
                {
                    "word_id": 2118700,
                    "word_type": "KNOWN",
                    "word_position": 1,
                    "surface_form": "未知",
                    "pos": "名詞",
                    "pos_detail_1": "一般",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "未知",
                    "reading": "ミチ",
                    "pronunciation": "ミチ"
                },
                {
                    "word_id": 93100,
                    "word_type": "KNOWN",
                    "word_position": 3,
                    "surface_form": "の",
                    "pos": "助詞",
                    "pos_detail_1": "連体化",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "の",
                    "reading": "ノ",
                    "pronunciation": "ノ"
                },
                {
                    "word_id": 2429280,
                    "word_type": "KNOWN",
                    "word_position": 4,
                    "surface_form": "単語",
                    "pos": "名詞",
                    "pos_detail_1": "一般",
                    "pos_detail_2": "*",
                    "pos_detail_3": "*",
                    "conjugated_type": "*",
                    "conjugated_form": "*",
                    "basic_form": "単語",
                    "reading": "タンゴ",
                    "pronunciation": "タンゴ"
                }
            ];
            const score = analyze(tokens, Object.assign({}, testOptions, {
                unknownWordRank: 10
            }));
            assert(score === (10 * tokens.length) / tokens.length);
        })
    });
});