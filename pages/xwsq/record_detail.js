// pages/xwsq/record_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "37.49794",
    longitude: "121.26757",
    scale: 16,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.clickdate);
    this.setData({
      clickdate:options.clickdate
    })
    this.data.sid = wx.getStorageSync('uid');
    app.post('signRecord', { sid: this.data.sid, sign_date: options.clickdate}, res => {
      if (res.data.code == 1) {
      }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  // options接受传过来的参数
  onUnload: function (options) {
 
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
  bukasq(){
    console.log(this.data.clickdate);
    wx.navigateTo({
      url: '../xwsq/buka?clickdate=' + this.data.clickdate
    })
  }

})