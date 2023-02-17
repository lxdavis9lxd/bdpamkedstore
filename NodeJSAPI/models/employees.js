const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  oi.city as officeCode_Value, ee.lastName as employeeNumber_Value, t.* FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (employeeNumber) => {
    const query = `SELECT  oi.city as officeCode_Value, ee.lastName as employeeNumber_Value, t.* FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE t.employeeNumber=? LIMIT 0,1`;
    return getRows(query,[employeeNumber]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO employees set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.employeeNumber);
    }
    
}

exports.update = async (employeeNumber, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE employees SET ? WHERE employeeNumber= ?`;
    updateValues = updateValues.concat([employeeNumber])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(employeeNumber) : null;
}

exports.remove = async (employeeNumber) => {
    const query = `DELETE FROM employees Where employeeNumber= ? `;
    return deleteRow(query,[employeeNumber]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  oi.city as officeCode_Value, ee.lastName as employeeNumber_Value, t.* FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE  LOWER(t.employeeNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.lastName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.firstName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.extension) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.officeCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.reportsTo) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.jobTitle) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.phone) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE  LOWER(t.employeeNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.lastName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.firstName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.extension) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.officeCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.reportsTo) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.jobTitle) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.phone) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByOfficecode = async (offset, pageSize, officeCode) => {
    const query = `SELECT  oi.city as officeCode_Value, ee.lastName as employeeNumber_Value, t.* FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE t.officeCode= ? LIMIT ?, ?`;
    return getRows(query,[officeCode,offset,pageSize]);
}

exports.getByOfficecodeCount = async (officeCode) => {
    const query = `SELECT count(*) TotalCount FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE t.officeCode= ?`;
    const result = await getRows(query,[officeCode]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
exports.getByReportsto = async (offset, pageSize, reportsTo) => {
    const query = `SELECT  oi.city as officeCode_Value, ee.lastName as employeeNumber_Value, t.* FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE t.reportsTo= ? LIMIT ?, ?`;
    return getRows(query,[reportsTo,offset,pageSize]);
}

exports.getByReportstoCount = async (reportsTo) => {
    const query = `SELECT count(*) TotalCount FROM employees t  join offices oi on t.officeCode = oi.officeCode  left join employees ee on t.reportsTo = ee.employeeNumber  WHERE t.reportsTo= ?`;
    const result = await getRows(query,[reportsTo]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
