let baseUrl = 'http://192.168.123.187:8090';
module.exports = {
    userInfo: baseUrl + '/api/userInfo',
    getToken: baseUrl + '/api/userInfo/getToken',
    dictInfo: baseUrl + '/api/dictInfo',
    dictDetailInfo: baseUrl + '/api/dictDetailInfo',
    questionInfo: baseUrl + '/api/questionInfo',
    login: baseUrl + '/api/userInfo/login'
}
