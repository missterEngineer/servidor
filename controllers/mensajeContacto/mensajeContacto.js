import pool from "../../bd/db.js";
import transporter from "../../services/email/email.js";


const contactoMsg = async (req, res) =>{
    try {

        const {typePerson, email, name, msg} = req.body;


        let query = "INSERT INTO contactMsg(typePerson, emailPerson, namePerson, msg, estateViewed) VALUES($1, $2, $3, $4, $5)";

        await pool.query(query, [typePerson, email, name, msg, false]);

        await transporter.sendMail({
            from: 'atencion de cliente', 
            to: "info@hutrit.com",
            subject: typePerson + " " + email, 
            text: `${name}. \n ${email}. \n ${msg}.`, 
        });

        return res.status(200).send({
            msg: "Mensaje enviado"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "Error en el sistema"
        })
    }
};

export default contactoMsg;