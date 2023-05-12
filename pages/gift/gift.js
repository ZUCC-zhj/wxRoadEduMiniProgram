// pages/gift/gift.js
const app = getApp()
Page({
  data: {
    trafficsigntype:'',
    materialimages:"",
    predict:'',
    base64Data:"",
    tempFileURL:'',
    scoregift:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getImages()
    this.getScoregift()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getImages(){
    wx.cloud.callFunction({
      name: 'getImages'
    }).then(res =>{
        console.log('获取图片素材云函数调用成功',res)
        this.setData({
          materialimages: res.result.data
        })
        console.log(this.data)
    }).catch(res=>{
      console.log('失败',res)
    })
  },
  addImagePath(fileId) {
    console.log(fileId)
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success: res => {
        this.setData({
          tempFileURL: res.fileList[0].tempFileURL
        })
        console.log("获取url地址："+this.data.tempFileURL);
      },
      fail: console.error
    })
  },
  getScoregift(){
    wx.cloud.callFunction({
      name: 'getScoregift'
    }).then(res =>{
        console.log('获取全部积分商品云函数调用成功',res)
        this.setData({
          scoregift: res.result.data
        })
    }).catch(res=>{
      console.log('失败',res)
    })
  },
  getPredict(){
  //  this.addImagePath(this.data.materialimages[0].image);
    // wx.getFileSystemManager().readFile({
    //   filePath: "https://636c-cloud1-1ga64t1b02464356…vb3xubm466zwq0sq60b19gz57x_.png not absolute path",
    //   encoding: 'base64',
    //   success: function(res) {
    //     var base64Data = res.data;
    //     // 在此处将base64Data传递给API接口
    //     wx.request({
    //       url: "https://457bae3.r11.cpolar.top",
    //       method: 'POST',
    //       data: {
    //         image: base64Data
    //       },
    //       header: {
    //         'Content-Type': 'application/json'
    //       },
    //       success: function (res) {
    //         console.log(res.data);
    //         // 在此处处理API返回的预测结果
    //       },
    //       fail: function (res) {
    //         console.log(res);
    //         // 在此处处理API请求失败的情况
    //       }
    //     });
    //   }
    // });
    wx.request({
      url: "https://c2d9fc8.r7.cpolar.top",
      method: 'POST',
      data: {
        image: "https://636c-cloud1-1ga64t1b02464356-1316677867.tcb.qcloud.la/cloudbase-cms/upload/2023-02-27/2cnvevvb3xubm466zwq0sq60b19gz57x_.png"
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        // 在此处处理API返回的预测结果
      },
      fail: function (res) {
        console.log(res);
        // 在此处处理API请求失败的情况
      }
    });
  },
  gotoaccident(){
    wx.redirectTo({
      url: '/pages/accident/accident',
    })
  },
  gotomy(){
    wx.redirectTo({
      url: '/pages/my/my',
    })
  },
  gotoindex(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  gotogift(){
    wx.redirectTo({
      url: '/pages/gift/gift',
    })
  },
  gotoexam(){
    wx.redirectTo({
      url: '/pages/exam/exam',
    })
  },
})