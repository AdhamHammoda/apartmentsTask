const express = require('express');
const cors = require('cors')
const db = require('./config/db');
const apartmentRoutes = require('./routes/apartmentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const initProcess = require('./initDB/init'); 
const app = express();
const PORT = 5000;
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    }));  
app.use(express.json());
app.use('/apartments', apartmentRoutes);
app.use('/projects', projectRoutes);


async function startServer() {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}


async function init() {
    try {
        await initProcess.createTables();
        await initProcess.insertSampleProjectsData();
        await initProcess.insertSampleApartmentsData();
      console.log("Initialization done");
    } catch (err) {
      console.error("Initialization failed:", err);
    }
}
init();
startServer();