import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../jwt-token/encode.payload";

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

    let payload;
    const token  = <string>req.headers.authorization.replace(/['"]+/g, '');

    try {
        payload = await decodeToken(token);
        if(payload.exp <= 60000) {
            return res.status(403).json({
                message: 'Token has expired'
             });
        }
        
    } catch (error) {
        return res.status(401).send({message: 'Invalid token'});
    }

    req.user = payload;    
    next();
}