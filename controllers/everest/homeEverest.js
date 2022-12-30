import pool from "../../bd/db.js";
import bcrypt from "bcrypt";
import { registerUser } from "../register/registerParts.js";

const homeEverest ={
    
    getAll: async (req, res) =>{
        try {

            const page = req.params.page;

            const pageGet = page * 8;

            let queryGet = " SELECT everest.*, users.email FROM everest INNER JOIN users ON everest.user_id = users.id_user LIMIT $1 OFFSET $2";

            const resGet = await pool.query(queryGet, [8, pageGet]);

            return res.status(200).send({
                everest: resGet.rows
            })

            
        } catch (error) {
            console.log(error);
            return res.status(200).send({
                msg: "error"
            })
        }
    },

    exists: async (req, res) =>{
        try {

            const {cuenta} = req.body;
            
    
            let queryUserEmail = "SELECT * FROM users WHERE email = $1";
            const resUserValidarEmail = await pool.query(queryUserEmail, [cuenta.email]);
            
            return res.status(200).send({
                existsUser: resUserValidarEmail.rows.length == 0 ? false : true
            })
            
    
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: "Error en la validacion de credenciales"
            })
        }
     
    },

    newEverestNewUser: async (req, res) =>{
        try {

            const {cuenta, nameproject, sector, area, exercise, typestake} = req.body;

            const idUser = await registerUser(cuenta, "user");
            
            let query = "INSERT INTO everest(nameproject, sector, area, exercise, typestake, user_id) VALUES($1, $2, $3, $4, $5, $6)";
            await pool.query(query, [nameproject, sector, area, exercise, typestake, idUser]);

            return res.status(200).send({
                msg: "Registro completado",
                id: idUser
            })
            

        } catch (error) {
            console.log(error);
            return res.status(200).send({
                msg: "error"
            })
        }
    },

    newEverestUser: async (req, res) =>{
        try {

            const {cuenta, nameproject, sector, area, exercise, typestake} = req.body;

 
            const queryUser = "SELECT * FROM users WHERE username = $1";
            const resUser = await pool.query(queryUser, [cuenta.username]);

            console.log(resUser.rows[0])
    
            if(resUser.rows.length == 0){
                return res.status(400).send({
                    error: "User no encontrado",
                    typeError: "username"
                });
            }
    
            const user = resUser.rows[0];
            const check = await bcrypt.compare(cuenta.password, user.password);
    
            if(!check){
    
                return res.status(400).send({
                    error: "error password",
                    typeError: "password"
                })
            }

            let query = "INSERT INTO everest(nameproject, sector, area, exercise, typestake, user_id) VALUES($1, $2, $3, $4, $5, $6)";
            await pool.query(query, [nameproject, sector, area, exercise, typestake, user.id_user]);

            return res.status(200).send({
                msg: "Registro completado"
            })

            
        } catch (error) {
            console.log(error);
            return res.status(200).send({
                msg: "error"
            })
        }
    }



};

export default homeEverest;