var request = require('request');

exports.api = function(json, search_text, callback) {

  const gnavi_url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GNAVI_API_KEY}&address=高田馬場&freeword=${search_text}`;
  // var keyword_array = "";
  // var gnavi_keyword = "";

  // // 受信テキスト
  // var search_place_array = search_place.split("\n");

  // //検索キーワード
  // if (search_place_array.length == 2) {
  //   keyword_array = search_place_array[1].split("、");
  //   gnavi_keyword = keyword_array.join();
  // }

  // ぐるなびAPI レストラン検索API
  // ぐるなび リクエストパラメータの設定
  // var gnavi_query = {
  //   "keyid": process.env.GNAVI_API_KEY,
  //   "format": "json",
  //   "address": "高田馬場",
  //   "hit_per_page": 10,
  //   "freeword": gnavi_keyword,
  //   "freeword_condition": 2
  // };
  
  var gnavi_options = {
    url: gnavi_url,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    // qs: gnavi_query,
    json: true
  };

  // 検索結果をオブジェクト化
  var search_result = {};

  request.get(gnavi_options, function(error, response, body) {
    if (error || response.statusCode != 200) {
      console.log('error: ' + response.statusCode);
      return;
    }
    if ('error' in body) {
      console.log("検索エラー" + JSON.stringify(body));
      search_result['error'] = "検索エラーです";
      callback(search_result);
      return;
    }
    // 店名
    if ('name' in body.rest[0]) {
      search_result['name'] = body.rest[0].name_kana;
    }
    // url
    if ('url' in body.rest[0]) {
      search_result['url'] = body.rest[0].url_mobile;
    }
    // 画像
    if ('image_url' in body.rest[0]) {
      search_result['shop_image1'] = body.rest[0].image_url.shop_image1;
      search_result['shop_image2'] = body.rest[0].image_url.shop_image2;
    }
    // 住所
    if ('address' in body.rest[0]) {
      search_result['address'] = body.rest[0].address;
    }
    // 緯度
    if ('latitude' in body.rest[0]) {
      search_result['latitude'] = body.rest[0].latitude;
    }
    // 経度
    if ('longitude' in body.rest[0]) {
      search_result['longitude'] = body.rest[0].longitude;
    }
    // 営業時間
    if ('opentime' in body.rest[0]) {
      search_result['opentime'] = body.rest[0].opentime;
    }
    callback(search_result);
  });
}