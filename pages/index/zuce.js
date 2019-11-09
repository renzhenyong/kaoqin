// pages/index/zuce.js
const app = getApp()
Page({

      /**
       * 页面的初始数据
       */
      data: {
        name: '',
        num: '',
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        this.data.sid = wx.getStorageSync('uid');
        this.data.nickName = wx.getStorageSync('nickName')
        this.data.avatarUrl = wx.getStorageSync('avatarUrl')
        this.data.gender = wx.getStorageSync('gender')
        this.data.country = wx.getStorageSync('country')
        this.data.province = wx.getStorageSync('province')
        this.data.city = wx.getStorageSync('city')
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
      bindKeyInput: function(e) {
        this.setData({
          name: e.detail.value
        })
      },
      bindKeyInput1: function(e) {
        this.setData({
          num: e.detail.value
        })
      },
      tijiao() {
     if(this.data.name==''){
       wx.showModal({
         title: '提示',
         content: '姓名不能为空',
       })
       return;
     } else if (this.data.name == ''){
       wx.showModal({
         title: '提示',
         content: '学号不能为空',
       })
       return;
     }
        app.post('bindInfo', {
            sid: this.data.sid,
            name: this.data.name,
            number: this.data.num,
          nickName: this.data.nickName,
          avatarUrl: this.data.avatarUrl,
          gender: this.data.gender,
          country: this.data.country,
          province: this.data.province,
          city: this.data.city,
          }, res => {
            if (res.data.code == 1) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                });
                wx.switchTab({
                  url: '../index/index',
                })
              } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
              })
              }
            })

        }
      })