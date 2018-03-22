/*
 * URL patterns.
 */
const mirrativBroadcastUrl = /https:\/\/www\.mirrativ\.com\/broadcast\/.*/;
const targets = [mirrativBroadcastUrl];
// development時のみローカル環境のURLを追加する。
if (process.env.NODE_ENV === 'development') {
  targets.push(/http:\/\/192\.168\.33\.30\/.*/);
}
/*
 * default option.
 */
export const DEFAULT_HOST = 'localhost';
export const DEFAULT_PORT = 50002;
export const defaultOptions = {
  enabled: false,
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  read_name: false,
  honorific: 'さん',
  speed: -1,
  pitch: -1,
  volume: -1,
  type: 0
};
export const targetUrlPattern = targets;
/*
 * for chrome.declarativeContent.PageStateMatcher用
 */
const options = [{
  hostEquals: 'www.mirrativ.com',
  pathPrefix: '/broadcast'
}];
// development時のみ開発環境のhostを追加する。
if (process.env.NODE_ENV === 'development') {
  options.push({
    hostEquals: '192.168.33.30'
  });
}
export const pageMatcherOptions = options;
export default {
  // 対象のURL
  // targetUrlPattern: targetUrlPattern,
  // 設定値のデフォルト
  defaultOptions: defaultOptions,
  pageMatcherOptions: pageMatcherOptions
};
