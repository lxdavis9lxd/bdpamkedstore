const _ = require('lodash');
const {StatusCodes} = require('http-status-codes');
const model = require("../models/employees");
const {getPageNo, getPageSize} = require('../utils/helper');

exports.getAll = async (req, res, next) => {
	try {
		const pageNo = await getPageNo(req);
		const pageSize = await getPageSize(req);
		const offset = (pageNo - 1) * pageSize;
		const totalCount = await model.count();
		const data = await model.find(offset, pageSize);
		if (!_.isEmpty(data)) {
			const result = {
				pageNo: pageNo,
				pageSize: pageSize,
				totalCount: totalCount,
				records: data,
			};
			res.status(StatusCodes.OK).send(result);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "No record found"});
		}
	} catch (e) {
		console.log(`Error in getAll`, e);
		next(e);
	}
};

exports.getOne = async (req, res, next) => {
	try {
		const employeeNumber = req.params.employeeNumber;

		const data = await model.findOne(employeeNumber);
		if (!_.isEmpty(data)) {
			res.status(StatusCodes.OK).send(data[0]);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "No record found"});
		}
	} catch (e) {
		console.log(`Error in getById`, e);
		next(e);
	}
};

exports.create = async (req, res, next) => {
	try {
		const data = await model.insert(req.body);
		if (data) {
			res.status(StatusCodes.CREATED).send({message:'Record created', data:data});
		} else {
			res.status(StatusCodes.BAD_REQUEST).send({message : "Bad Request!"});
		}
	} catch (e) {
		console.log(`Error in create`, e);
		next(e);
	}
};

exports.update = async (req, res, next) => {
	try {
		const employeeNumber = req.params.employeeNumber;

		//const id = req.params.id;
		const data = await model.update(employeeNumber, req.body);
		if (!_.isEmpty(data)) {
			res.status(StatusCodes.OK).send(data[0]);
		} else {
			res.status(StatusCodes.BAD_REQUEST).send({message : "Bad request."});
		}
	} catch (e) {
		console.log(`Error in update`, e);
		next(e);
	}
};

exports.remove = async (req, res, next) => {
	try {
		const employeeNumber = req.params.employeeNumber;

		//const id = req.params.id;
		const data = await model.remove(employeeNumber);
		if (data) {
			res.status(StatusCodes.OK).send({message : "Resource deleted"});
		} else {
			res.status(StatusCodes.BAD_REQUEST).send({message : "Bad request."});
		}
	} catch (e) {
		console.log(`Error in remove`, e);
		next(e);
	}
};

exports.search = async (req, res, next) => {
	try {
		const pageNo = await getPageNo(req);
		const pageSize = await getPageSize(req);
		const offset = (pageNo - 1) * pageSize;
		const searchKey = req.params.searchKey;
		const totalCount = await model.searchCount(searchKey.toLowerCase());
		const data = await model.search(offset, pageSize, searchKey.toLowerCase());
		if (!_.isEmpty(data)) {
			const result = {
				pageNo: pageNo,
				pageSize: pageSize,
				totalCount: totalCount,
				records: data,
			};
			res.status(StatusCodes.OK).send(result);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "No record found"});
		}
	} catch (e) {
		console.log(`Error in search`, e);
		next(e);
	}
};


exports.getByOfficecode = async (req, res, next) => {
	try {
		const pageNo = await getPageNo(req);
		const pageSize = await getPageSize(req);
		const offset = (pageNo - 1) * pageSize;
		const officeCode = req.params.officeCode;
		const totalCount = await model.getByOfficecodeCount(officeCode);
		const data = await model.getByOfficecode(offset, pageSize, officeCode);
		if (!_.isEmpty(data)) {
			const result = {
				pageNo: pageNo,
				pageSize: pageSize,
				totalCount: totalCount,
				records: data,
			};
			res.status(StatusCodes.OK).send(result);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "Not found."});
		}
	} catch (e) {
		console.log(`Error`, e);
		next(e);
	}
};

exports.getByReportsto = async (req, res, next) => {
	try {
		const pageNo = await getPageNo(req);
		const pageSize = await getPageSize(req);
		const offset = (pageNo - 1) * pageSize;
		const reportsTo = req.params.reportsTo;
		const totalCount = await model.getByReportstoCount(reportsTo);
		const data = await model.getByReportsto(offset, pageSize, reportsTo);
		if (!_.isEmpty(data)) {
			const result = {
				pageNo: pageNo,
				pageSize: pageSize,
				totalCount: totalCount,
				records: data,
			};
			res.status(StatusCodes.OK).send(result);
		} else {
			res.status(StatusCodes.NOT_FOUND).send({message : "Not found."});
		}
	} catch (e) {
		console.log(`Error`, e);
		next(e);
	}
};

