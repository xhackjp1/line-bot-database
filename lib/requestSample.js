const request = require('request');

let apiUrl = "https://api.gnavi.co.jp/RestSearchAPI/v3/?"
apiUrl += 'keyid=' + "d49b6f9e789d3624c8f845616cb555f6";
apiUrl += '&address=' + encodeURIComponent("高田馬場");
apiUrl += '&category_l=' + encodeURIComponent("RSFST08000");
apiUrl += '&hit_per_page=' + 100;

request(apiUrl, function(err, res, body) {
    let result = JSON.parse(body);
    let random = Math.floor(Math.random() * result.rest.length);
    console.log(result.rest[random].name);
});