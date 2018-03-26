// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import { pageMatcherOptions } from './modules/constants';
import logger from './modules/log';
const log = process.env.NODE_ENV === 'development' ? logger.debug : () => { };
/**
 * 対象のURLのみextensionを適用(show page action)する。
 */
const pageStateMatchers = pageMatcherOptions.map((option) => new chrome.declarativeContent.PageStateMatcher({
  pageUrl: option
}));

chrome.runtime.onInstalled.addListener((details) => {
  // console.log('previousVersion', details.previousVersion)
  // log(chrome.declarativeContent);
  // このあたりのハンドラチェーンはサンプルを参考に
  // https://developer.chrome.com/extensions/samples#search:pageaction
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: pageStateMatchers,
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});