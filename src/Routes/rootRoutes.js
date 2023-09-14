import express from 'express';
import userRoutes from './userRoutes.js';
import picRoutes from './picRoutes.js';
import comtRoutes from './comtRoutes.js';
import savedPicRoutes from './savedPicRoutes.js';


const rootRoutes = express.Router();


//user
rootRoutes.use('/user', userRoutes);

//pic
rootRoutes.use('/pic', picRoutes)

//comt
rootRoutes.use('/comt', comtRoutes);


//savedPic
rootRoutes.use('/savedpic', savedPicRoutes);

export default rootRoutes;