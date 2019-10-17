// pages/xwsq/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("wx.getStorageSync('schoolname')");
    console.log(wx.getStorageSync('shoolname'));
    this.setData({
      schoolname: wx.getStorageSync('shoolname')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

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
  onShareAppMessage: function() {

  },
  buka() {
    wx.navigateTo({
      url: '../xwsq/buka',
    })
  },
  qingjia() {
    wx.navigateTo({
      url: '../xwsq/qingjia',
    })
  },
  kaoqin_record() {
    wx.navigateTo({
      url: '../xwsq/kaoqin_record',
    })
  },
})