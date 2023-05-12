// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

exports.main = async (event, context) => {
  const result = await cloud.uploadFile({
    cloudPath: 'example.png',
    fileContent: Buffer.from(event.fileContent, 'base64')
  })
  const fileId = result.fileID
  await cloud.database().collection('images').add({
    data: {
      fileId: fileId
    }
  })
  return fileId
}