// pages/me/score/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  //事件触发
  touchStart: function(e) {
    console.log(e);
    var that = this;
    var id = e.currentTarget.dataset.id;
    var scoreList = that.data.scoreList;
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
    scoreList.forEach(function(val,key){
          if(id == val.id){
            scoreList[key].active='active';
          }
    });

    //数据绑定
    that.setData({
      scoreList: scoreList
    });
  },
  touchMove: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var txtStyle = "";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.id;
      var scoreList = this.data.scoreL;
      scoreList[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  touchEnd: function() {
    var that = this;
    var scoreList = that.data.scoreList;
    //console.log(this);
    scoreList.forEach(function (val, key) {
      
        scoreList[key].active = '';
      
    });
    //数据绑定
    that.setData({
      scoreList: scoreList
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var scoreList = [
      {
        id: '1',
        name: '汉庭酒店万达店',
        date: '2017-8-9',
        score: '258'
      },
      {
        id: '2',
        name: '汉庭酒店万达店2222222',
        date: '2017-8-12',
        score: '300'
      },
      {
        id: '3',
        name: '汉庭酒店万达店3333333',
        date: '2017-9-29',
        score: '199'
      },
      {
        id: '4',
        name: '汉庭酒店万达店444444444',
        date: '2017-8-3',
        score: '400'
      },
      {
        id: '5',
        name: '汉庭酒店万达店5555555',
        date: '2017-8-5',
        score: '4500'
      },
      {
        id: '6',
        name: '汉庭酒店万达店66666',
        date: '2017-8-6',
        score: '600'
      },
      {
        id: '7',
        name: '汉庭酒店万达店77777',
        date: '2017-8-7',
        score: '700'
      },
      {
        id: '8',
        name: '汉庭酒店万达店888888',
        date: '2017-8-8',
        score: '800'
      }
    ];
    
    that.setData({
      scoreList: scoreList
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