const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM offices t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (officeCode) => {
    const query = `SELECT  t.* FROM offices t  WHERE t.officeCode=? LIMIT 0,1`;
    return getRows(query,[officeCode]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO offices set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.officeCode);
    }
    
}

exports.update = async (officeCode, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE offices SET ? WHERE officeCode= ?`;
    updateValues = updateValues.concat([officeCode])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(officeCode) : null;
}

exports.remove = async (officeCode) => {
    const query = `DELETE FROM offices Where officeCode= ? `;
    return deleteRow(query,[officeCode]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM offices t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM offices t  WHERE  LOWER(t.officeCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.city) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.phone) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine1) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine2) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.state) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.country) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.postalCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.territory) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM offices t  WHERE  LOWER(t.officeCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.city) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.phone) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine1) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine2) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.state) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.country) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.postalCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.territory) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


