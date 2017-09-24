// pages/hotel/detail/index.js
var qqmapsdk;
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testHandle: '-1',
    webSite: app.globalData.webSite
  },

  //点击事件
  testClick: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var testHandle = that.data.testHandle;
    var spec = e.currentTarget.dataset.spec;
    wx.setStorage({
      key: 'spec',
      data: {
        spec: spec
      }
    });
    wx.getStorage({
      key: 'singleHotel',
      success: function(res) {
        var hotel = res.data;
        if (index == testHandle) {
          //数据绑定
          that.setData({
            hotel: hotel,
            testHandle: '-1'
          });
        }else {
          hotel.homeStyle[index].active = 'active';
          //数据绑定
          that.setData({
            hotel: hotel,
            testHandle: index
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //接收时间
    that.setData({
      date: options.date,
      nightNum: options.nightNum,
      dateEnd: options.dateEnd
    });
    //get数据，拿到酒店的数据 
    wx.getStorage({
      key: 'singleHotel',
      success: function(res) {
        var hotel = res.data;
        that.setData({
          hotel: hotel
        });
        //加载地图
        var address = hotel.address
        qqmapsdk = new QQMapWX({
          key: 'WS7BZ-NDZK4-52HUV-XTWAH-QJPP6-NBFEA',
        });
        qqmapsdk.geocoder({
          address: address,
          success: function (res) {
            that.setData({
              location: res.result.location,
            });
          }
        });
      }
    });
  },
  // 点击拨打电话
  clickPhone:function(e){
    var that=this;
    var phone = that.data.hotel.phone
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },
  //点击预定
  clickJump:function(e){
    var that = this;
    var price=e.currentTarget.dataset.price;
    var spec = e.currentTarget.dataset.spec;
    wx.getStorage({
      key: 'spec',
      success: function(res) {
        var data = res.data;
        data.member = spec;
        data.price=price;
        wx.setStorage({
          key: 'spec',
          data: data,
          success:function(res1){
            var date = that.data.date;
            var nightNum = that.data.nightNum;
            var dateEnd = that.data.dateEnd;
            if (app.globalData.loginStatus==true){
              wx.navigateTo({
                url: '/pages/hotel/order/index?date=' + date + '&nightNum=' + nightNum + '&dateEnd=' + dateEnd
              })
            }else{
              wx.navigateTo({
                url: '/pages/index/index'
              })
            }
            
          }
        });
      },
    });
  },


//点击调用地图
  clickMap: function () {
    var that = this;
    var location = that.data.location;
    qqmapsdk.calculateDistance({
      mode: 'driving',
      to: [
        {
          latitude: location.lat,
          longitude: location.lng
        }
      ],
      success: function (res) {
        var distance = res.result.elements[0].distance;
        that.setData({
          distance: distance
        });
      },
    });
    wx.getStorage({
      key: 'singleHotel',
      success: function (res) {
        var hotel = res.data;
        that.setData({
          hotel: hotel
        });
        var address = hotel.address;
        wx.openLocation({
          latitude: that.data.location.lat,
          longitude: that.data.location.lng,
          scale: 28,
          name: address
        })
      }
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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