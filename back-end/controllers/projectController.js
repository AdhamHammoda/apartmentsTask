const Project = require('../models/projectModel');

async function getProjects(req, res) {
    const projects = await Project.getProjects();
    res.json(projects);
}



module.exports = { getProjects };