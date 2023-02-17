const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  el.lastName as employeeNumber_Value, t.* FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (customerNumber) => {
    const query = `SELECT  el.lastName as employeeNumber_Value, t.* FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  WHERE t.customerNumber=? LIMIT 0,1`;
    return getRows(query,[customerNumber]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO customers set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.customerNumber);
    }
    
}

exports.update = async (customerNumber, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE customers SET ? WHERE customerNumber= ?`;
    updateValues = updateValues.concat([customerNumber])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(customerNumber) : null;
}

exports.remove = async (customerNumber) => {
    const query = `DELETE FROM customers Where customerNumber= ? `;
    return deleteRow(query,[customerNumber]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  el.lastName as employeeNumber_Value, t.* FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  WHERE  LOWER(t.customerNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.customerName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contactLastName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contactFirstName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.phone) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine1) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine2) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.city) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.state) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.postalCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.country) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.salesRepEmployeeNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.creditLimit) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.fax) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  WHERE  LOWER(t.customerNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.customerName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contactLastName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contactFirstName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.phone) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine1) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.addressLine2) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.city) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.state) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.postalCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.country) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.salesRepEmployeeNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.creditLimit) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.fax) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getBySalesrepemployeenumber = async (offset, pageSize, salesRepEmployeeNumber) => {
    const query = `SELECT  el.lastName as employeeNumber_Value, t.* FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  WHERE t.salesRepEmployeeNumber= ? LIMIT ?, ?`;
    return getRows(query,[salesRepEmployeeNumber,offset,pageSize]);
}

exports.getBySalesrepemployeenumberCount = async (salesRepEmployeeNumber) => {
    const query = `SELECT count(*) TotalCount FROM customers t  left join employees el on t.salesRepEmployeeNumber = el.employeeNumber  WHERE t.salesRepEmployeeNumber= ?`;
    const result = await getRows(query,[salesRepEmployeeNumber]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
