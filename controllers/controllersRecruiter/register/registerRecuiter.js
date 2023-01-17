
import { registerUser, registerPersona } from "../../register/registerParts.js";

const controllerRegister = {

    register: async (req, res) =>{
        try {
            const {persona, cuenta} = req.body;

            const idUSer = await registerUser(cuenta, "recruiter");

            await registerPersona(idUSer, persona, {titulo: "Recruiter"});

            return res.status(200).send({
                msg: "Registro finalizado"
            })
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "Vuelva a intentarlo si el error persiste intentelo mas tarde"
            })
        }
    }


};

export default controllerRegister;