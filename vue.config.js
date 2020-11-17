module.exports={
    devServer:{
        port: 3001,
        proxy: {
            '/api':{
                // target: 'http://121.196.8.19:9090',
                target: 'http://localhost:3000',
                // pathRewrite: {
                //     '^/api':'' //如果本身的路径中有api则无需此设置
                // }
            },
        }
    }
}

// module.exports = {
// 	publicPath: './',
// 	devServer: {
		
// 	}
// };