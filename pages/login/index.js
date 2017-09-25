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
    phone:'',
    seconds:"30",//时间
    showBtn:"codes",
    showBtn1:'none'
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
  //输入验证码触发事件，获取input框的值
  getValidation:function(e){
    var that = this;
    console.log(e);
    that.setData({
      check: e.detail.value
    });
  },
  //点击获取验证码
  prove:function(){
    var that = this;
    var prompt;
    var phone = that.data.phone;
    if(that.data.length == 11){
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: app.globalData.webSite + '/Home/Admin/sendPhoneMessage',
        data:{
          send_model:'sign_up',
          phone:phone
        },
        method: 'POST',
        success: function(res){
          that.setData({
            randomNum: res.data.randomNum
          });
        }
      });
      that.setData({
        prompt:'',
        showBtn:"none",
        showBtn1:"codes"
      });
      //重新获取验证码定时器
      var num = that.data.seconds;
      var timer = setInterval(function (){
        num--;
        that.setData({
          second: num
        });
        if (num == 0) {
          clearInterval(timer);
          that.setData({
            showBtn: "codes",
            showBtn1: "none"
          });
        }
      }, 1000);
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
    var prompt;
    var length = that.data.length;
    if (length == 11) {
      if (that.data.randomNum == that.data.check){
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
            if (res.data.code == '200') {
              //更新globalData
              app.globalData.loginStatus = true;
              app.globalData.userInfo.phone = res.data.data.phone;
              app.globalData.userInfo.score = res.data.data.score;
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
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }, 1000);
            } else {
              that.setData({
                prompt: '注册失败'
              })
            }
          }
        });
      }else{
        that.setData({
          prompt:'验证码有误,请重新输入'
        })
      }
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