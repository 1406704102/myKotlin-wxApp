// import Taro from "@tarojs/taro";

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const getUserInfo = s=> {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key:'userInfo',
            success: function (res) {
                resolve(res.data);
            },
            fail: function () {
               console.log("没有缓存 需要重新登录")

            }
        })
    })
}
const setUserInfo = userInfo=> {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key: 'userInfo',
            data: userInfo,
            success: function (res) {
                resolve(res);
            }
            // success: function (res) {
            //     resolve(res.data);
            // }
        })
    })
}
const getToken = s=> {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key:'pj-token',
            success: function (res) {
                resolve(res.data);
            },
            fail: function () {
               console.log("没有需要重新登录")
            }
        })
    })
}
const setToken = token=> {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key: 'pj-token',
            data: token,
            success: function (res) {
                resolve(res);
            }
            // success: function (res) {
            //     resolve(res.data);
            // }
        })
    })
}

export default {
    getUserInfo: getUserInfo,
    setUserInfo: setUserInfo,
    getToken: getToken,
    setToken: setToken,
}
