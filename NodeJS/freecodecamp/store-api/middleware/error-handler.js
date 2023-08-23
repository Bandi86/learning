import { CustomAPIError } from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({msg: err.message});
  } 
  return res.status(500).json({ msg: "Somthing went wrong, please try again"});
};

export default errorHandler