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

let createContent = async function() {
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
    let contentRes = await axios.post(
      apiUrl + "/content",
      {
        name: "new Content 1",
        description: "just a new content",
        mdocId: "mdocId value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(contentRes.status);
    console.log(contentRes.statusText);
    console.log(contentRes.data);
    return contentRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getContents = async function(headers) {
  try {
    let contentRes = await axios.get(apiUrl + "/content", { headers: headers });
    console.log(contentRes.status);
    console.log(contentRes.statusText);
    console.log(contentRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getContentById = async function(headers, id) {
  try {
    let contentRes = await axios.get(apiUrl + "/content/" + id, {
      headers: headers
    });
    console.log(contentRes.status);
    console.log(contentRes.statusText);
    console.log(contentRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editContent = async function(headers, id) {
  try {
    let contentRes = await axios.put(
      apiUrl + "/content/" + id,
      {
        name: "new Content 2",
        description: "just a new content edited",
        mdocId: "mdocId value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(contentRes.status);
    console.log(contentRes.statusText);
    console.log(contentRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteContent = async function(headers, id) {
  try {
    let contentRes = await axios.delete(apiUrl + "/content/" + id, {
      headers: headers
    });
    console.log(contentRes.status);
    console.log(contentRes.statusText);
    console.log(contentRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Content Run");
  let id = await createContent(headers);
  console.log("Get Contents Run");
  await getContents(headers);
  console.log("Get Content by Id Run");
  await getContentById(headers, id);
  console.log("Edit Content Run");
  await editContent(headers, id);
  console.log("Delete Content Run");
  await deleteContent(headers, id);
};

run();