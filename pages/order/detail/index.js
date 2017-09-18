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
            imgUrl: "/img/detail1.jpg",
            imgText:'您的房间已预订成功，期待您的入住'
          });
        }
        if (val.status == '1') {
          val.status = '已完成';
          that.setData({
            imgUrl: "/img/detail2.jpg",
            imgText: '感谢您光临嘉优隆精品酒店，期待您的下次入住'
          });
        }
        if (val.status == '2') {
          val.status = '退款中';
          that.setData({
            imgUrl: "/img/detail3.jpg",
            imgText: '您的房间退款正在办理中，请您耐心等待'
          });
        }
        if (val.status == '3') {
          val.status = '已退款';
          that.setData({
            imgUrl: "/img/detail4.jpg",
            imgText: '您的房间已退款成功，期待您的下次入住'
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