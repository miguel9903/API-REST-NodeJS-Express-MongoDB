const fs = require('fs');
const Project = require('../models/project');

const controller = {

    home: (req, res) => {
        res.status(200).send('Home');
    },

    getProjects: (req, res) => {
        Project.find()
               .sort({ created_at : -1 })
               .then(projects => {
                    if(projects.length === 0) {
                        res.status(404).json({ message: 'No projects found' });
                    } else {
                        res.status(200).json(projects);   
                    }
               })
               .catch(err => {
                    res.status(500).json({
                        message: "Projects could not be obtained",
                        error: err
                    });
               });
    },

    getProject: (req, res) => {
        const projectID = req.params.id;
        Project.findById(projectID)
               .then(project => {
                    if(!project) {
                        res.status(404).json({ message: 'Project does not exist' });
                    } else {
                        res.status(200).json(project);
                    }
               })
               .catch(err => {
                    res.status(500).json({
                        message: "Project could not be obtained",
                        error: err
                    });
               });
    },

    saveProject: (req, res) => {
        const project = new Project(req.body);
        project.save()
               .then(project => {
                    res.status(200).json(project);
               })
               .catch(err => {
                   res.status(500).json({
                       message: "Project could not be created",
                       error: err
                   });
               });
    },

    updateProject: (req, res) => {
        const projectID = req.params.id;
        const updatedProject = req.body;
        Project.findByIdAndUpdate(projectID, updatedProject, { new: true })
               .then(project => {
                    res.status(200).json(project);
               })
               .catch(err => {
                    res.status(500).json({
                        message: "Project could not be updated",
                        error: err
                    });
               });
    },

    deleteProject: (req, res) => {
        const projectID = req.params.id;
        Project.findByIdAndDelete(projectID)
               .then(project => {
                   if(!project) {
                       res.status(404).json({ message: 'Project does not exist' });
                   } else {
                        res.status(200).json(project);
                   }
               })
               .catch(err => {
                    res.status(500).json({
                        message: "Project could not be deleted",
                        error: err
                    });
               });
    },

    uploadImage: (req, res) => {
        const projectID = req.params.id;
        let fileName = 'Image not uploaded';
        if(req.files) {
            fileName = req.files.image.path.split('\\')[1];
            const fileExtension = fileName.split('.')[1];
            if(fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
                Project.findByIdAndUpdate(projectID, { image: fileName }, { new: true })
                        .then(project => {
                            if(!project) {
                                res.status(404).json({ message: 'Project does not exist' });
                            } else {
                                res.status(200).json(project);
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: "Project image could not be updated",
                                error: err
                            });
                        });
            } else {
                fs.unlink(req.files.image.path, (err) => {
                    if(err) console.log(err)
                    else {
                        res.status(500).json({
                            message: "The file extension is not valid",
                        }); 
                    }
                });
            }
        } else {
            res.status(500).json({
                message: fileName
            });
        }
    }
};

module.exports = controller;