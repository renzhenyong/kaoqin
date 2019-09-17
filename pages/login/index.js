// pages/login/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      text: "对话",
      iconPath: "/example/images/tabbar_icon_chat_default.png",
      selectedIconPath: "/example/images/tabbar_icon_chat_active.png",
    },
    {
      text: "设置",
      iconPath: "/example/images/tabbar_icon_setting_default.png",
      selectedIconPath: "/example/images/tabbar_icon_setting_active.png",
      badge: 'New'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        console.log(res.screenHeight * 0.8);
        //设置容器的高度
        this.setData({
          rongqiHeight: res.screenHeight * 0.8
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.login({
      success: res => {
        console.log(res);
        app.post('login', { code: res.code }, res => {
          console.log(res)
          app.globalData.uid = res.data.sid;
          //登录，则更新sid标识
          wx.setStorageSync('uid', res.data.sid);
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    console.log(e);
    e.detail.userInfo.sid = wx.getStorageSync('uid');
    wx.redirectTo({
      url: '../index/index',
    })
    // app.post('userInfo', e.detail.userInfo, res => {
    //   console.log(res);
    //   if (res.data.code == 1) {
    //     wx.redirectTo({
    //       url: '../index/index',
    //     })
    //   } else {
    //     wx.showModal({
    //       title: '提醒',
    //       content: '未找到数据',
    //     })
    //   }
    // });
  }
})