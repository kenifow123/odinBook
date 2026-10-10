const { v2 : cloudinary } = require('cloudinary');

//uploading to cloudinary and returning the url
const getCloudinaryUrl = async (file) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({},
                (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
                })
            stream.end(file.buffer);

        })
        return result.secure_url;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getCloudinaryUrl };