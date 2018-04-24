function myFunction() {
  var response = UrlFetchApp.fetch("https://tenki.jp/forecast/3/16/4410/13102/");
  //日本気象協会から東京都中央区のHTMLデータを取得する

  var myRegexp1 = /<section class="today-weather">([\s\S]*?)<\/section>/i;
  var match1 = myRegexp1.exec(response.getContentText());
  var response2 = match1[1];
  //「今日の天気に関する」セクションだけ抽出する。配列で同じ要素が2つ並ぶ理由は不明。

  var myRegexp2 = /<tr class="rain-probability">([\s\S]*?)<\/tr>/i;
  var match2 = myRegexp2.exec(response.getContentText());
  var rainProbability = match2[1];
  //今日の天気のセクションからから「降水確率」に関するタグの部分を抽出。
  
  rainProbability = rainProbability.replace(/(^\s+)|(\s+$)/g, "");
  //これなんだっけなあ、たしか前後の空白を削除するための正規表現＆Replaceメソッドだった気がする
  

  var TOKEN = '**********************';
  //つぶやきたいbotのトークンを記入する
  
  if ( rainProbability.match(/60|70|80|90|100/)) {

  var text = '今日、会社周辺は降水確率が60%以上ため、雨が降る可能性があります。傘をお忘れなく。:umbrella: @kazu67 ';
  var data = {
    'message' : text
  };
  var topicId = '*****';  //botが入っているTypetalkチャットIDを入れる
  var options = {
    'method'     : 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'payload'    : data
  };
  var url = 'https://typetalk.com' + '/api/v1/topics/' + topicId + '?typetalkToken=' + TOKEN;
  var res = UrlFetchApp.fetch(url, options);
    
  }else{
  
  }
}
