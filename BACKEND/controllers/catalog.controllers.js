const db = require("../models/index.js");
const Products = db.products;
const Op = db.Sequelize.Op;

exports.get = async (req, res) => {
	const filtername = req.query.name;
	const filterpricemin = req.query.pricemin;
	const filterpricemax = req.query.pricemax;

	let condition = {};
	if (filtername) {
		condition.name = { [Op.like]: `%${filtername}%` };
	}
	if (filterpricemin) {
		condition.price = { ...condition.price, [Op.gte]: filterpricemin };
	}
	if (filterpricemax) {
		condition.price = { ...condition.price, [Op.lte]: filterpricemax };
	}

	try {
		const products = await Products.findAll({ where: condition });
		res.setHeader('Content-Type', 'application/json');
		res.send(products);
	} catch (error) {
		res.status(500).send({
			message: error.message || "Some error occurred while retrieving products."
		});
	}
};
