// pages/gift/gift.js
const app = getApp()
Page({
  data: {
    trafficsigntype:'',
    materialimages:'',
    predict:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getImages()
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
  getPredict(){
    let data = {
      
    }
    wx.request({
      url: 'https://450789dd.r1.cpolar.top', //仅为示例，并非真实的接口地址
      method: 'POST',
    data: this.data.materialimages[0],
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log('访问成功')
      console.log(res.data)
    }
    })
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