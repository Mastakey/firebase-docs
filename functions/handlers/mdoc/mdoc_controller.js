const { db } = require("../../util/admin");
const {
  createMdocService,
  getMdocsService,
  getMdocsServiceByFolder,
  getMdocByIdService,
  editMdocService,
  deleteMdocService,
  getMocsLimitService,
  getMdocsByTagService
} = require("./mdoc_service");

exports.createMdoc = async (req, res) => {
  try {
    let resp = await createMdocService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getMdocs = async (req, res) => {
  try {
    let resp = await getMdocsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getMdocsByFolder = async (req, res) => {
  try {
    const params = {
      ...req.body,
      folderId: req.params.folderId
    };
    let resp = await getMdocsServiceByFolder(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getMdocById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      mdocId: req.params.mdocId
    };
    let resp = await getMdocByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editMdoc = async (req, res) => {
  try {
    const params = {
      ...req.body,
      mdocId: req.params.mdocId
    };
    let resp = await editMdocService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteMdoc = async (req, res) => {
  const params = {
    mdocId: req.params.mdocId
  };
  try {
    let resp = await deleteMdocService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getMdocsLimit = async (req, res) => {
  try {
    const params = {
      ...req.body,
      limit: req.params.limit
    };
    let resp = await getMocsLimitService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getMdocsByTag = async (req, res) => {
  try {
    const params = {
      ...req.body,
      tag: req.params.tag
    };
    let resp = await getMdocsByTagService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
