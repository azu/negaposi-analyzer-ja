# negaposi-analyzer-ja

形態素解析したテキストからネガティブ/ポジティブ(単語感情極性)を判定したスコアを返すJavaScriptライブラリ

## Install

Install with [npm](https://www.npmjs.com/):

    npm install negaposi-analyzer-ja

### 辞書

辞書には[単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html "PN Table")を利用します。
このモジュールには辞書のダウンロードスクリプトが同梱されているので、モジュールをインストール後次のコマンドでダウンロードできます。

    ./node_modules/.bin/download-negaposi-dict


## Usage

このライブラリ自体は形態素解析をしていません。
形態素解析した結果のtoken配列を引数として受け取ります。

形態素解析には[kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")(またはラッパーである[kuromojin](https://github.com/azu/kuromojin "kuromojin"))を想定しています。

```js
const assert = require("assert");
const kuromojin = require("kuromojin");
const analyze = require("negaposi-analyzer-ja");
kuromojin("これは良い文章だと思います。").then(tokens => {
    const score = analyze(tokens);
    assert(score === 0.0899567537384933);
});
```

## API

### `analyze(tokens: Object[], options?: Object): number`

kuromojiの形態素解析した結果のtoken配列(`tokens`)を受け取り、スコアを返します。
辞書には単語(品詞付き)毎に-1から1の範囲のスコアが設定されています。

`analyze`の返すスコアは各単語のスコアを合計をtokenの数で割った値です。

#### Options

```js
const defaultOptions = {
    // 辞書にない単語のスコア
    unknownWordRank: 0,
    // ポジティブな単語に対する補正値(スコアに乗算)
    positiveCorrections: 1,
    // ネガティブな単語に対する補正値(スコアに乗算)
    negativeCorrections: 5122 / 49983,
    // 辞書の配列
    posiNegaDict: require("../dict/pn_ja.dic.json")
};
```

デフォルトではネガティブ単語に補正値をかけています。
理由としては、[単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html "PN Table")にはネガティブな単語の割合が多いため、
補正値なしでは大体のケースがネガティブと判断されるためです。

```js
const posiNegaRatio = {
    posi: 5122,
    nega: 49983,
    zero: 20
};
```

## Changelog

See [Releases page](https://github.com/azu/negaposi-analyzer-ja/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/negaposi-analyzer-ja/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

## Dictionary

This library not includes the dictionary, but includes download tool. 

[単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html "PN Table")

    高村大也, 乾孝司, 奥村学
    "スピンモデルによる単語の感情極性抽出", 情報処理学会論文誌ジャーナル, Vol.47 No.02 pp. 627--637, 2006.
    Hiroya Takamura, Takashi Inui, Manabu Okumura,
    "Extracting Semantic Orientations of Words using Spin Model", In Proceedings of the 43rd Annual Meeting of the Association for Computational Linguistics (ACL2005) , pages 133--140, 2005. 