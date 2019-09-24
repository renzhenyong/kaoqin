// pages/xwsq/qingjia.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['事假', '休假', '婚假', '病假'],
    index:5,
    choice:false,
    choice1: false,
    choice2: false,
    start_date: "",
    end_date:"",
    inputValue: '',
    reason:'', 
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value,
    })
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
  bindPickerChange: function (e) {
    this.setData({
      choice:true,
      index: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      choice1: true,
      start_date: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      choice2: true,
      end_date: e.detail.value
    })
  },
  tijiao(){
    // console.log(this.data.index);
    // console.log(this.data.start_date);
    // console.log(this.data.end_date);
    // console.log(this.data.inputValue);
    console.log(this.data.reason);
    if (this.data.index==5){
      wx.showModal({
        title: '提醒',
        content: '请输入请假类型',
      })
     return;
       }
    app.post('askleave', { sid: this.data.sid, leave_type: 1, start_date: this.data.start_date, end_date: this.data.end_date, day_length: this.data.inputValue, remark: this.data.reason},  res => {
    //     console.log(res);
        if (res.data.code == 0) {
          wx.navigateTo({
            url: '../xwsq/buka_success',
          })
        } else {
          wx.showModal({
            title: '提醒',
            content: '未找到数据',
          })
        }
       });
    
  }
})