import express from "express";
import { createComt } from "../Controllers/comtControllers.js";
import { checkToken } from "../Config/jwtConfig.js";


const comtRoutes = express.Router();

//POST - Để lưu thông tin bình luận của người dùng với hình ảnh
comtRoutes.post('/create-comt', checkToken, createComt);


export default comtRoutes;