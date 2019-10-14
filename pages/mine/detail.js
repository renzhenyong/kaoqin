// pages/mine/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: '',
    name: '',
    face_img: '',
    floor:'',
    bed:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.data.sid = wx.getStorageSync('uid');
    app.post('studentInfo', { sid: this.data.sid }, res => {
      if (res.data.code == 1) {
        this.setData({
          number: res.data.data.number,
          face_img: res.data.data.face_img,
          name: res.data.data.name,
          floor: res.data.data.floor,
          bed: res.data.data.bed,
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
  logout: function (e) {
    wx.clearStorageSync();
    wx.redirectTo({
      url: '../login/index'
    })
  },
})