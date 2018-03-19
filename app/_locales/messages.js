const messages = {
    optionItemHost: '棒読みちゃんWebSocket ホスト',
    optionItemPort: '棒読みちゃんWebSocket ポート番号',
    optionItemSpeed: '読み上げ速度',
    optionItemPitch: '読み上げピッチ',
    optionItemVolume: '読み上げボリューム',
    optionItemVoiceType: '声質',
    optionItemHonorific: '名前読み上げ時の敬称',
    saveButton: '保存',
    voiceType0: '本体設定',
    voiceType1: '女性1',
    voiceType2: '女性2',
    voiceType3: '男性1',
    voiceType4: '男性2',
    voiceType5: '中性',
    voiceType6: 'ロボット',
    voiceType7: '機械1',
    voiceType8: '機械2',
};
const resources = {};
for (key in messages) {
  resources[key] = {
    message: messages[key]
  };
}
console.log(JSON.stringify(resources, null, 2));
