const express = require('express');
const router = express.Router();

const qrService = require('../services/qr.services');
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const Table = require('../models/table.models');


router.get(
    '/table/:id',
    authMiddleware,
    authorize('admin'),
    async(req,res)=>{

        try{

            const qr = await qrService.generateTableQR(req.params.id);

            res.json({
                qrCode: qr
            });

        }catch(error){

            res.status(500).json({
                message:error.message
            });

        }

    }
);


module.exports = router;