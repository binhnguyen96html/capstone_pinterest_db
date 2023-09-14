import jwt from 'jsonwebtoken'


const verifyToken = (token) =>{
    return jwt.verify(token, 'BINH')
}

const decodeToken = (token) => {
    return jwt.decode(token);
}


const checkToken = (req, res, next) => {
    try {
        let {token} = req.headers;

        //kiem tra token hop le
        if(verifyToken(token)){
            //hop le
            next();
        }
    } catch (error) {
        //ko hop le
        res.status(403).send('Không có quyền truy cập!');
    }
}

const createToken = (data) => {
    return jwt.sign({data}, "BINH", {expiresIn: "5m"})
};





export {checkToken, createToken};
