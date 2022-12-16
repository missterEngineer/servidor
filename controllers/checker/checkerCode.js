import dayjs from "dayjs";
import pool from "../../bd/db.js";
import tokenValidate from "../../services/jwt/tokenValidate.js";

const checkerCode = async (req, res) =>{
    try {

        const {code} = req.body;

        let queryCode = "SELECT * from codeVerified WHERE code = $1";
        const resCode = await pool.query(queryCode, [code]);

        const codeBd = resCode.rows[0];
        if(codeBd.expiration < dayjs().unix()){

            return res.status(400).send({
                msg: "expired code"
            })
        }

        let queryActCode = "UPDATE codeVerified SET statecode = $1 WHERE id_codeverified = $2";
        await pool.query(queryActCode, [true, codeBd.id_codeverified]);

        return res.status(200).send({
            tokenCode: tokenValidate(codeBd.id_codeverified, code)
        })

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "Error"
        })
    }
};

export default checkerCode;