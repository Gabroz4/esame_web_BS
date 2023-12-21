import {connection} from "../utils/db";
import { Request, Response } from "express";

export async function getfunctionName(req:Request, res:Response){
    connection.execute(
        "//query",
        [],
        function(err, results, fields){
            res.json(results);
        }
    );
};

//altre query