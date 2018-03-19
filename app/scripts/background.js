// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import { targetUrlPattern } from './modules/constants';
import logger from './modules/log';
const log = process.env.NODE_ENV === 'development' ? logger.debug : () => { };
// マイグレーション的な?
chrome.runtime.onInstalled.addListener((details) => {
  // console.log('previousVersion', details.previousVersion)
});
/**
 * URLからプラグインの対象のページか否か判定
 * @param {*} url
 */
const matchUrl = (url) => {
  const targets = targetUrlPattern;
  for (const pattern of targets) {
    if (pattern.test(url)) {
      return true;
    }
  }
  return false;
};
// ページが読み込まれたときに発生するっぼい
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  log('tabs.onUpdated:', tabId, ',changeInfo:', changeInfo, ',tab:', tab);
  // 対象のページのみActionを有効にする
  if (changeInfo.status === 'complete' && matchUrl(tab.url)) {
    chrome.pageAction.show(tabId);
  }
});
