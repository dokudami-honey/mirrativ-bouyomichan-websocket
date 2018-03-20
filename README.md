# Mirrativ-棒読みちゃんWebSocket連携
## はじめに
このChrome Extensionは、Mirrativ配信中のコメントを[棒読みちゃん](http://chi.usamimi.info/Program/Application/BouyomiChan/)で読み上げる目的で開発されました。
このExtensionと棒読みちゃんの連携はWebSocket([BouyomiChan-WebSocket-Plugin](https://github.com/chocoa/BouyomiChan-WebSocket-Plugin))を用いて行います。

## 前提
- [棒読みちゃん](http://chi.usamimi.info/Program/Application/BouyomiChan/)が導入済みであること
- [BouyomiChan-WebSocket-Plugin](https://github.com/chocoa/BouyomiChan-WebSocket-Plugin)が導入済みであること
- Google Chromeが導入済みであること

## 導入
Chrome Web Store経由でこのExtentionをインストールする。

## 配信
1. Mirrativで配信を開始する
1. 棒読みちゃんを起動する(BouyomiChan-WebSocket-Pluginが有効であることを確認する)
1. アドレスバーの右にあるこのExtensionのアイコンをクリックする
1. 「有効にする」ボタンを押下する

これでコメントが投稿されるたびに棒読みちゃんが読み上げてくれるはずです。

## 設定
設定を変更するにはChrome拡張機能のオプションを開きます。オプションは下記のいずれかの方法で開くことができます。
- [Chrome拡張機能](chrome://extensions/?options=noblmbggdipkcgmaoeanjmafigmfjigf)
- アドレスバーの右にあるこのExtensionのアイコンをクリックして「詳細設定」ボタンを押下
- アドレスバーの右にあるこのExtensionのアイコンを右クリックして「オプション」を選択
### 設定項目
#### 棒読みちゃんWebSocketホスト
配信するPCと棒読みちゃんが読み上げるPCが異なる場合は、ここに棒読みちゃんのホスト名またはIPアドレスを設定します。同じ場合は変更する必要はありません。
#### 棒読みちゃんWebSocket ポート番号
BouyomiChan-WebSocket-Pluginを自分でビルドし、その際ポート番号を変更した場合にこの項目を設定します。何を言っているのか分からなければ変更する必要はありません。
#### 読み上げ速度
#### 読み上げピッチ
#### 読み上げボリューム
#### 声質
読み上げに関する設定です。実装しておいてアレですが、棒読みちゃん本体で設定したほうが使い勝手が良いです。
#### コメント時にユーザ名も読み上げる
チェックを入れておくとコメントの冒頭にコメントしたユーザ名も読み上げます。入室時はこの設定にかかわらずユーザ名を読み上げます。
#### 名前読み上げ時の敬称
「ちゃん」でも「様」でもお好きなものを。スマホアプリ版と似た感じにしたい場合は「」(空文字列)にすると良いでしょう。

設定を変更したら「保存」ボタンを押下して保存します。

## 関連
- [棒読みちゃん](http://chi.usamimi.info/Program/Application/BouyomiChan/)
- [BouyomiChan-WebSocket-Plugin](https://github.com/chocoa/BouyomiChan-WebSocket-Plugin)
- [m!ka.さん](https://twitter.com/kimera2_twt/status/796249680036302848) (ExtensionとWebSocketを連携するというアイデアは私のオリジナルではありません)

# For developer
## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

```javascript
if(process.env.NODE_ENV === 'development'){
  console.log('We are in development mode!');
}
```






