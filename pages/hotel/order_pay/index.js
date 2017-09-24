// pages/hotel/order_pay/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var price;
    // that.setData({
    //   result: options.result
    // });
    wx.getStorage({
      key: 'orderList',
      success: function (res) {
        that.setData({
          price: res.data.price
        })
      }
    })
  },

  switchTab:function(e){
    var that = this;
    wx.getStorage({
      key: 'orderList',
      success: function(res) {
        var  now_score= res.data.now_score;
        wx.getStorage({
          key: 'spec',
          success: function (spec) {
            console.log('-----------------------------');
            console.log(spec);
            //生成order_number
            var order_number = '';
            for (var i = 0; i < 32; i++) {
              order_number += parseInt(Math.random() * 10)
            };
            //生成detail
            var member=spec.data.member;
            var price=spec.data.price;
            var spec=spec.data.spec;
            var detail = member + ',' + spec;
            wx.request({
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              url: app.globalData.webSite + '/Home/Wechat/orderAdd',
              method: 'POST',
              data: {
                order_number: order_number,     //订单号
                hotel_id: res.data.hotel_id,    //酒店id
                hotel_name: res.data.hotel_name,//酒店名称
                hotel_phone: res.data.hotel_phone,   //酒店电话
                theme: res.data.theme,        //酒店房间类型
                address: res.data.address,      //酒店地址
                check_in: res.data.check_in,    //入住时间
                check_out: res.data.check_out,  //离宿时间
                detail: detail,                 //酒店详情
                cost_price: res.data.cost_price,//酒店原价格
                price: res.data.price,          //酒店实际价格
                used_score: res.data.used_score,//会员积分
                now_score: now_score,  //剩余积分
                status: 0,                      //状态
                user_name: res.data.user_name,  //入住人姓名
                user_phone: res.data.user_phone,//入住人电话  
              },
              success: function (res) {
                var code = res.data.code;
                if(code==200){
                  app.globalData.userInfo.score = now_score;
                   wx.switchTab({
                    url: '/pages/me/index/index'
                  });
                }
              }
            })
          }
        });
      }
    });
  },

  clickChecked:function(){
    var that=this;
    var checked;
    if(checked==false){
      that.setData({
        active:''
      });
    }else{
      that.setData({
        active: 'active'
      });
    }
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