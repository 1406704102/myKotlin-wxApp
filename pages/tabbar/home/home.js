// pages/home/home.js
import url from "../../../utils/url";
import storage from "../../../utils/storage";
import PJRequest from '../../../utils/request';

// pages/tabbar/home/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        elements: [{
            title: '布局',
            name: 'layout',
            color: 'cyan',
            icon: 'newsfill'
        },
            {
                title: '背景',
                name: 'background',
                color: 'blue',
                icon: 'colorlens'
            },
            {
                title: '文本',
                name: 'text',
                color: 'purple',
                icon: 'font'
            },
            {
                title: '图标 ',
                name: 'icon',
                color: 'mauve',
                icon: 'icon'
            },
            {
                title: '按钮',
                name: 'button',
                color: 'pink',
                icon: 'btn'
            },
            {
                title: '标签',
                name: 'tag',
                color: 'brown',
                icon: 'tagfill'
            },
            {
                title: '头像',
                name: 'avatar',
                color: 'red',
                icon: 'myfill'
            },
            {
                title: '进度条',
                name: 'progress',
                color: 'orange',
                icon: 'icloading'
            },
            {
                title: '边框阴影',
                name: 'shadow',
                color: 'olive',
                icon: 'copy'
            },
            {
                title: '加载',
                name: 'loading',
                color: 'green',
                icon: 'loading2'
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        // 在组件实例进入页面节点树时执行
        PJRequest.getAction({
            url: url.dictInfo,
            loading: '',
            data: {
                dictKey: 'question_type'
            }
        }).then(res => {
            PJRequest.getAction({
                url: url.dictDetailInfo,
                data:{
                    dictId:res.data.content[0].id
                }
            }).then(res=>{
                let data = res.data.content;
                data.forEach((f,index)=>{
                    console.log(index)
                    f.color=this.data.elements[index].color
                    // f.icon=this.data.elements[index].icon
                })
                console.log(data)
                that.setData({
                    data: data
                })
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
