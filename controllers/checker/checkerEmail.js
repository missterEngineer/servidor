import dayjs from "dayjs";

import pool from "../../bd/db.js";
import transporter from "../../services/email/email.js";
import codeGenerator from "../../services/codeGenerator/codeGenerator.js"
import { tepleteCodeMail } from "../../templates/teplatesMail.js";

const checkerMail = async (req, res) =>{
    try {

        const {cuenta} = req.body;

        let resultCode;
        do {
            var code = codeGenerator();
            let queryBuscar = "SELECT * FROM codeVerified WHERE code = $1";
            const resCode = await pool.query(queryBuscar, [code]);
            resultCode = resCode.rows.length
        } while (resultCode = 0);

        const codeData = {
            code: code[0],
            exp: dayjs().add(55, "m").unix(),
        }

        let queryInser = "INSERT INTO codeVerified(code, expiration, statecode) VALUES($1, $2, $3)";
        await pool.query(queryInser, [codeData.code, codeData.exp, false]);

        await transporter.sendMail({
            from: '"Hutrit" <ayudahutrit@gmail.com>', 
            to: cuenta.email,
            subject: "Confirmación de Correo", 
            text: "confirme su correo en hutrit", 
            html:  tepleteCodeMail(codeData.code),
        });

        return res.status(200).send({
            msg: "send"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "Error"
        })
    }
};

export default checkerMail;