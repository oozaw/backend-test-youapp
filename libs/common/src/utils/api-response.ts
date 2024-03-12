import { Request, Response } from 'express';

export function handleRequest(req: Request, res: Response): void {
  // Handle the request here
}

export function sendResponse(
  res: Response,
  statusCode: number,
  data: any,
): void {
  res.status(statusCode).json(data);
}
