import httpStatus from "http-status";
import ErrorResponse from "./errorResponse.util";

class NotFoundHandler {
  static handle(req: any, res: any, next: any) {
    next(
      new ErrorResponse(
        "Requested Resource Not Found",
        httpStatus.NOT_FOUND,
        "RESOURCE_NOT_FOUND"
      )
    );
  }
}

export default NotFoundHandler;
