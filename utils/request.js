import url from "./url";
import storage from "./storage";

const app = getApp();
let requestArr = [], isRefreshing = false;//请求队列，是否正在刷新token

// 401 刷新token
function refreshToken(obj, method, content_type, resolve) {
    console.log(123)
    requestArr.push(() => {
        resolve(httpRequest(obj, method, content_type))
    });//缓存请求到队列中
    if (!isRefreshing) {
        isRefreshing = true;
        storage.getUserInfo().then(res => {
            wx.request({
                url: url.getToken,
                method: 'POST',
                data: {
                    id: res.id,
                    userName: res.userName,
                },
                success(res3) {
                    if (res3.data.token !== undefined) {
                        storage.setToken(res3.data.token)
                        // wx.setStorageSync('pj_Token', res3.data.token);
                        // 重新请求队列
                        requestArr.map(MT => {
                            MT();
                        });
                        requestArr = [];//清空队列
                        // wx.startPullDownRefresh()
                    }
                    //解除正在刷新
                    isRefreshing = false;
                    // wx.hideLoading();

                }
            })
        });
    }
}

function httpRequest(obj, method, content_type = 'application/json') {
    return new Promise((resolve, reject) => {
        if (obj.loading !== undefined) {
            wx.showLoading({
                title: obj.loading === '' ? '加载中' : obj.loading,
            });
        }
        let token = null;//获取本地的token
        storage.getToken().then(res => {
            token = res
            wx.request({
                url: obj.url,
                data: obj.data,
                method: method,
                header: {'content-Type': content_type, 'PJ-token': token,},
                success: (res) => {
                    wx.hideLoading();
                    switch (res.statusCode) {//（根据实际情况判断）
                        case 200:
                            resolve(res);
                            break;
                        case 201:
                            resolve(res);
                            break;
                        case 204:
                            resolve(res);
                            break;
                        case 401:
                            refreshToken(obj, method, content_type, resolve);
                            break;
                        case 403:
                            wx.showToast({
                                title: '不能访问此资源',
                                icon: 'none',
                                duration: 2000
                            })
                            break;
                        default:
                            reject();
                    }
                },
                fail: function (err) {
                    wx.hideLoading();
                    reject(err);
                }
            });
        })

    })
}

function _get(obj) {
    return httpRequest(obj, 'GET', 'application/json');
}

function _post(obj) {
    return httpRequest(obj, 'POST', 'application/json');
}

function _put(obj) {
    return httpRequest(obj, 'PUT', 'application/json');
}

function _delete(obj) {
    return httpRequest(obj, 'DELETE', 'application/json');
}

export default {
    getAction: _get,
    postAction: _post,
    putAction: _put,
    deleteAction: _delete,
}
