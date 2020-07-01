const { db } = require("../../util/admin");
const {
  createTagService,
  getTagsService,
  getTagByIdService,
  editTagService,
  deleteTagService
} = require("./tag_service");

exports.createTag = async (req, res) => {
  try {
    let resp = await createTagService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getTags = async (req, res) => {
  try {
    let resp = await getTagsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getTagById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      tagId: req.params.tagId
    };
    let resp = await getTagByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editTag = async (req, res) => {
  try {
    const params = {
      ...req.body,
      tagId: req.params.tagId
    };
    let resp = await editTagService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.deleteTag = async (req, res) => {
  const params = {
    tagId: req.params.tagId
  };
  try {
    let resp = await deleteTagService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};