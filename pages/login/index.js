// pages/me/phone_update/index.js
var winWidth = 0;
var winHeight = 0;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3,
    className: 'model',
    on: 'on1',
    phone:''

  },
  //输入手机号触发事件
  mobileInput: function (e) {
    var that = this;
    var phone;  
    var length;
    that.setData({
      phone: e.detail.value,
      length: e.detail.cursor
    });
  },
  //点击获取验证码
  prove:function(){
    var that = this;
    var prompt;
    if(that.data.length == 11){
      that.setData({
        prompt:''
      })
    }else{
      that.setData({
        prompt: '手机号位数不对,无法获取验证码'
      })
    }
  },
  //点击注册
  confirm: function (e) {
    var that = this;
    var name = app.globalData.userInfo.nickName;
    var open_id = app.globalData.openId;
    var phone = that.data.phone;//接收电话号码
    var prompt = that.data.prompt;
    if (prompt == 11) {
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Wechat/userAdd',//调用接口地址
        data: {
          name: name,
          open_id: open_id,
          phone: phone
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            className: 'model1',
            on: 'on'
          });
          var num = that.data.second;
          var timer = setInterval(function () {
            num--;
            that.setData({
              second: num
            });
            if (num == 0) {
              clearInterval(timer);
              wx.reLaunch({
                url: '/pages/hotel/detail/index',
              })
            }
          }, 1000);
        }
      });
    }else{
      that.setData({
        prompt: '手机号位数不对,无法注册'
      })
    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        winHeight = res.windowHeight;
        winWidth = res.windowWidth;
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

  }
})