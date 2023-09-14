import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";


const model = initModels(sequelize);


//POST - save pic
const savedPic = async(req,res) => {
    try {
        let {picID} = req.params;


        //Kiểm tra ảnh đã được lưu trước đó hay chưa
        let checkedData = await model.luu_anh.findOne({
            where: {
                hinh_id: picID
            }
        })

        if(checkedData){
            res.send('Ảnh đã được lưu trước đó!');
            return;
        }


        let data = await model.hinh_anh.findOne({
            where: {
                hinh_id: picID
            },
            include: [
                {
                    model: model.nguoi_dung,
                    as: 'nguoi_dung'
                }
            ]
        });

        if(data){
            await model.luu_anh.create({
                nguoi_dung_id: data.nguoi_dung_id,
                hinh_id: data.hinh_id,
                ngay_luu: new Date()
            })

            res.status(201).json({
                message: "Anh da luu thanh cong",
                data
            })
        }else{
            res.status(404).send('ko tim thay anh')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('loi BE 3')
    }
}


// GET - Thông tin đã lưu hình này chưa theo id ảnh
// (Dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save)
const getSavedPic = async(req, res) =>{
    try {
        let {picID} = req.params;

    let data = await model.luu_anh.findOne({
        where: {
            hinh_id: picID
        }
    });

    if(data){
        res.send('Ảnh đã được lưu!')
    }else{
        res.send('Ảnh chưa được lưu!')
    }
    } catch (error) {
        console.log(error);
        res.send('Loi BE')
    }
}


export {savedPic, getSavedPic};