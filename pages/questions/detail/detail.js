// pages/questions/detail/detail.js
import url from "../../../utils/url";
import storage from "../../../utils/storage";
import PJRequest from '../../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    data: [],
    total: 0,
    nowIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    console.log(options)
    that.setData({
      title: options.title
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
      console.log(res);
      // this.questionType = options.questionType;
      // this.questions = res.data.content;
      // this.total = res.data.totalElements;
      // let content = [];
      // let content = res.data.content;
      that.setData({
        data: res.data.content,
        total: res.data.totalElements,
        nowIndex: parseInt(options.index)
      })
    });
  },
  questionChange(e) {
    this.setData({
      nowIndex: e.detail.index
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
