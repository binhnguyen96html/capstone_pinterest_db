// import { Sequelize } from "sequelize";
import { createToken } from "../Config/jwtConfig.js";
import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import bcrypt from 'bcrypt';

//const Op = Sequelize.Op;

const model = initModels(sequelize);


//  SIGN UP
const signUp = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

    let checkEmail = await model.nguoi_dung.findAll({
      where: {
        email,
      },
    });

    if (checkEmail.length > 0) {
      res.send("Email da ton tai");
      return;
    }

    let newData = { 
        email, 
        mat_khau: bcrypt.hashSync(mat_khau, 10), 
        ho_ten, 
        tuoi,
        anh_dai_dien
      };

    await model.nguoi_dung.create(newData);

    res.send("Them moi thanh cong!");
  } catch (error) {
    console.log(error);
    res.status(500).send("loi BE");
  }
};





//LOG IN
const login = async (req, res) => {
    try {
        let {email, mat_khau} = req.body;
        
        //kiem tra su ton tai cua user
        let checkEmail = await model.nguoi_dung.findOne({
            where: {
                email
            }
        })

        if(checkEmail){
            //neu ton tai => login thanh cong
            //check pass 
            let checkPass = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);

            if(checkPass == true){
                let token = createToken(checkEmail);

                res.status(200).send(token);
            }else{
                res.status(400).send('Mat khau ko dung')
            }
        }else{
            res.status(400).send('Email ko dung');
        }
    } catch (error) {
        res.status(500).send('Loi BE');
    }
}



//CHINH SUA THONG TIN USER
const updateUser = async(req, res) => {
    let {id} = req.params;
    let {mat_khau, ho_ten, tuoi, anh_dai_dien} = req.body;

    await model.nguoi_dung.update({mat_khau, ho_ten, tuoi, anh_dai_dien}, {
        where: {nguoi_dung_id: id}
    });

    res.send('Cap nhat thanh cong')
}



//TRANG QUẢN LÝ ẢNH
//GET - Thông tin user
const getuser = async(req, res) => {
  
  let data = await model.nguoi_dung.findAll();

  if(data.length > 0){
    res.send(data);
  }else{
    res.status(404).send('ko tim thay thong tin nguoi dung')
  }
  
}

//GET - Danh sách ảnh đã lưu theo user id
const getSavedPicByUserId = async(req,res) =>{
  try {
    let {userID} = req.params;

    let data = await model.luu_anh.findAll({
      where:{
        nguoi_dung_id: userID
      }
    })

    if(data.length > 0){
      res.send(data);
    }else{
      res.send('Người dùng này chưa lưu ảnh nào!')
    }

  } catch (error) {
    console.log(error);
    res.send('loi BE')
  }
}



//GET - Danh sách ảnh đã tạo theo user id
const getPicByUserId = async(req,res) =>{
  let {userID} = req.params;

  let data = await model.hinh_anh.findAll({
    where: {
      nguoi_dung_id: userID
    }
  });

  if(data.length > 0){
    res.send(data);
  }else{
    res.status(404).send('ko tim thay anh theo UserID')
  }
}


export { 
  signUp, 
  login, 
  updateUser, 
  getuser,
  getSavedPicByUserId,
  getPicByUserId
};
