import { Request, Response, NextFunction } from "express";
declare module 'express' {
    interface Request {
      user?: any; 
    }
}

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        return res.status(403).json({
            message: 'The request is missing the necessary authentication information'
        });
    }

    const token  = <string>req.headers.authorization;

    try {
        if(token !== process.env.SERET_KEY) {
            return res.status(403).json({
                message: 'Invalid token'
             });
        }
        
    } catch (error) {
        return res.status(401).send({message: 'Invalid token'});
    }

    next();
}