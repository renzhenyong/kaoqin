// pages/index/zuce.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
name:'',
num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sid = wx.getStorageSync('uid');
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
  tijiao(){
    // wx.switchTab({
    //   url: '../index/index',
    // })
    // app.post('studentInfo', { sid: this.data.sid, name: this.data.name, num: this.data.num}, res => {
    //           if(res.data.code==1){
    //             wx.switchTab({
    //               url: '../index/index',
    //             })
    //           }

    // })

  }
})