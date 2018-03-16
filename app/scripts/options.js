import { u } from './umbrella.min.js';
const debug = process.env.NODE_ENV === 'development';
const log = debug ? function () {
  console.log.apply(console, arguments);
} : () => { };
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
  const onChange = (event) => {
    // message('設定は保存されていません');
    message(oins);
  };
  u('.option-item').on('change', onChange);
  const setValue = ($elem, val) => {
    if ($elem.length === 0) {
      return; //nothing to do.
    }
    $elem.nodes[0].value = val;
  };
  const setSelectedValue = ($elem, val) => {
    if ($elem.length === 0) {
      return; //nothing to do.
    }
    $elem.children('option').each((elem) => {
      if (elem.value == val) {
        u(elem).attr('selected', true);
      }
    });
  };
  const restore_options = () => {
    chrome.storage.local.get({
      host: 'localhost',
      port: 50002,
      read_name: false,
      honorific: 'さん',
      speed: -1,
      pitch: -1,
      volume: -1,
      type: 0
    }, (items) => {
      log('restore', items);
      setValue($host, items.host);
      setValue($port, items.port);
      $read_name.attr('checked', items.read_name);
      setValue($honorific, items.honorific);
      setValue($speed, items.speed);
      setValue($pitch, items.pitch);
      setValue($volume, items.volume);
      setSelectedValue($type, items.type);
    });
  };
  const getValue = ($elem) => {
    if ($elem.length === 0) {
      return; //nothing to do.
    }
    return $elem.nodes[0].value;
  };
  $save.on('click', function () {
    const values = {
      host: getValue($host),
      port: getValue($port) | 0,
      read_name: $read_name.is(':checked'),
      honorific: getValue($honorific),
      speed: getValue($speed) | 0,
      pitch: getValue($pitch) | 0,
      volume: getValue($volume) | 0,
      type: getValue($type) | 0
    };
    log('saving values:', values);
    //message('設定を保存しています...');
    chrome.storage.local.set(values, function () {
      // message('設定を保存しました');
      message(ois);
    });
  });
  restore_options();
})();
