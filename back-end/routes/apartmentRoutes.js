const express = require('express');
const router = express.Router();
const { listApartments, createApartment,getApartmentDetails,getApartmentsCount } = require('../controllers/apartmentController');
router.get('/',(req,res)=> listApartments(req,res));
router.get('/count',(req,res)=> getApartmentsCount(req,res));
router.get('/:id',(req,res)=> getApartmentDetails(req,res));
router.post('/',(req,res)=> createApartment(req,res));
module.exports = router;