const { response } = require('express');
const { getFormattedFiles, getSecretFiles } = require('../services/files.services');


const getFiles = async (req, res = response) => {
    const files = await getFormattedFiles(req.query.fileName ?? null);
    res.json(files);
}

const getListFiles = async (req, res = response) => {
    const files = await getSecretFiles();
    res.json(files);
}


module.exports = {
    getFiles,
    getListFiles
}