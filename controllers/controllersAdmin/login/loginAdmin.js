import bcrypt from "bcrypt";
import getJwt from "../../../services/jwt/getJwt.js";

import pool from "../../../bd/db.js";


const loginAdmin = async (req, res) =>{
    try {
        const {username, password} = req.body;

        const queryUser = "SELECT * FROM users WHERE username = $1";
        const resUser = await pool.query(queryUser, [username]);

        if(resUser.rows.length == 0){
            return res.status(400).send({
                error: "User no encontrado",
                typeError: "username"
            });
        }


        const user = resUser.rows[0];
        if(user.typeuser != "ADMIN"){
            return res.status(400).send({
                msg: "User not authorized"
            })
        }

        const check = await bcrypt.compare(password, user.password);


        if(!check){

            return res.status(400).send({
                error: "error password",
                typeError: "password"
            })
        }
        
        return res.status(200).send({
            msg: "login exitoso",
            token: getJwt(user)
        })

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "Error"
        })
    }
};

export default loginAdmin;