// pages/xwsq/kaoqin_record.js
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    demo4_days_style: [],
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    console.log("days_count");
    console.log(this.data.day);

    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
      if (i == this.data.day) {

        demo4_days_style.push({
          month: 'current', day: i, color: '#3F88FB', background: 'white'
        });
    
      } else if (i == 1 || i == 2 || i == 4 || i == 3 || i == 5 || i == 6 || i == 24) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: 'green'
        });
      } else if (i == 12 || i == 23 || i == 24) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: 'green'
        });
      } else if (i == 21 || i == 22) {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white', background: '#eb4986'
        });
      } else {
        demo4_days_style.push({
          month: 'current', day: i, color: 'white'
        });
      }
    }
    this.setData({
      demo4_days_style
    });
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
  record_detail(){
    wx.navigateTo({
      url: '../xwsq/record_detail',
    })
  }
})