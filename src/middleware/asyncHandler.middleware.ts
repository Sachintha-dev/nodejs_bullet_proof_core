import { Request, Response } from "express";

const asyncHandler =
  (handler: any) => async (req: Request, res: Response, next: any) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      next(ex);
    }
  };

export default asyncHandler;
