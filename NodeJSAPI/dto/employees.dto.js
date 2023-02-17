module.exports = {
    
"employeeNumber" : { required: true, type: "number"},
"lastName" : { required: true, type: "string"},
"firstName" : { required: true, type: "string"},
"extension" : { required: true, type: "string"},
"email" : { required: true, type: "string"},
"officeCode" : { required: true, type: "string"},
"reportsTo" : { required: false, type: "number"},
"jobTitle" : { required: true, type: "string"},
"phone" : { required: true, type: "string"},
};

// allowed types - number, string, boolean, object, undefined
