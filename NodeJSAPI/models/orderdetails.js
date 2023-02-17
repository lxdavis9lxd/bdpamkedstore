const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  od.status as orderNumber_Value, pp.productName as productCode_Value, t.* FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (orderNumber,productCode) => {
    const query = `SELECT  od.status as orderNumber_Value, pp.productName as productCode_Value, t.* FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE t.orderNumber=? AND t.productCode=? LIMIT 0,1`;
    return getRows(query,[orderNumber,productCode]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO orderdetails set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.orderNumber,productCode);
    }
    
}

exports.update = async (orderNumber,productCode, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE orderdetails SET ? WHERE orderNumber= ${orderNumber} AND productCode= ${productCode}`;
    updateValues = updateValues.concat([orderNumber,productCode])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(orderNumber,productCode) : null;
}

exports.remove = async (orderNumber,productCode) => {
    const query = `DELETE FROM orderdetails Where orderNumber=? AND productCode=?`;
    return deleteRow(query,[orderNumber,productCode]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  od.status as orderNumber_Value, pp.productName as productCode_Value, t.* FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE  LOWER(t.orderNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.quantityOrdered) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.priceEach) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.orderLineNumber) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE  LOWER(t.orderNumber) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.quantityOrdered) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.priceEach) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.orderLineNumber) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByOrdernumber = async (offset, pageSize, orderNumber) => {
    const query = `SELECT  od.status as orderNumber_Value, pp.productName as productCode_Value, t.* FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE t.orderNumber= ? LIMIT ?, ?`;
    return getRows(query,[orderNumber,offset,pageSize]);
}

exports.getByOrdernumberCount = async (orderNumber) => {
    const query = `SELECT count(*) TotalCount FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE t.orderNumber= ?`;
    const result = await getRows(query,[orderNumber]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
exports.getByProductcode = async (offset, pageSize, productCode) => {
    const query = `SELECT  od.status as orderNumber_Value, pp.productName as productCode_Value, t.* FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE t.productCode= ? LIMIT ?, ?`;
    return getRows(query,[productCode,offset,pageSize]);
}

exports.getByProductcodeCount = async (productCode) => {
    const query = `SELECT count(*) TotalCount FROM orderdetails t  join orders od on t.orderNumber = od.orderNumber  join products pp on t.productCode = pp.productCode  WHERE t.productCode= ?`;
    const result = await getRows(query,[productCode]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
