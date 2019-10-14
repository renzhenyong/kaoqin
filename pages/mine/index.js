//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dept_name:'',
    name:'',
    phone:'',
    school_name:'',
    build:'',
    room:'',
    face_img:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.data.sid = wx.getStorageSync('uid');
    app.post('studentInfo', { sid: this.data.sid}, res => {
           if(res.data.code==1){
             this.setData({
               dept_name: res.data.data.dept_name,
               face_img: res.data.data.face_img,
               name: res.data.data.name,
               phone: res.data.data.phone,
               school_name: res.data.data.school_name,
               build: res.data.data.build,
               room: res.data.data.room,
             })
           }
    })
  },

  getdetail:function(){
    wx.navigateTo({
      url: '../mine/detail'
    })
  },
  qingjia(){
    wx.navigateTo({
      url: '../mine/qingjiaDetail'
    })
  },
  jilu(){
    wx.navigateTo({
      url: '../mine/qingjia'
    })
  }
})
