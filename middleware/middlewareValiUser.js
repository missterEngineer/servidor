import pool from "../bd/db.js";
import jwt from "jwt-simple";

export const middlewareValiUSer = async (req, res, next) =>{
    try {

        const {cuenta} = req.body;
        
        if(cuenta.username){
            let queryUserName = "SELECT * FROM users WHERE username = $1";
            const resUserValidar = await pool.query(queryUserName, [cuenta.username]);
            if(resUserValidar.rows.length >= 1){
        
                return res.status(400).send({
                    msg: "Nombre de usuario ya registrado"
                })
            }
        }

        let queryUserEmail = "SELECT * FROM users WHERE email = $1";
        const resUserValidarEmail = await pool.query(queryUserEmail, [cuenta.email]);
        if(resUserValidarEmail.rows.length >= 1){
            return res.status(400).send({
                msg: "Email ya registrado"
            })
        }

        next();

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error en la validacion de credenciales"
        })
    }
 
};

export const middlewareValiToken = async (req, res, next) =>{
    try {
        const {codeAut} = req.body;

        if(!codeAut){

            return res.status(400).send({
                message: "Error faltan la autorizacion"
            });
        }

        const payload = jwt.decode(codeAut, process.env.JWT_SECRET);

        let queryCode = "SELECT * from codeVerified WHERE code = $1";
        const resCode = await pool.query(queryCode, [payload.code]);

        if(resCode.rows.length < 1){
            return res.status(400).send({
                message: "Error faltan la autorizacion1"
            });
        }

        next();

    } catch (error) {
        return res.status(400).send({
            message: "Error en la validacion de credenciales"
        })
    }
}