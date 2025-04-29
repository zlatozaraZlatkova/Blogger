function errorParser(err) {
 
  const errorResponse = {
    message: "",
    statusCode: 500,
  };

  if (err.name === "Error") {
    errorResponse.message = err.message;
    errorResponse.statusCode = 400;  
    return errorResponse;
  }

  if (Array.isArray(err)) {
    errorResponse.message = err.map((e) => e.msg).join(", ");
    errorResponse.statusCode = 400;
    return errorResponse;
  }

  if (err.name === "ValidationError") {
    errorResponse.message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    errorResponse.statusCode = 400;
    return errorResponse;
  }

  if (err.kind === "ObjectId") {
    errorResponse.message = "Resource not found";
    errorResponse.statusCode = 404;
    return errorResponse;
  }

  if (err.code === 11000) {
    errorResponse.message = "Duplicate field value entered";
    errorResponse.statusCode = 409;
    return errorResponse;
  }

  if (err.name === "ReferenceError") {
    errorResponse.message = "You have no permission to access this resource";
    errorResponse.statusCode = 403;
    return errorResponse;
  }

  if(err.name = "BSON field") {
    errorResponse.message = "Invalid data format";
    errorResponse.statusCode = 400;
    return errorResponse;

  }


  errorResponse.message = "Internal Server Error";
  return errorResponse;
}

module.exports = {
  errorParser,
};
