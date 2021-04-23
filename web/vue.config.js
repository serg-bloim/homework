const path = require('path');
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: "/homework",
    devServer:{
        contentBase: path.join(__dirname, '../data')
    }
}