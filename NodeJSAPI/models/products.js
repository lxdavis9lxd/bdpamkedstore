const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  pl.textDescription as productLine_Value, t.* FROM products t  join productlines pl on t.productLine = pl.productLine  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (productCode) => {
    const query = `SELECT  pl.textDescription as productLine_Value, t.* FROM products t  join productlines pl on t.productLine = pl.productLine  WHERE t.productCode=? LIMIT 0,1`;
    return getRows(query,[productCode]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO products set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.productCode);
    }
    
}

exports.update = async (productCode, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE products SET ? WHERE productCode= ?`;
    updateValues = updateValues.concat([productCode])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(productCode) : null;
}

exports.remove = async (productCode) => {
    const query = `DELETE FROM products Where productCode= ? `;
    return deleteRow(query,[productCode]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM products t  join productlines pl on t.productLine = pl.productLine  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  pl.textDescription as productLine_Value, t.* FROM products t  join productlines pl on t.productLine = pl.productLine  WHERE  LOWER(t.productCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productLine) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productScale) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productVendor) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productDescription) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.quantityInStock) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.buyPrice) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.MSRP) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM products t  join productlines pl on t.productLine = pl.productLine  WHERE  LOWER(t.productCode) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productName) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productLine) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productScale) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productVendor) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.productDescription) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.quantityInStock) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.buyPrice) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.MSRP) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByProductline = async (offset, pageSize, productLine) => {
    const query = `SELECT  pl.textDescription as productLine_Value, t.* FROM products t  join productlines pl on t.productLine = pl.productLine  WHERE t.productLine= ? LIMIT ?, ?`;
    return getRows(query,[productLine,offset,pageSize]);
}

exports.getByProductlineCount = async (productLine) => {
    const query = `SELECT count(*) TotalCount FROM products t  join productlines pl on t.productLine = pl.productLine  WHERE t.productLine= ?`;
    const result = await getRows(query,[productLine]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
