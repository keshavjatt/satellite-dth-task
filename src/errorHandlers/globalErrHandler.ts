import { Request, Response, NextFunction } from "express";

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
	const statusCode = 500;
	const message = err.message || "Something went wrong.";

	return res.status(statusCode).json({
		error: statusCode,
		message: message
	})
}