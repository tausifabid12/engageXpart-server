import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err, 'ppppppp')

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
};
