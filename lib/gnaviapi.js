var request = require('request');

exports.api = function(json, search_text, callback) {

  let apiUrl = "https://api.gnavi.co.jp/RestSearchAPI/v3/?"
  apiUrl += 'keyid=' + "d49b6f9e789d3624c8f845616cb555f6";
  apiUrl += '&address=' + encodeURIComponent("高田馬場");
  apiUrl += '&category_l=' + encodeURIComponent("RSFST08000");
  apiUrl += '&hit_per_page=' + 100;

  // 検索結果をオブジェクト化
  var search_result = {};

  request.get(apiUrl, function(error, response, body) {
    
    let result = JSON.parse(body);
    let random = Math.floor(Math.random() * result.rest.length);
    // console.log(result.rest[random]);
    
    // if (error || body.error[0].code != 200) {
    //   console.log('error: ' + response.error[0].message);
    //   return;
    // }
    // if ('error' in body) {
    //   console.log("検索エラー" + JSON.stringify(body));
    //   console.log(body);
    //   console.log(response);
    //   search_result['error'] = "検索エラーです";
    //   callback(search_result);
    //   return;
    // }
    
    // 店名
    if ('name' in body.rest[random]) {
      search_result['name'] = body.rest[random].name_kana;
    }
    // url
    if ('url' in body.rest[random]) {
      search_result['url'] = body.rest[random].url_mobile;
    }
    // 画像
    if ('image_url' in body.rest[random]) {
      search_result['shop_image1'] = body.rest[random].image_url.shop_image1;
      search_result['shop_image2'] = body.rest[random].image_url.shop_image2;
    }
    // 住所
    if ('address' in body.rest[random]) {
      search_result['address'] = body.rest[random].address;
    }
    // 緯度
    if ('latitude' in body.rest[random]) {
      search_result['latitude'] = body.rest[random].latitude;
    }
    // 経度
    if ('longitude' in body.rest[random]) {
      search_result['longitude'] = body.rest[random].longitude;
    }
    // 営業時間
    if ('opentime' in body.rest[random]) {
      search_result['opentime'] = body.rest[random].opentime;
    }
    callback(search_result);
  });
}