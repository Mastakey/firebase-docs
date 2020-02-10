const { db } = require("../../util/admin");
const {
  createContentService,
  getContentsService,
  getContentByIdService,
  editContentService,
  deleteContentService
} = require("./content_service");

exports.createContent = async (req, res) => {
  try {
    let resp = await createContentService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getContents = async (req, res) => {
  try {
    let resp = await getContentsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getContentById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      contentId: req.params.contentId
    };
    let resp = await getContentByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editContent = async (req, res) => {
  try {
    const params = {
      ...req.body,
      contentId: req.params.contentId
    };
    let resp = await editContentService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteContent = async (req, res) => {
  const params = {
    contentId: req.params.contentId
  };
  try {
    let resp = await deleteContentService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};