// MIT © 2017 azu
"use strict";
const normal = [];
const posi = [];
const nega = [];
require("../../dict/pn_ja.dic.json").forEach(dict => {
    if (dict["rank"] > 0) {
        posi.push(dict["rank"])
    } else if (dict["rank"] < 0) {
        nega.push(dict["rank"]);
    } else {
        normal.push(dict["rank"]);
    }
});
console.log(`Posi: ${posi.length}, Nega: ${nega.length}, Normal: ${normal.length}`);
console.log(`Total Posi: ${posi.reduce((t, r) => t + r)}, Nega: ${nega.reduce((t, r) => t + r)}, Normal: ${normal.reduce((t, r) => t + r)}`);
