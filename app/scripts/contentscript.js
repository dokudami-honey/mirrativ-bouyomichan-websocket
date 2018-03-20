import { u } from './libs/umbrella.min.js';
import { defaultOptions, DEFAULT_PORT, DEFAULT_HOST } from './modules/constants';
import logger from './modules/log';

const log = process.env.NODE_ENV === 'development' ? logger.debug : () => { };
const inIncomming = (comment) => {
  return comment.indexOf('が入室しました') > -1;
};
(() => {
  log('loaded...');
  // MirrativのUIが変わったらこの辺りを修正しなければならない
  const $wrapper = u('.mrWrapper');
  const handlingEvent = 'DOMSubtreeModified';
  const commentBlockSelector = '.mrChatList__list span';
  const commentItemSelector = '.mrChatList__item';
  const readFlagData = 'bouyomi-read';
  $wrapper.on(handlingEvent, commentBlockSelector, function (e) {
    // オプションが読めない可能性を考慮してデフォルト値を指定しておく
    chrome.storage.local.get(defaultOptions, function (config) {
      log('config:', config);
      if (!config.enabled) {
        u(commentItemSelector).data(readFlagData, 'true');
        return false;
      }
      // 棒読みちゃんに渡す文章格納用
      let contents = [];
      // コメントのリストから読み上げ済みを除いたものが対象
      u(commentItemSelector).not('[data-' + readFlagData + ']').each(function (elem) {
        const $elem = u(elem);
        // 読み上げ済みフラグ追加
        $elem.data(readFlagData, 'true');
        // 棒読みちゃんに渡す名前と発言内容を取得
        const $children = $elem.children();
        const $user_text = u($children.nodes[1]).children();
        const user_name = u($user_text.nodes[0]).text();
        const comment = u($user_text.nodes[1]).text();
        log('user_name:', user_name, ',comment:', comment);
        // オプションによって常時名前を読み上げるか、入室時のみ名前を読み上げるか分岐
        if (config.read_name) {
          // ユーザー名を付与してコメントを読み上げ
          contents.push(user_name + config.honorific + ' ' + comment);
        } else {
          // 入室コメントかどうかを確認
          if (isIncomming(comment)) {
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
        const delim = '<bouyomi>';
        const comments = contents.join(' ');
        const message = [config.speed, config.pitch, config.volume, config.type, comments].join(delim);
        const host = config.host || DEFAULT_HOST;
        const port = config.port || DEFAULT_PORT;
        log('socket message:', message);
        const socket = new WebSocket('ws://' + host + ':' + port + '/');
        socket.onopen = function () {
          socket.send(message);
        };
        socket.onerror = function (err) {
          logger.error(err);
        };
      }
    });
  });
})();
