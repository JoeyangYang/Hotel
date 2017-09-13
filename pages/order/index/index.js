// pages/order/index/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    on: 'on0',
    animation:'animation0',
    show:'show'
  },
  //事件处理
  orderNavClick: function(e) {
    var that = this;
    //获取导航index值(1开始)
    var index = e.currentTarget.dataset.active;   
    var on = 'on' + index;
    var animation='animation'+index;
    that.setData({
      on: on,
      animation: animation
    });
    
    //当前订单请求
    wx.getStorage({
      key: 'hotelList',
      success: function(res) {
        var hotelList = res.data.data;
        var newArr = hotelList;
        if(index > '0') {
          newArr = [];
          hotelList.forEach(function (val, key) {
            if (val.status == index - 1) {
              newArr.push(val);
            }
          });
        }
        hotelList = newArr;

        //翻译
        hotelList.forEach(function (val, key) {
          if (val.status == "0") {
            hotelList[key].status = '待入住';
            that.setData({
              show: 'show',
            });
          }
          if (val.status == "1") {
            hotelList[key].status = '已完成';
            that.setData({
              show: 'show',
            });
          }
          if (val.status == "2") {
            hotelList[key].status = '退款中';
            that.setData({
              show:'show'+1,
            });
          }
          if (val.status == "3") {
            hotelList[key].status = '已退款';
            that.setData({
              show: 'show' + 1,
            });
          }

        });
        
        //数据绑定
        that.setData({
          hotelList: hotelList
        });
   },
 })
    //调整状态status
    //index -= 1;
    
    // if(index < 0) {
    //   //全部订单信息
    //   wx.getStorage({
    //     key: 'hotelList',
    //     success: function (res) {
    //       var hotelList = res.data.data;
    //       hotelList.forEach(function (val, key) {
    //         if (val.status == "0") {
    //           hotelList[key].status = '待入住';
    //         }
    //         if (val.status == "1") {
    //           hotelList[key].status = '已完成';
    //         }
    //         if (val.status == "2") {
    //           hotelList[key].status = '退款中';
    //         }
    //         if (val.status == "3") {
    //           hotelList[key].status = '已退款';
    //         }

    //       });
    //       that.setData({
    //         hotelList: hotelList
    //       });

    //     },
    //   })
    // }
      // wx.request({
      //   url: app.globalData.webSite + '/Home/Wechat/orderSelect',
      //   success: function (res) {
      //     var data = res.data;
      //     //订单状态翻译
      //     if (data.code == '200') {
      //       data.data.forEach(function (val, key) {
      //         if (val.status == '0') {
      //           data.data[key].status = '待入住';
      //         }
      //         if (val.status == '1') {
      //           data.data[key].status = '已完成';
      //         }
      //         if (val.status == '2') {
      //           data.data[key].status = '退款中';
      //         }
      //         if (val.status == '3') {
      //           data.data[key].status = '已退款';
      //         }
      //       });
            
      //       //set数据
      //       that.setData({
      //         hotelList: data.data
      //       });
           
      //     }
      //   }
      // });
    // }else {
    //   wx.request({
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: 'POST',
    //     url: app.globalData.webSite + '/Home/Wechat/orderSelectByStatus',
    //     data: {
    //       status: index
    //     },
    //     success: function (res) {
    //       var data = res.data;
    //       //订单状态翻译
    //       if (data.code == '200') {
    //         data.data.forEach(function (val, key) {
    //           if (val.status == '0') {
    //             data.data[key].status = '待入住';
    //           }
    //           if (val.status == '1') {
    //             data.data[key].status = '已完成';
    //           }
    //           if (val.status == '2') {
    //             data.data[key].status = '退款中';
    //           }
    //           if (val.status == '3') {
    //             data.data[key].status = '已退款';
    //           }
    //         });
    //         //set数据
    //         that.setData({
    //           hotelList: data.data
    //         });
           
    //       }
    //     }
    //   });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderList = { "code": "200", "status": "success", "data": [{ "id": "7", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e972222222", "address": "\u6606\u660e\u6c49\u5ead\u9152\u5e9722222\u5730\u5740", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "1\u95f4 \u6807\u51c6\u5927\u5e8a\u623f \u542b\u65e9\u70b9", "price": "2400", "status": "2", "user_name": "", "user_phone": "" }, { "id": "6", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e971111111", "address": "\u6606\u660e\u6c49\u5ead\u9152\u5e9711111\u5730\u5740", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "2\u95f4 \u6807\u51c6\u5927\u5e8a\u623f", "price": "2400", "status": "1", "user_name": "", "user_phone": "" }, { "id": "5", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e97", "address": "\u6606\u660e\u6c49\u5ead\u9152\u5e97\u5730\u5740\u4fe1\u606f", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "1\u95f4 \u603b\u7edf\u5957\u623f \u542b\u65e9\u70b9", "price": "2400", "status": "0", "user_name": "", "user_phone": "" }, { "id": "8", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e973333333", "address": "\u6606\u660e\u6c49\u5ead\u9152\u5e9733333\u5730\u5740\u4fe1\u606f", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "1\u95f4 \u6807\u51c6\u5927\u5e8a\u623f \u542b\u65e9\u70b9", "price": "2400", "status": "3", "user_name": "", "user_phone": "" }, { "id": "9", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e9733333333333", "address": "\u6606\u660e\u6c49\u5ead\u9152\u5e97333333333333\u5730\u5740\u4fe1\u606f", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "1\u95f4 \u6807\u51c6\u5927\u5e8a\u623f \u542b\u65e9\u70b9", "price": "2400", "status": "3", "user_name": "", "user_phone": "" }, { "id": "10", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e97111", "address": "\u6606\u660e\u6c49\u5ead\u9152\u5e97111\u5730\u5740\u4fe1\u606f", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "3\u95f4 \u6807\u51c6\u5927\u5e8a\u623f \u542b\u65e9\u70b9", "price": "2400", "status": "1", "user_name": "", "user_phone": "" }, { "id": "11", "hotel_id": "0", "order_number": "4264897659819", "hotel_name": "\u6c49\u5ead\u9152\u5e97", "address": "\u6606\u660e\u706b\u8f66\u7ad9", "check_in": "2017-5-8", "check_out": "2017-8-5", "detail": "1\u95f4 \u6807\u51c6\u5927\u5e8a\u623f", "price": "2400", "status": "0", "user_name": "", "user_phone": "" }, { "id": "12", "hotel_id": "0", "order_number": "asldfjut16498dsf49sdg74sdg", "hotel_name": "\u6c49\u5ead\u9152\u5e97\u6d4b\u8bd5\u540d", "address": "\u6606\u660e\u706b\u8f66\u7ad9", "check_in": "2015-5-8", "check_out": "2016-8-9", "detail": "1\u95f4 \u6807\u51c6\u5927\u5e8a\u623f \u542b\u65e9\u70b9", "price": "190000", "status": "0", "user_name": "yejian", "user_phone": "18164626080" }, { "id": "13", "hotel_id": "0", "order_number": "asldfjut16498dsf49sdg74sdg", "hotel_name": "\u6c49\u5ead\u9152\u5e97\u6d4b\u8bd5\u540d", "address": "\u6606\u660e\u706b\u8f66\u7ad9", "check_in": "2015-5-8", "check_out": "2016-8-9", "detail": "1\u95f4 \u6807\u51c6\u5546\u52a1\u623f \u542b\u65e9\u70b9", "price": "190000", "status": "0", "user_name": "yejian", "user_phone": "18164626080" }] };
    
  wx.setStorage({
    key: 'hotelList',
    data: orderList,
  });

   if (options.status == 0 || !options.status){
      wx.getStorage({
        key: 'hotelList',
        success: function (res) {
          var hotelList = res.data.data;
          hotelList.forEach(function (val, key) {
            if (val.status == "0") {
              hotelList[key].status = '待入住';
            }
            if (val.status == "1") {
              hotelList[key].status = '已完成';
            }
            if (val.status == "2") {
              hotelList[key].status = '退款中';
            }
            if (val.status == "3") {
              hotelList[key].status = '已退款';
            }

          });
          that.setData({
            hotelList: hotelList
          });

        },
      });
    }else {
      wx.getStorage({
        key: 'hotelList',
        success: function(res) {
          var hotelList = res.data.data;
          var status = options.status;
          var newArr = [];
          status--;

          hotelList.forEach(function(val,key) {
            if(val.status == status){
              newArr.push(val);
            }
          });

          hotelList = newArr;
          hotelList.forEach(function(val,key) {
            if (val.status == "0") {
              hotelList[key].status = '待入住';
            }
            if (val.status == "1") {
              hotelList[key].status = '已完成';
            }
            if (val.status == "2") {
              hotelList[key].status = '退款中';
            }
            if (val.status == "3") {
              hotelList[key].status = '已退款';
            }
          });

          // var on = 'on' + index;
          // var animation = 'animation' + index;
          // that.setData({
          //   on: on,
          //   animation: animation
          // });


          status++;
          that.setData({
            hotelList: hotelList,
            on: 'on'+ status,
            animation: 'animation' + status
          });
        }
      })
    }
  
















   
    // if (options.status == 0 || !options.status){
    //   //全部订单请求
    //   wx.request({
    //     url: app.globalData.webSite + '/Home/Wechat/orderSelect',
    //     success: function (res) {
    //       var data = res.data;
    //       //订单状态翻译
    //       if (data.code == '200') {
    //         data.data.forEach(function (val, key) {
    //           if (val.status == '0') {
    //             data.data[key].status = '待入住';
    //           }
    //           if (val.status == '1') {
    //             data.data[key].status = '已完成';
    //           }
    //           if (val.status == '2') {
    //             data.data[key].status = '退款中';
    //           }
    //           if (val.status == '3') {
    //             data.data[key].status = '已退款';
    //           }
    //         });
    //         //set数据
    //         that.setData({
    //           hotelList: data.data
    //         });
    //       }
    //     }
    //   });
    // }else{
    //   var index = options.status;
    //   index;
    //   var on = 'on' + index;
    //   var animation = 'animation' + index;
    //   that.setData({
    //     on: on,
    //     animation:animation,
    //   });
    //   wx.request({
    //     header: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: 'POST',
    //     url: app.globalData.webSite + '/Home/Wechat/orderSelectByStatus',
    //     data: {
    //       status: --index
    //     },
    //     success: function (res) {
    //       var data = res.data;
    //       //订单状态翻译
    //       if (data.code == '200') {
    //         data.data.forEach(function (val, key) {
    //           if (val.status == '0') {
    //             data.data[key].status = '待入住';
    //           }
    //           if (val.status == '1') {
    //             data.data[key].status = '已完成';
    //           }
    //           if (val.status == '2') {
    //             data.data[key].status = '退款中';
    //           }
    //           if (val.status == '3') {
    //             data.data[key].status = '已退款';
    //           }
    //         });
    //         //set数据
    //         that.setData({
    //           hotelList: data.data
    //         });
    //       }
    //     }
    //   });
    // }

    
    
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