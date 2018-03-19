import { u } from './libs/umbrella.min.js';
import uu from './modules/umbrella-utils';
import translate from './modules/i18n-translate';
import logger from './modules/log';
const log = process.env.NODE_ENV === 'development' ? logger.debug : () => { };
(function () {
  console.log('hello popup.');
  const $viewLoading = u('#loading');
  const $viewEnabled = u('#enabled');
  const $viewDisabled = u('#disabled');
  const $disableButton = u('#disable-button');
  const $enableButton = u('#enable-button');
  const $optionPageButton = u('.option-page');
  // 初期表示/設定反映
  const reloadSettings = () => {
    uu.show($viewLoading);
    uu.hide($viewEnabled);
    uu.hide($viewDisabled);
    chrome.storage.local.get({ enabled: false }, (items) => {
      log('got items:', items);
      if (items.enabled) {
        uu.hide($viewLoading);
        uu.show($viewEnabled);
      } else {
        uu.hide($viewLoading);
        uu.show($viewDisabled);
      }
    });
  };
  // 有効
  $enableButton.on('click', () => {
    chrome.storage.local.set({ enabled: true }, () => {
      reloadSettings();
    });
  });
  // 無効
  $disableButton.on('click', () => {
    chrome.storage.local.set({ enabled: false }, () => {
      reloadSettings();
    });
  });
  // 詳細設定ボタン
  $optionPageButton.on('click', () => {
    chrome.runtime.openOptionsPage();
  });
  // 初期表示
  reloadSettings();
  // i18n
  translate();
})();