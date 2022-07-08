import url from "../../../utils/url";
import storage from "../../../utils/storage";
let app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    /**
     * 页面的初始数据
     */
    properties:{
        test: String
    },
    data: {
        userInfo: {},
    },
    lifetimes: {
        attached: function() {
            let that = this;
            // 在组件实例进入页面节点树时执行
            console.log(this.properties.test)
            storage.getUserInfo().then(res=>{
                console.log(res);
                that.setData({
                    userInfo: res
                })
            })
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        },

    },
    methods:{
        getUserProfile: function (e) {
            let that = this
            wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (r) => {
                    wx.showLoading({
                        title: '登陆中',
                    })
                    wx.login({
                        success: function (e) {

                            wx.request({
                                method: 'POST',
                                url: url.login,
                                data: {
                                    code: e.code,
                                    nickName: r.userInfo.nickName,
                                    avatarUrl: r.userInfo.avatarUrl
                                },
                                success: function (res) {
                                    storage.setUserInfo(res.data)
                                    that.setData({
                                        userInfo: res.data
                                    })
                                    wx.request({
                                        url: url.getToken,
                                        method: 'POST',
                                        data: {
                                            userName: res.data.userName,
                                        },
                                        success(res3) {
                                            if (res3.data.token !== undefined) {
                                                storage.setToken(res3.data.token)
                                            }
                                            wx.hideLoading()
                                            // wx.navigateBack();

                                        }
                                    })


                                },
                                fail: function (res) {
                                    wx.hideLoading()
                                    console.log(res);
                                }
                            })
                        }
                    });
                },
            })
        },

    }
})
