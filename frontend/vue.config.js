module.exports = {
    transpileDependencies: ["vuetify"],
    outputDir: '../src/main/resources/static',
    devServer: {
        public: 'localhost:9999',
        host: 'localhost',
        port: 9999,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    }
};