const development = process.env.NODE_ENV === 'development';

export default {
  /**
   * 開発時のみコンソール出力
   * @param [*]
   */
  debug: development ? console.log : () => { },
  /**
   * エラー出力
   * @param [*]
   */
  error: console.log
};
