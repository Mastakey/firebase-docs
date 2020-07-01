const { db } = require("../../util/admin");
const {
  createFolderService,
  getFoldersService,
  getFoldersServiceByParent,
  getFolderByIdService,
  editFolderService,
  deleteFolderService
} = require("./folder_service");

exports.createFolder = async (req, res) => {
  try {
    let resp = await createFolderService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getFolders = async (req, res) => {
  try {
    let resp = await getFoldersService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getFoldersByParent = async (req, res) => {
  try {
    const params = {
      ...req.body,
      folderId: req.params.folderId
    };
    let resp = await getFoldersServiceByParent(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getFolderById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      folderId: req.params.folderId
    };
    let resp = await getFolderByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editFolder = async (req, res) => {
  try {
    const params = {
      ...req.body,
      folderId: req.params.folderId
    };
    let resp = await editFolderService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteFolder = async (req, res) => {
  const params = {
    folderId: req.params.folderId
  };
  try {
    let resp = await deleteFolderService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
