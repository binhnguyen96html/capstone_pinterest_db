import { Sequelize } from "sequelize";
import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";



const model = initModels(sequelize);

//GET danh sách ảnh về
const getPic = async (req, res) => {
  let data = await model.hinh_anh.findAll();

  res.send(data);
};

//GET - Tìm kiếm danh sách ảnh theo tên
const Op = Sequelize.Op;
const getPicByName = async (req, res) => {
  let { name } = req.params;
  let data = await model.hinh_anh.findAll({
    where: {
      ten_hinh: {
        [Op.like]: `%${name}%`,
      },
    },
  });

  res.send(data);
};

//GET - thông tin ảnh và người tạo ảnh bằng id ảnh
const getPicAndUserInfo = async (req, res) => {
  try {
    let { picID } = req.params;

    let data = await model.hinh_anh.findOne({
      where: {
        hinh_id: picID,
      },
      include: [
        {
          model: model.nguoi_dung,
          as: "nguoi_dung",
        },
      ],
    });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send("ko tim thay anh");
    }
  } catch (error) {
    console.log(err);
    res.status(500).send("loi BE");
  }
};

//GET - thông tin bình luận theo id ảnh
const getComtOfPic = async (req, res) => {
  try {
    let { picID } = req.params;

    let data = await model.hinh_anh.findOne({
      where: {
        hinh_id: picID,
      },
      include: [
        {
          model: model.binh_luan,
          as: "binh_luans",
        },
      ],
    });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send("ko tim thay anh");
    }
  } catch (error) {
    console.log(err);
    res.status(500).send("loi BE");
  }
};

//TRANG QUẢN LÝ ẢNH
//DELETE - Xóa ảnh đã tạo theo id ảnh
const deletePicByPicID = async (req, res) => {
  try {
    let { picID } = req.params;

    await model.luu_anh.destroy({
      where: {
        hinh_id: picID,
      },
    });

    await model.hinh_anh.destroy({
      where: {
        hinh_id: picID,
      },
    });

    res.send("Da xoa thanh cong");
  } catch (error) {
    console.log(error);
    res.send("loi BE");
  }
};


export {
  getPic,
  getPicByName,
  getPicAndUserInfo,
  getComtOfPic,
  deletePicByPicID,
};
