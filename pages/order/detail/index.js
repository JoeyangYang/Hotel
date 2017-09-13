// pages/order/detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
   imgUrl: "/img/detail1.jpg",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that=this;
   wx.getStorage({
     key: 'hotelList',
     success: function(res) {
       var signHotel=[];
       var hotel=res.data.data;
    hotel.forEach(function(val,key){
      
      if(val.id==options.id){
        if (val.status == '0') {
          val.status = '待入住';
          that.setData({
            imgUrl: "/img/detail1.jpg"
          });
        }
        if (val.status == '1') {
          val.status = '已完成';
          that.setData({
            imgUrl: "/img/detail2.jpg"
          });
        }
        if (val.status == '2') {
          val.status = '退款中';
          that.setData({
            imgUrl: "/img/detail3.jpg"
          });
        }
        if (val.status == '3') {
          val.status = '已退款';
          that.setData({
            imgUrl: "/img/detail4.jpg"
          });
        }
        signHotel.push(val);
        that.setData({
          hotel: signHotel
        });
      }
    });
     },
   })

    // wx.request({
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: 'POST',
    //   url: app.globalData.webSite + '/Home/Wechat/orderSelectById',
    //   data: {
    //     id: options.id,
    //   },
    //   success: function (res) {
    //     var data = res.data;
    //     if(data.code=="200"){
    //       data.data.forEach(function (val, key) {
    //         if (val.status == '0') {
    //           data.data[key].status = '待入住';
    //           that.setData({
    //             imgUrl: "/img/detail1.jpg",
    //           });
    //         }
    //         if (val.status == '1') {
    //           data.data[key].status = '已完成';
    //           that.setData({
    //             imgUrl: "/img/detail2.jpg",
    //           });
    //         }
    //         if (val.status == '2') {
    //           data.data[key].status = '退款中';
    //           that.setData({
    //             imgUrl: "/img/detail3.jpg",
    //           });
    //         }
    //         if (val.status == '3') {
    //           data.data[key].status = '已退款';
    //           that.setData({
    //             imgUrl: "/img/detail4.jpg",
    //           });
    //         }
    //       });
    //        that.setData({
    //          hotel:data.data
    //        });

    //     }
        
    //   }
    // });
  

    
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