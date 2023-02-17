const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  ce.customerName as customerNumber_Value, t.* FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (orderNumber) => {
    const query = `SELECT  ce.customerName as customerNumber_Value, t.* FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  WHERE t.orderNumber=? LIMIT 0,1`;
    return getRows(query,[orderNumber]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO orders set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.orderNumber);
    }
    
}

exports.update = async (orderNumber, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE orders SET ? WHERE orderNumber= ?`;
    updateValues = updateValues.concat([orderNumber])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(orderNumber) : null;
}

exports.remove = async (orderNumber) => {
    const query = `DELETE FROM orders Where orderNumber= ? `;
    return deleteRow(query,[orderNumber]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  ce.customerName as customerNumber_Value, t.* FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  WHERE  LOWER(t.orderNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.orderDate) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.requiredDate) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.shippedDate) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.status) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.comments) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.customerNumber) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  WHERE  LOWER(t.orderNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.orderDate) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.requiredDate) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.shippedDate) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.status) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.comments) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.customerNumber) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByCustomernumber = async (offset, pageSize, customerNumber) => {
    const query = `SELECT  ce.customerName as customerNumber_Value, t.* FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  WHERE t.customerNumber= ? LIMIT ?, ?`;
    return getRows(query,[customerNumber,offset,pageSize]);
}

exports.getByCustomernumberCount = async (customerNumber) => {
    const query = `SELECT count(*) TotalCount FROM orders t  join customers ce on t.customerNumber = ce.customerNumber  WHERE t.customerNumber= ?`;
    const result = await getRows(query,[customerNumber]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
