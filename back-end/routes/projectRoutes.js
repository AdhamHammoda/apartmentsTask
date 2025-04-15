const express = require('express');
const router = express.Router();
const { getProjects } = require('../controllers/projectController');
router.get('/',(req,res)=> getProjects(req,res));
module.exports = router;