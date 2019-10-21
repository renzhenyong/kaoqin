// pages/login/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        console.log("当前页面高度" + res.screenHeight * 0.8);
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
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  bindGetUserInfo: function(e) {
    if (e.detail.errMsg =="getUserInfo:fail auth deny"){
    return;
    }else{
    wx.login({
      success: res => {
        app.post('login', {
          code: res.code
        }, res => {
         
          console.log("login111");
          if (res.data.code == 1) {
            wx.switchTab({
              url: '../index/index',
            })
            app.globalData.uid = res.data.sid;
            //登录，则更新sid标识
            wx.setStorageSync('uid', res.data.sid);
          } else {
            wx.navigateTo({
              url: '../index/zuce',
            })
          }
         
        })
      }
    })
    }
  }
})