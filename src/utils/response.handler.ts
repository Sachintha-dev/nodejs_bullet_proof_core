class ResponseHandler {
  static failed(
    errorCode: string,
    statusCode: number = 400,
    errorMessage?: string
  ) {
    return {
      success: false,
      errorCode,
      errorMessage: errorMessage || "An error occurred",
      statusCode,
    };
  }

  static success(message: string, metadata?: Record<string, any>) {
    return {
      success: true,
      message,
      ...(metadata && { metadata }), // Optionally include metadata if provided
    };
  }

  static successWithPayload(
    message: string,
    data: any,
    metadata?: Record<string, any>
  ) {
    return {
      success: true,
      message,
      data,
      ...(metadata && { metadata }), // Optionally include metadata if provided
    };
  }
}

export default ResponseHandler;
