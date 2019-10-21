//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    dept_name: '',
    name: '',
    phone: '',
    school_name: '',
    build: '',
    room: '',
    face_img: '',
    fill: [],
    leave: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.data.sid = wx.getStorageSync('uid');
    app.post('studentInfo', {
      sid: this.data.sid
    }, res => {
      if (res.data.code == 1) {
        this.setData({
          dept_name: res.data.data.dept_name,
          face_img: res.data.data.face_img,
          name: res.data.data.name,
          phone: res.data.data.phone,
          school_name: res.data.data.school_name,
          build: res.data.data.build,
          room: res.data.data.room,
        })
        wx.setStorageSync("faceimg", res.data.data.face_img);
      }
    })
    app.post('approveLast', {
      sid: this.data.sid
    }, res => {
      if (res.data.code == 1) {
        this.setData({
          fill: res.data.data.fill,
          leave: res.data.data.leave,
        //    fill: [],
        //  leave: [],
        })
        console.log("00");
        console.log(this.data.fill.length);
      }
    })
  },
  getdetail: function() {
    wx.navigateTo({
      url: '../mine/detail'
    })
  },
  qingjia(e) {
    wx.navigateTo({
      url: '../mine/qingjiaDetail?id=' + e.currentTarget.dataset.id
    })
  },
  buka(e) {
    wx.navigateTo({
      url: '../mine/bukaDetail?id=' + e.currentTarget.dataset.id
    })
  },
  jilu() {
    wx.navigateTo({
      url: '../mine/qingjia'
    })
  }
})