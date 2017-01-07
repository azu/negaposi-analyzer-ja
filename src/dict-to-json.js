// MIT © 2017 azu
"use strict";
const parse = require("csv-parse");
const moji = require('moji');
function readDic(content) {
    return new Promise((resolve, reject) => {
        parse(content, {delimiter: ':'}, (err, output) => {
            if (err) {
                return reject(err);
            }
            resolve(output);
        });
    });
}
/**
 * @typedef {Object} NegaPosiDict
 * @property {string} surface 漢字
 * @property {string} reading カタカナ(kuromojiに合わせてカタカナ)
 * @property {string} pos 品詞
 * @property {number} rank 評価値
 */
/**
 * convert `csv` to array of NegaPosiDict
 * @param {Array} csv
 * @returns {NegaPosiDict[]}
 */
function csv2json(csv) {
    return csv.map(x => {
        return {
            'surface': x[0],
            'reading': moji(x[1]).convert('HG', 'KK').toString(),
            'pos': x[2],
            'rank': parseFloat(x[3]),
        };
    })
}

/**
 * Convert `content` to NegaPosiDict[]
 * `content` is a content of http://www.lr.pi.titech.ac.jp/~takamura/pubs/pn_ja.dic dictionary.
 * @param {string} content
 * @returns {Promise.<NegaPosiDict[]>}
 * @see http://www.lr.pi.titech.ac.jp/~takamura/pubs/pn_ja.dic
 */
module.exports = function(content) {
    return readDic(content).then(csv2json);
};
