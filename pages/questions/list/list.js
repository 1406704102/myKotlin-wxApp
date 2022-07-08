// pages/questions/list/list.js
import url from "../../../utils/url";
import storage from "../../../utils/storage";
import PJRequest from '../../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    that.setData({
      title:options.typeName
    })
    PJRequest.getAction({
      url: url.questionInfo,
      loading: '',
      data: {
        questionType: options.questionType,
        enable: '1',
        size: 9999,
        sort: 'createTime,asc'
      }
    }).then(res => {
      that.setData({
        data : res.data.content
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
