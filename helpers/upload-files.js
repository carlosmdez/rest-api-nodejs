const path = require('path')
const { v4: uuid } = require('uuid')

const allowList = ['png', 'jpg', 'jpeg', 'gif']

const uploadHandler = (files, allowExt = allowList, folderName = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files
    const nameArr = file.name.split('.')
    const fileExt = nameArr[nameArr.length - 1]

    // Validate the extension
    if (!allowExt.includes(fileExt)) {
      const message = `Files with ${fileExt} extension are not allowed. Extensions allowed: ${allowExt}.`
      return reject(message)
    }

    const fileName = `${uuid()}.${fileExt}`
    const uploadPath = path.join(__dirname, '../uploads/', folderName, fileName)

    file.mv(uploadPath, err => {
      console.log(err)
      if (err) {
        return reject(err)
      }
      resolve(fileName)
    })
  })
}

module.exports = {
  uploadHandler,
}
