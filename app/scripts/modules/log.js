const development = process.env.NODE_ENV === 'development';

export default {
  /**
   * 開発時のみコンソール出力
   * @param [*]
   */
  debug: development ? function () {
    console.log.apply(console, arguments);
  } : () => { },
  /**
   * エラー出力
   * @param [*]
   */
  error: function () {
    console.error.apply(console, arguments);
  }
};
