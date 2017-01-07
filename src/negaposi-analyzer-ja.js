// MIT © 2017 azu
"use strict";
const debug = require("debug")("negaposi-analyzer-ja");
/**
 * それぞれの単語の数
 * posi: nega = 5122 : 49983
 * 1   : 1    = 1 : 0.102474841
 * @type {{good: number, bad: number, zero: number}}
 */
const posiNegaRatio = {
    posi: 5122,
    nega: 49983,
    zero: 20
};
const defaultOptions = {
    // 辞書にない単語のスコア
    unknownWordRank: 0,
    // ポジティブな単語に対する補正値(スコアに乗算)
    positiveCorrections: 1,
    // ネガティブな単語に対する補正値(スコアに乗算)
    negativeCorrections: posiNegaRatio.posi / posiNegaRatio.nega,
    // 辞書の配列
    posiNegaDict: require("../dict/pn_ja.dic.json")
};
/**
 * @param {Object[]} tokens kuromoji.jsのtoken配列
 * @param {Object} options
 */
module.exports = function(tokens, options = {}) {
    if (tokens.length === 0) {
        return 0;
    }
    let score = 0;
    const unknownWordRank = options.unknownWordRank || defaultOptions.unknownWordRank;
    const posiNegaDict = options.posiNegaDict || defaultOptions.posiNegaDict;
    const negativeCorrections = options.negativeCorrections || defaultOptions.negativeCorrections;
    const positiveCorrections = options.positiveCorrections || defaultOptions.positiveCorrections;
    debug("Options: %o", {
        unknownWordRank,
        negativeCorrections,
        positiveCorrections
    });
    const scoreToken = (token) => {
        // まずは緩く取得
        const foundDictionaries = posiNegaDict.filter(dict => {
            return dict["surface"] === token["surface_form"] && dict["reading"] === token["reading"] &&
                dict["posi"] === token["posi"];
        });
        // 複数候補が出たときは厳しく判定
        const foundDict = foundDictionaries.length === 1
            ? foundDictionaries[0]
            : foundDictionaries.find(dict => dict["surface"] === token["surface_form"]);
        if (foundDict) {
            const rank = foundDict["rank"];
            debug(token["surface_form"], rank);
            if (rank > 0) {
                return rank * positiveCorrections;
            } else if (rank < 0) {
                return rank * negativeCorrections;
            }
            return rank;
        } else {
            return unknownWordRank;
        }
    };
    tokens.forEach(token => {
        score += scoreToken(token);
    });
    return score / tokens.length;
};