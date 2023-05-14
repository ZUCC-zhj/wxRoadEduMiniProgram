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
    var base64 = wx.getFileSystemManager().readFileSync("https://636c-cloud1-1ga64t1b02464356-1316677867.tcb.qcloud.la/cloudbase-cms/upload/2023-02-27/2cnvevvb3xubm466zwq0sq60b19gz57x_.png", "base64");
    wx.request({
      url: "https://7d61f1ba.r9.cpolar.top/predict/Trafficsign-Predict",
      method: 'POST',
      data: {
        image: base64
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