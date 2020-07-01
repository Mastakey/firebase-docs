const axios = require("axios");

let apiUrl =
  "https://us-central1-docs-4834c.cloudfunctions.net/api";

let login = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    return headers;
  } catch (err) {
    console.error(err);
  }
  return "";
};

let createTag = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    let tagRes = await axios.post(
      apiUrl + "/tag",
      {
        name: "new Tag 1",
        description: "just a new tag",
        status: "status value",
    docs: "docs value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(tagRes.status);
    console.log(tagRes.statusText);
    console.log(tagRes.data);
    return tagRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getTags = async function(headers) {
  try {
    let tagRes = await axios.get(apiUrl + "/tag", { headers: headers });
    console.log(tagRes.status);
    console.log(tagRes.statusText);
    console.log(tagRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getTagById = async function(headers, id) {
  try {
    let tagRes = await axios.get(apiUrl + "/tag/" + id, {
      headers: headers
    });
    console.log(tagRes.status);
    console.log(tagRes.statusText);
    console.log(tagRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editTag = async function(headers, id) {
  try {
    let tagRes = await axios.put(
      apiUrl + "/tag/" + id,
      {
        name: "new Tag 2",
        description: "just a new tag edited",
        status: "status value",
    docs: "docs value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(tagRes.status);
    console.log(tagRes.statusText);
    console.log(tagRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteTag = async function(headers, id) {
  try {
    let tagRes = await axios.delete(apiUrl + "/tag/" + id, {
      headers: headers
    });
    console.log(tagRes.status);
    console.log(tagRes.statusText);
    console.log(tagRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Tag Run");
  let id = await createTag(headers);
  console.log("Get Tags Run");
  await getTags(headers);
  console.log("Get Tag by Id Run");
  await getTagById(headers, id);
  console.log("Edit Tag Run");
  await editTag(headers, id);
  console.log("Delete Tag Run");
  await deleteTag(headers, id);
};

run();