import express from 'express';
import {
    getPicByUserId,
    getSavedPicByUserId,
    getuser,
    login,
    signUp,
    updateUser
} from '../Controllers/userControllers.js'

import { checkToken } from '../Config/jwtConfig.js';


const userRoutes = express.Router();



// Tạo các API để thao tác dữ liệu tương ứng các trang phía dưới
//POST trang đăng ký
userRoutes.post('/sign-up', signUp);
//POST trang đăng nhập
userRoutes.post('/login', login)


//TRANG QUẢN LÝ ẢNH
//GET - Thông tin user
userRoutes.get('/get-user', checkToken, getuser)

//GET - Danh sách ảnh đã lưu theo user id
userRoutes.get('/get-saved-pic-by-userid/:userID',checkToken, getSavedPicByUserId);

//GET - Danh sách ảnh đã tạo theo user id
userRoutes.get('/get-pic-by-userid/:userID',checkToken, getPicByUserId)


//TRANG: Chinh sửa thong tin cá nhân
//PUT thông tin cá nhân của user
userRoutes.put('/update-user/:id', checkToken, updateUser);

export default userRoutes;