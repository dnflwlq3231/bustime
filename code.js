let request = require('request');
let cheerio = require('cheerio');

const $url = 'http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station';
const $KEY = 'BA6Cn3Y%2FpmaRlMgao7%2BVQ7Z7SjQzSZI15H1g9OI6Itqk7wb06tShg8%2BDp7xNfRpVFtiP3CdBNq6kDQGJIdV3AQ%3D%3D';
const $station = '233001450'

const $api_url = $url + '?serviceKey=' + $KEY + '&stationId=' + $station;
    console.log($api_url);

request($api_url, function(err, res, body) {
    console.log('normal');
    $ =  cheerio.load(body);
    console.log('normal12');
    $('busArrivalList').each(function(idx) {
        let no1 = $(this).find('plateNo1').text();
        let no2 = $(this).find('plateNo2').text();
        console.log(`도착예정버스: ${no1}, 다음도착버스: ${no2 ? no2 : '---'}`)
    });
});