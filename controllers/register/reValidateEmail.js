import sendMailNewUser from "./mailNewUser.js";



const sendValidateEmail = async (req, res) => {

    try {

        const {id, username, email} = req.userInfo;

        await sendMailNewUser(id, username, email);
        
        return res.status(200).send({
            msg: "correo enviado"
        })

    } catch (error) {
        return res.status(404).send({
            msg: "error"
        })
    }

};

export default sendValidateEmail;