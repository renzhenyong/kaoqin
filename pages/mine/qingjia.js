// pages/mine/qingjia.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveheight:'',
    currentData:0,
    leaveinfo:[],
    fillinfo:[],
    leavearr: ["病假", "事假"],
    fillarr: ["","未打卡"],
    verfystatu: ["正在审批中","已通过","未通过"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sid = wx.getStorageSync('uid');
    app.post('leaveRecord', { sid: this.data.sid }, res => {
      if(res.data.code==1){

             this.setData({
               leaveinfo:res.data.data,
               leaveheight: (res.data.data.length) * 150
             })
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
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
      if(e.target.dataset.current==1){
        app.post('fillRecord', { sid: that.data.sid }, res => {
          if (res.data.code == 1) {
            this.setData({
              fillinfo: res.data.data,
              leaveheight: (res.data.data.length) * 150
            })
          }
        })
      }else{
        app.post('leaveRecord', { sid: that.data.sid }, res => {
          if (res.data.code == 1) {
            this.setData({
              leaveinfo: res.data.data,
              leaveheight: (res.data.data.length) * 150
            })
          }
        })
      }
    }
  },
  
  qingjiadetail(e){
    wx.navigateTo({
      url: '../mine/qingjiaDetail?id=' + e.currentTarget.dataset.id 
    })
  },
  bukadetail(e) {
    wx.navigateTo({
      url: '../mine/bukaDetail?id=' + e.currentTarget.dataset.id
    })
  },
})