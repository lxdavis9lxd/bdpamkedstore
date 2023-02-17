const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM productlines t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (productLine) => {
    const query = `SELECT  t.* FROM productlines t  WHERE t.productLine=? LIMIT 0,1`;
    return getRows(query,[productLine]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO productlines set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.productLine);
    }
    
}

exports.update = async (productLine, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE productlines SET ? WHERE productLine= ?`;
    updateValues = updateValues.concat([productLine])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(productLine) : null;
}

exports.remove = async (productLine) => {
    const query = `DELETE FROM productlines Where productLine= ? `;
    return deleteRow(query,[productLine]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM productlines t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM productlines t  WHERE  LOWER(t.productLine) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.textDescription) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.htmlDescription) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.image) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM productlines t  WHERE  LOWER(t.productLine) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.textDescription) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.htmlDescription) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.image) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


