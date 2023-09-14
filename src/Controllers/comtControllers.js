import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";

const model = initModels(sequelize);


//POST - Để lưu thông tin bình luận của người dùng với hình ảnh
const createComt = async(req,res) =>{
    try {
        let { nguoi_dung_id, 
            hinh_id, 
            noi_dung} = req.body;

        let newData = {
            nguoi_dung_id,
            hinh_id,
            ngay_binh_luan: new Date(),
            noi_dung
        }

        await model.binh_luan.create(newData)
    
        res.send('Them moi binh luan')

    } catch (error) {
        console.log(error);
        res.status(500).send('loi BE')
    }   
}


export {createComt} 