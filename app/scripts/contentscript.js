import { u } from './umbrella.min.js';
(() => {
  const debug = process.env.NODE_ENV === 'development';
  const log = debug ? function () {
    console.log.apply(console, arguments);
  } : () => { };
  log('loaded...');
  // MirrativのUIが変わったらこの辺りを修正しなければならない
  const $wrapper = u('.mrWrapper');
  $wrapper.on("DOMSubtreeModified", ".mrChatList__list span", function (e) {
    // オプションが読めない可能性を考慮してデフォルト値を指定しておく
    chrome.storage.local.get({
      host: 'localhost',
      port: 50002,
      read_name: false,
      honorific: 'さん',
      speed: -1,
      pitch: -1,
      volume: -1,
      type: 0
    }, function (config) {
      log('config:', config);
      // 棒読みちゃんに渡す文章格納用
      let contents = [];
      // コメントのリストから読み上げ済みを除いたものが対象
      u(".mrChatList__item").not(".read").each(function (elem) {
        const $elem = u(elem);
        // 読み上げ済みフラグ追加
        $elem.addClass("read");
        // 棒読みちゃんに渡す名前と発言内容を取得
        const $children = $elem.children();
        const $user_text = u($children.nodes[1]).children();
        const user_name = u($user_text.nodes[0]).text();
        const comment = u($user_text.nodes[1]).text();
        log('user_name:', user_name, ',comment:', comment);
        // オプションによって常時名前を読み上げるか、入室時のみ名前を読み上げるか分岐
        if (config.read_name) {
          // ユーザー名を付与してコメントを読み上げ
          contents.push(user + config.honorific + ' ' + comment);
        } else {
          // 入室コメントかどうかを確認
          if (comment.indexOf('が入室しました') > -1) {
            // 入室時は名前を読み上げ
            contents.push(user_name + config.honorific + comment);
          } else {
            // 入室じゃない場合は、コメントのみを読み上げ
            contents.push(comment);
          }
        }
      });
      // 棒読みちゃんに渡す
      if (contents.length) {
        const delim = "<bouyomi>";
        const comments = contents.join(' ');
        const message = [config.speed, config.pitch, config.volume, config.type, comments].join(delim);
        log('socket message:', message);
        const socket = new WebSocket('ws://' + config.host + ':' + config.port + '/');
        socket.onopen = function () {
          socket.send(message);
        };
        socket.onerror = function (err) {
          console.log(err);
        };
      }
    });
  });
})();
