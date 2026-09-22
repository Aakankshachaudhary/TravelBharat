export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      error: { code: "VALIDATION_ERROR", message: "Request validation failed", details: error.issues },
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      error: { code: "DUPLICATE_RESOURCE", message: "A resource with the same unique value already exists." },
    });
  }

  const status = error.statusCode || 500;
  return res.status(status).json({
    success: false,
    error: {
      code: error.code || "INTERNAL_SERVER_ERROR",
      message: status === 500 ? "An unexpected server error occurred." : error.message,
    },
  });
}
