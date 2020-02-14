const express = require('express');
const server = express();

server.use(express.json());

function countRequest(req, res, next){
    console.count("Número de requisições")

    return next();
}

server.use(countRequest)

function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if(!project){
        res.status(400).send({error: "Project not found "})
    }
    return next();
}


const projects = [];

server.get('/projects', (req,res) => {
    return res.json(projects);
})

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.status(201).json(project); 
});

server.put('/projects/:id', checkProjectExists, (req,res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.status(200).json(project)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const project = projects.find(p => p.id == id)

    projects.splice(project, 1)

    return res.status(200)
});

server.post('/projects/:id/tasks', checkProjectExists, (req,res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id)

    project.tasks.push(title)

    return res.status(200).json(project)
});

server.listen(3000)