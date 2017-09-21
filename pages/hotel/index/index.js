// pages/hotel/index/index.js
var data=new Date();
var app = getApp();
var qqmapsdk;
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: "true",
    nightNum: '1',
    display: false,
    searchHandle: '0',
    webSite: app.globalData.webSite
  },
// 点击修改初始时间
  bindDateChange: function (e) {
    var that = this;
    var startTime = new Date(e.detail.value).getTime();
    that.setData({
      startTime: startTime,
      date: e.detail.value
    });
  },
  // 点击修改结束时间
  bindDateChangeEnd: function (e) {
    var that = this;
    var starTime = that.data.startTime;
    var endTime = new Date(e.detail.value).getTime();
    var result = ((((endTime - starTime) / 1000) / 60) / 60) / 24;
    that.setData({
      nightNum: result,
      dateEnd: e.detail.value
    })
  },

  tabChange:function(e){
    var that=this;
    var searchHandle = that.data.searchHandle;
    var index = e.currentTarget.dataset.active;
    var listAll = [];
    var hotelList;
    // 调用腾讯区域地址
    qqmapsdk = new QQMapWX({
      key: 'WS7BZ-NDZK4-52HUV-XTWAH-QJPP6-NBFEA',
    });
    qqmapsdk.getDistrictByCityId({
      id: '530100',
      success: function(res) {
        var area = res.result[0];
        that.setData({
          area: area
        })
      }
    });
    if(searchHandle == index) {
      that.setData({
        color: '',
        display: false,
        searchStyle: '',
        searchHandle: '0'
      });
    }else {
      var display = e.currentTarget.dataset.display;
      var color = 'change' + index;
      var searchStyle = 'active' + index;
      //当前点击内容出现
      that.setData({
        color: color,
        display: true,
        searchStyle: searchStyle,
        searchHandle: index
      });
    }
    if (e.currentTarget.dataset.ok) {
      wx.getStorage({
        key: 'listHotel',
        success: function (res) {
          that.setData({
            listAll: res.data,
          })
        },
      })
    }
    wx.getStorage({
      key: 'hotelList',
      success: function(res) {
        that.setData({
          hotelList:res.data
        });
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //默认入住时间，离店时间
    var y = data.getFullYear();
    var m = data.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = data.getDate();
    var dd = d + 1;
    var ddS = dd < 10 ? ('0' + dd) : dd;
    var dS = d < 10 ? ('0' + d) : d;
    var date = y + '-' + m + '-' + dS;
    var dateEnd = y + '-' + m + '-' + ddS;
    var startTime = new Date(date).getTime();
    var endTime = new Date(dateEnd).getTime();
    this.setData({
      today: date,
      date: date,
      dateEnd: dateEnd,
      startTime: startTime,
      endTime: endTime
    });
    that.setData({
      date: options.date,
      nightNum: options.nightNum,
      dateEnd: options.dateEnd
    });
    var hotelList;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      url: app.globalData.webSite+'/Home/Wechat/hotelSelectAll',//调用接口地址
      success: function (res) {
        hotelList = res.data.data;
        that.setData({
          hotelList: hotelList
        });
        var address;
        hotelList.forEach(function(val,key){
          address=val.address
        });
        //调用腾讯地图
        qqmapsdk = new QQMapWX({
          key: 'WS7BZ-NDZK4-52HUV-XTWAH-QJPP6-NBFEA',
        });
        qqmapsdk.geocoder({
          address: address,
          success: function (res) {
            that.setData({
              location: res.result.location,
            });
            //计算距离
            var location = that.data.location;
            var distance;//距离
            qqmapsdk.calculateDistance({
              mode: 'driving',
              to: [
                {
                  latitude: location.lat,
                  longitude: location.lng
                },
              ],
              success: function (res) {
                var far = res.result.elements[0].distance/1000;
                distance = far.toFixed(2)
                that.setData({
                  distance: distance
                });  
              },
              fail: function (res) {
                that.setData({
                  distance: '超过10'
                });
              },
            });

          }
        });
        

      }
    });
  },

  // //listAreaBelong点击
  // listAreaBelongChange:function (e){
  //    var that = this;
  //    var id = e.currentTarget.dataset.id;
  //    var listAreaBelong = that.data.listAreaBelong;
  //    var listArea;
  //    //清空
  //    listAreaBelong.forEach(function (val, key) {
  //      listAreaBelong[key].active = '0';
  //    });
  //    //改变active
  //    listAreaBelong.forEach(function(val,key) {
  //       if(val.id == id) {
  //         listAreaBelong[key].active = '1';
  //         //根据id生成新listArea
  //         listArea = val.data;
  //       }
  //    });

  //    //数据绑定
  //    that.setData({
  //      listAreaBelong: listAreaBelong,
  //      listArea: listArea
  //    });
  //  },

  listAreaChange:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var area = that.data.area;
    var areas;
    var hotelList;
    area.forEach(function(val,key){
      area[key].active = '0';
    });
    area.forEach(function (val, key) {
      if (val.id == id) {
        area[key].active = '1';
      }
    });
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: { area: id},
      url: app.globalData.webSite + '/Home/Wechat/hotelSelectByArea',//调用接口地址
      success:function(res){
        hotelList=res.data.data;
        wx.setStorage({
          key: 'hotelList',
          data: hotelList,
        })
      }
    });
    that.setData({
      area: area
    });
  },

  addChange:function(e){
    var that=this;
    var singleHotel = e.currentTarget.dataset.singlehotel;
    wx.setStorage({
      key: 'singleHotel',
      data: singleHotel
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
  
  }
})