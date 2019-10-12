// pages/xwsq/buka.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['本人'],
    index: 0,
    choice1: false,
    buka_date:'',
    reason:''
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
    var that = this;
    app.hasLogin();
    this.data.sid = wx.getStorageSync('uid');
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
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindbukaDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      choice1: true,
      buka_date: e.detail.value
    })
  },
  bindWordLimit: function (e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value,
    })
  },
  // takephoto(){
  //   var that = this
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['camera'],
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths
  //       wx.uploadFile({
  //         url: app.globalData.api + 'uploadImg',  //仅为示例，非真实的接口地址
  //         filePath: tempFilePaths[0],
  //         name: 'image',
  //         formData: {
  //           sid: that.data.sid
  //         },
  //         success(res) {
  //           var imgres = JSON.parse(res.data);
  //           wx.request({
  //             url: 'https://banpai.chxgk.com/api/Sushe/huoti',
  //             data: {
  //               sid: that.data.sid,
  //               applyren: that.data.index,
  //               bukadate: that.data.buka_date,
  //               reason: that.data.reason,
  //               pic1: imgres.data,
  //             },
  //             method: "POST",
  //             success: res => {
  //               that.setData({
  //                 // modalHidden: false,
  //                 // score: res.data.Score
  //               })
  //             }
  //           })

  //         }
  //       })

  //     }
  //   })
  // },

  tijiao(){
    let that = this
    app.post('askFill', { sid: this.data.sid, remark: that.data.reason, date: that.data.buka_date }, res => {
if(res.data,code==1){
  wx.navigateTo({
    url: '../xwsq/buka_success',
  })
}else{
  wx.navigateTo({
    url: '../xwsq/buka',
  })
}
    })
  
  }
})