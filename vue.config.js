module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/frontend-cursos-online/'
        : '/frontend-cursos-online-dev/',
    // devServer: {
    //     proxy: 'http://localhost/wscursosonline'
    // }
}