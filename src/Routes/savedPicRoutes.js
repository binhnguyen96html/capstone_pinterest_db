import express from 'express';
import { getSavedPic, savedPic } from '../Controllers/savedPicController.js';
import { checkToken } from "../Config/jwtConfig.js";


const savedPicRoutes = express.Router();


//POST - save pic
savedPicRoutes.post('/save-pic-by-picid/:picID', checkToken, savedPic);


//TRANG CHI TIẾT
//GET - Thông tin đã lưu hình này chưa theo id ảnh
//(Dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
savedPicRoutes.get('/check-pic-saved/:picID', checkToken, getSavedPic)



export default savedPicRoutes;