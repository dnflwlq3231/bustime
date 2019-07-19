/* 설치한 express 모듈 불러오기 */
const express = require('express')
/* Node.js 기본 내장 모듈 불러오기 */
const http = require('http')
/* express 객체 생성 */
const app = express()
/* express http 서버 생성 */
const server = http.createServer(app)

let requestBus = require('request');
let cheerio = require('cheerio');
let contents = '';

const $url = 'http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station';
const $KEY = 'BA6Cn3Y%2FpmaRlMgao7%2BVQ7Z7SjQzSZI15H1g9OI6Itqk7wb06tShg8%2BDp7xNfRpVFtiP3CdBNq6kDQGJIdV3AQ%3D%3D';
const $station = '233001450'

const $api_url = $url + '?serviceKey=' + $KEY + '&stationId=' + $station;
    console.log($api_url);

    requestBus($api_url, function(err, res, body) {
        console.log('normal');
        $ =  cheerio.load(body);
        console.log('normal12');
        $('busArrivalList').each(function(idx) {
            let no1 = $(this).find('plateNo1').text();
            let no2 = $(this).find('plateNo2').text();
            console.log(`도착예정버스: ${no1}, 다음도착버스: ${no2 ? no2 : '---'}`)
            contents += "<br/>" + `도착예정버스: ${no1}, 다음도착버스: ${no2 ? no2 : '---'}`
           // response.write(`도착예정버스: ${no1}, 다음도착버스: ${no2 ? no2 : '---'}`
        })
    });

    /* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function(request, response) {

    response.writeHead(200, {'Content-Type':'text/html'})
    response.write('<meta charset = "utf-8"/>')
    response.write('<html>');
    response.write('<body>');
    response.write('<div>')
    response.write(contents)
    response.write('</div>');
    response.write('</body>');
    response.write('</html>');
    response.end();
})
  /* 서버를 8080 포트로 listen */
server.listen(8080, function() {
    console.log('서버 실행 중..')
  })