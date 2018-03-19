const mirrativBroadcastUrl = /https:\/\/www\.mirrativ\.com\/broadcast\/.*/;
const targets = [mirrativBroadcastUrl];
// development時のみローカル環境のURLを追加する。
if (process.env.NODE_ENV === 'development') {
  targets.push(/http:\/\/192\.168\.33\.30\/.*/);
}
export const DEFAULT_PORT = 50002;
export const defaultOptions = {
  enabled: false,
  host: 'localhost',
  port: DEFAULT_PORT,
  read_name: false,
  honorific: 'さん',
  speed: -1,
  pitch: -1,
  volume: -1,
  type: 0
};
export const targetUrlPattern = targets;
export default {
  // 対象のURL
  targetUrlPattern: targetUrlPattern,
  // 設定値のデフォルト
  defaultOptions: defaultOptions
};
