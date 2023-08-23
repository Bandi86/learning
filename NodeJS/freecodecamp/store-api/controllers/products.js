import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const getAllProductsStatic = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("name").limit(10);
  res.status(200).json({ products, nbHits: products.length });
});

const getAllProducts = asyncHandler(async (req, res) => {
  // destrukuráljuk az elvárt adatot aztán vizsgáljuk és küldjük vissza
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // NUMERIC FILTER
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    //const regEx = /\b(<|>|>=|=|<|<=)\b/g
    const regEx = /(<|>|>=|=|<|<=)/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating']
    filters.filters.split(',').forEach((item => {
      const [field,operator,value] = item.split("-")
      if(options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    }))
  }

  // ha van sort keresés a query-ben akkor így végezzük el
  let result = await Product.find(queryObject);

  //SORT
  if (sort) {
    //products = products.sort();
    const sortList = sort.split(",").join("");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //FIELDS
  const fieldsList = fields.split(",").join("");
  result = result.select(fieldsList);

  //LIMIT SKIP
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
});

export { getAllProductsStatic, getAllProducts };
