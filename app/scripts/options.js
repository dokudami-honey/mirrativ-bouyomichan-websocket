import { u } from './libs/umbrella.min.js';
import uu from './modules/umbrella-utils';
import { defaultOptions } from './modules/constants';
import translate from './modules/i18n-translate';
import logger from './modules/log';

const log = process.env.NODE_ENV === 'development' ? logger.debug : () => { };
(() => {
  var $host = u('#option_host');
  const $port = u('#option_port');
  const $read_name = u('#option_read_name');
  const $reduce_icon = u('#option_reduce_icon');
  const $honorific = u('#option_honorific');
  const $speed = u('#option_speed');
  const $pitch = u('#option_pitch');
  const $volume = u('#option_volume');
  const $type = u('#option_type');
  const $save = u('#save');
  const $message = u('#message');
  const message = (mes) => {
    $message.text(mes);
  };
  const oins = chrome.i18n.getMessage("optionIsNotSaved");
  const ois = chrome.i18n.getMessage("optionIsSaved");
  // 何か変えたらメッセージ(保存されてません的な)を表示
  u('.option-item').on('change', (event) => {
    message(oins);
  });
  const restore_options = () => {
    chrome.storage.local.get(defaultOptions, (items) => {
      log('restore', items);
      uu.setValue($host, items.host);
      uu.setValue($port, items.port);
      $read_name.attr('checked', items.read_name);
      uu.setValue($honorific, items.honorific);
      uu.setValue($speed, items.speed);
      uu.setValue($pitch, items.pitch);
      uu.setValue($volume, items.volume);
      uu.setSelectedValue($type, items.type);
    });
  };
  // 保存ボタン
  $save.on('click', function () {
    const values = {
      host: uu.getValue($host),
      port: uu.getValue($port) | 0,
      read_name: $read_name.is(':checked'),
      honorific: uu.getValue($honorific),
      speed: uu.getValue($speed) | 0,
      pitch: uu.getValue($pitch) | 0,
      volume: uu.getValue($volume) | 0,
      type: uu.getValue($type) | 0
    };
    log('saving values:', values);
    chrome.storage.local.set(values, function () {
      message(ois);
    });
  });
  // 初期表示
  restore_options();
  // i18n
  translate();
})();
