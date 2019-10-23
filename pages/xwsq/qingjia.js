// pages/xwsq/qingjia.js
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
const app = getApp();
// var startDate = year + '-' + month + '-' + day + ' ' + currentHours + ':' + currentMinute;
// var endDate = year + '-' + month + '-' + day + ' ' + currentHours + ':' + currentMinute
// var startDate = ;
// var endDate = year + '-' + month + '-' + day + ' ' + currentHours + ':' + currentMinute
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: "",
    endDate: "",
    hours: '0',
    multiArray: [
      ['今天', '明天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20]
    ],
    multiIndex: [0, 0, 0],
    array: ['病假', '事假'],
    index: 5,
    choice: false,
    choice1: false,
    choice2: true,
    choice3: false,
    choice4: true,
    start_date: "",
    end_date: "",
    inputValue: '',
    reason: '',
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    this.setData({
      reason: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.sid = wx.getStorageSync('uid');
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
  bindPickerChange: function(e) {
    this.setData({
      choice: true,
      index: e.detail.value
    })
  },
  pickerTap: function() {
    date = new Date();
    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];
    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },
  bindMultiPickerColumnChange: function(e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function(hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },
  loadHoursMinute: function(hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },
  loadMinute: function(hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },
  bindStartMultiPickerChange: function(e) {
    this.setData({
      choice1: true,
      choice2: false,
    })
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = year + "-" + month + "-" + day;
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = year + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = year + "-" + month + "-" + day;
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    var al = new Date(startDate.replace(/-/g, "/")).getTime();
    var a2 = new Date(that.data.endDate.replace(/-/g, "/")).getTime();
    var num = (a2 - al) / (1000 * 3600)/24;
    var hours = num.toFixed(1)
    if (hours < 0) {
      wx.showModal({
        title: '提醒',
        content: '开始时间不能大于结束时间',
      })
      return;
    }

    if (that.data.endDate == "" ) {
      that.setData({
        startDate: startDate,
        hours: "0",
      })
    } else{
    that.setData({
      startDate: startDate,
      hours: Math.abs(hours)
    })
    }
  },
  bindEndMultiPickerChange: function(e) {
    this.setData({
      choice3: true,
      choice4: false,
    })
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];
    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = year + "-" + month + "-" + day;
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = year + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = year + "-" + month + "-" + day;
    }

    var endDate = monthDay + " " + hours + ":" + minute;
    var al = new Date(endDate.replace(/-/g, "/")).getTime();
    var a2 = new Date(that.data.startDate.replace(/-/g, "/")).getTime();
    var num = (al - a2) / (1000 * 3600)/24;
    var hours = num.toFixed(1)
    console.log("hours");
    // console.log(hours);
    if (hours < 0) {
      wx.showModal({
        title: '提醒',
        content: '开始时间不能大于结束时间',
      })
      return;
    }
    if (that.data.startDate == "") {
      that.setData({
        endDate: endDate,
        hours: "0",
      })
    } else{
    that.setData({
      endDate: endDate,
      hours: Math.abs(hours),
    })
    }
  },


  tijiao() {
    console.log("原因");
    // console.log(this.data.reason);
    // console.log(typeof(this.data.startDate));
    var al = new Date(this.data.startDate).getTime();
    var a2 = new Date(this.data.endDate).getTime();
    console.log(a2 - al);
    if (this.data.index == 5) {
      wx.showModal({
        title: '提醒',
        content: '请输入请假类型',
      })
      return;
    } else if (a2 - al<0) {
      console.log(555);
      wx.showModal({
        title: '提醒',
        content: '结束时间不能小于开始时间',
      })
      return;
    } else if (this.data.reason == "") {
      wx.showModal({
        title: '提醒',
        content: '请输入请假原因',
      })
      return;
    }
    app.post('askLeave', {
      sid: this.data.sid,
      leave_type: 1,
      start_date: this.data.startDate,
      end_date: this.data.endDate,
      day_length: this.data.hours,
      remark: this.data.reason
    }, res => {
      if (res.data.code == 1) {
        wx.navigateTo({
          url: '../xwsq/buka_success',
        })
        wx.setNavigationBarTitle({
          title: '成功'
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