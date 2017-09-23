//app.js
App({
  onLaunch: function() {
    var that = this;
    wx.request({
      url: 'http://www.jago.com:8090/jiayoulong/Home/Wechat/hotelSelectAll',
      success: function(res) {
        console.log(res);
      }
    })
    // 登录
    wx.login({
      success: function(res) {
        if(res.code) {
          //登录成功
          wx.request({
            url: that.globalData.webSite + '/Home/Wechat/userLogin',
            data: {
              code: res.code
            },
            success: function(res) {
              //全局添加openId seesionKey
              var data = JSON.parse(res.data);
              that.globalData.openId = data.openid;
              that.globalData.sessionKey = data.session_key;
              console.log(res);

              //全局添加userInfo
              wx.getUserInfo({
                success: function(res) {
                  that.globalData.userInfo = res.userInfo;
                }
              });
            }
          })

        }else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    webSite: 'http://hyu3181730001.my3w.com'
  }
})
