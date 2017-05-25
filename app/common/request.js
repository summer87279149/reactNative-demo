import queryString from 'query-string';
import _ from 'lodash'
import Mock from 'mockjs'
import config from './config.js'
var request = {}

request.get = function(url, para) {
  if (para) {
    url = url + "?" + queryString.stringify(para)
  }
  return fetch(url).then((response) => response.json()).then((responseJson) => Mock.mock(responseJson));
}
request.post = function(url, body) {
  var options = _.extend(config.header, {
    body: JSON.stringify(body)
  })
  return fetch(url,options)
  .then((response) => response.json())
  .then((responseJson) => Mock.mock(responseJson));
}
module.exports = request
