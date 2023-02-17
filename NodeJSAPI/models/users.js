const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM users t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (Username) => {
    const query = `SELECT  t.* FROM users t  WHERE t.Username=? LIMIT 0,1`;
    return getRows(query,[Username]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO users set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.Username);
    }
    
}

exports.update = async (Username, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE users SET ? WHERE Username= ?`;
    updateValues = updateValues.concat([Username])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(Username) : null;
}

exports.remove = async (Username) => {
    const query = `DELETE FROM users Where Username= ? `;
    return deleteRow(query,[Username]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM users t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM users t  WHERE  LOWER(t.id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.Username) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.password) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.role) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.employeeNumber) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM users t  WHERE  LOWER(t.id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.Username) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.password) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.role) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.employeeNumber) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


