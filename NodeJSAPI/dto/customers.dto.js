module.exports = {
    
"customerNumber" : { required: true, type: "number"},
"customerName" : { required: true, type: "string"},
"contactLastName" : { required: true, type: "string"},
"contactFirstName" : { required: true, type: "string"},
"phone" : { required: true, type: "string"},
"addressLine1" : { required: true, type: "string"},
"addressLine2" : { required: false, type: "string"},
"city" : { required: true, type: "string"},
"state" : { required: false, type: "string"},
"postalCode" : { required: false, type: "string"},
"country" : { required: true, type: "string"},
"salesRepEmployeeNumber" : { required: false, type: "number"},
"creditLimit" : { required: false, type: "number"},
"email" : { required: false, type: "string"},
"fax" : { required: false, type: "string"},
};

// allowed types - number, string, boolean, object, undefined
