import pool from "../../bd/db.js";
import bcrypt from "bcrypt";
import { registerPersona } from "../register/registerParts.js";



export const registerEverestHome = async (req, res) =>{
    try {
        const {cuenta, nameproject, sector, area, exercise, typestake} = req.body;

        let queryUserName = "SELECT * FROM users WHERE username = $1";
        const resUserValidar = await pool.query(queryUserName, [cuenta.username]);
        if(resUserValidar.rows.length >= 1){
    
            return res.status(400).send({
                msg: "Nombre de usuario ya registrado"
            })
        }
    
        let queryUserEmail = "SELECT * FROM users WHERE email = $1";
        const resUserValidarEmail = await pool.query(queryUserEmail, [cuenta.email]);
        if(resUserValidarEmail.rows.length >= 1){
            return res.status(400).send({
                msg: "Email ya registrado"
            })
        }
    
    
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash  = await bcrypt.hash(cuenta.password, salt);
    
        let queryUser = "INSERT INTO users(username, email, password, userConfirmation, imgUser) VALUES($1, $2, $3, $4, $5)";
        const resUser = await pool.query(queryUser, [cuenta.username, cuenta.email, hash, false, null]);
    
        const resId = await pool.query("SELECT id_user FROM users WHERE username = $1", [cuenta.username]);
    
        const id = resId.rows[0].id_user;


        let query = "INSERT INTO everest(nameproject, sector, area, exercise, typestake, user_id) VALUES($1, $2, $3, $4, $5, $6)";
        await pool.query(query, [nameproject, sector, area, exercise, typestake, id]);

        return res.status(200).send({
            msg: "Registro completado"
        })

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "Vuelva a intentarlo si el error persiste intentelo mas tarde"
        })
    }

};

export const registerPer = async (req, res) =>{
    try {

        const {id} = req.userInfo;
        const {persona, etiqueta} = req.body;

        await registerPersona(id, persona, etiqueta);
        
        return res.status(200).send({
            msg: "register"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "Error"
        })
    }
};
