// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
// import { targetUrlPattern } from './modules/constants';
import { pageMatcherOptions } from './modules/constants';
import logger from './modules/log';
const log = process.env.NODE_ENV === 'development' ? logger.debug : () => { };
// /**
//  * URLからプラグインの対象のページか否か判定
//  * @param {*} url
//  */
// const matchUrl = (url) => {
//   const targets = targetUrlPattern;
//   for (const pattern of targets) {
//     if (pattern.test(url)) {
//       return true;
//     }
//   }
//   return false;
// };
const pageStateMatchers = pageMatcherOptions.map((option) => new chrome.declarativeContent.PageStateMatcher(option));

// [
//   new chrome.declarativeContent.PageStateMatcher({
//     pageUrl: {
//       hostEquals: 'www.mirrativ.com',
//       pathPrefix: '/broadcast'
//     }
//   }),
//   new chrome.declarativeContent.PageStateMatcher({
//     pageUrl: {
//       hostEquals: '192.168.33.30'
//     }
//   })
// ]

chrome.runtime.onInstalled.addListener((details) => {
  // console.log('previousVersion', details.previousVersion)
  // log(chrome.declarativeContent);
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: pageStateMatchers,
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});