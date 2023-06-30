const jwt = require('jsonwebtoken')
const verify = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('forbidden')
    try {
        req.user = jwt.verify(token, 'chuoibimatkhongthetietlo')//req.user laf nó tìm đến useser đang đăng nhập , verify xong tuyền token vs key kia là đang giải mã ra xem có giống voi user kia ko,oke thì next()
        next()
    }
    catch (e) {
        res.status(401).send('forbidden')
    }
}
module.exports = verify