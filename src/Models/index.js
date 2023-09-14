

//ket noi csdl

import { Sequelize } from 'sequelize';

const sequelize = 
new Sequelize("pinterest_db", "root", "1234", {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql"
})

export default sequelize;