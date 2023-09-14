import express from "express";
import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import { getPic, 
  getPicByName, 
  getPicAndUserInfo,
  getComtOfPic, 
  deletePicByPicID,
} from "../Controllers/picControllers.js";
import { checkToken } from "../Config/jwtConfig.js";


const model = initModels(sequelize);

const picRoutes = express.Router();

//Trang chủ
//GET - danh sách ảnh về
picRoutes.get('/get-all-pic',checkToken, getPic);

//GET - Tìm kiếm danh sách ảnh theo tên
picRoutes.get('/get-pic-by-name/:name',checkToken, getPicByName)


//Trang chi tiết
//GET - thông tin ảnh và người tạo ảnh bằng id ảnh
picRoutes.get('/get-pic-and-user-info/:picID',checkToken, getPicAndUserInfo)

//GET - thông tin bình luận theo id ảnh
picRoutes.get('/get-comt-of-pic/:picID',checkToken, getComtOfPic);

//GET - Thông tin đã lưu hình này chưa theo id ảnh
//(Dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
// picRoutes.post('/get-saved-pic-by-picID/:picID', getSavedPic);

//TRANG QUẢN LÝ ẢNH
//DELETE - Xóa ảnh đã tạo theo id ảnh
picRoutes.delete('/delete-pic-by-picid/:picID',checkToken, deletePicByPicID);


//TRANG THÊM ẢNH
// POST - thêm một ảnh của user
import multer from "multer";

const storage = multer.diskStorage({
  destination: process.cwd() + "/public/img",
  filename: (req, file, callback) => {
    let data = new Date();
    let newName = data.getTime();
    callback(null, newName + "_" + file.originalname);
  },
});

const upload = multer({ storage });

// import fs from "fs";
// import hinh_anh from "../Models/hinh_anh.js";

picRoutes.post("/upload", upload.single("file"), async (req, res) => {
  // let file = req.file;
  // let { ten_hinh, mo_ta, nguoi_dung_id } = req.body;

  // fs.readFile(process.cwd() + "/public/img/" + file.filename, (err, data) => {
  //   //bam anh
  //   fileBase = `data:${file.mimetype};base64,${Buffer.from(data).toString(
  //     "base64"
  //   )}`;
  // });

  //   //luu vao CSDL
  try {
    let file = req.file;
    let { ten_hinh, mo_ta, nguoi_dung_id } = req.body;

    await model.hinh_anh.create({
      ten_hinh,
      mo_ta,
      nguoi_dung_id,
      duong_dan: file.filename,
    });

    res.send("Đã upload ảnh thành công");
  } catch (error) {
    console.log(error);
    res.send("loi");
  }


});

export default picRoutes;
