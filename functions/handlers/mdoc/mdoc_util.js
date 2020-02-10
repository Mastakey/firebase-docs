exports.getTagsFromStr = (tagStr) => {
    return tagStr.split(",");
}

exports.getTagStrFromArray = (tags) => {
    let tagStr = "";
    for (let i=0; i<tags.length; i++){
        tagStr += tags[i] + ",";
    }
    return tagStr;
}