import pool from "../../bd/db.js";
import getJwt from "../../services/jwt/getJwt.js";
import {registerPersona, registerUser} from "./registerParts.js";


export const loginGoogleApi = async (req, res) =>{
    try {

        const {emailGoogle} = req.body;

        const query = "SELECT * FROM users WHERE email = $1";

        const resp = await pool.query(query, [emailGoogle]);


        if(resp.rows.length == 0){
            return res.status(200).send({
               msg: "notUser"
            })
        }

        const user = resp.rows[0];

        return res.status(200).send({
            msg: "success",
            token: getJwt(user)
        })

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "error"
        })
    }
};

export const registerGoogle = async (req, res) =>{
    try {
        const {persona, cuenta, typeCuenta, etiqueta} = req.body;

        const id = await registerUser(cuenta, typeCuenta);

        await registerPersona(id, persona, {titulo: typeCuenta == "recruiter" ? "Recruiter" : etiqueta.titulo});

        let query = "SELECT * FROM users WHERE id_user = $1";

        const info = await pool.query(query, [id]);

        return res.status(200).send({
            token: getJwt(info.rows[0])
        })
        

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "error"
        })
    }
}