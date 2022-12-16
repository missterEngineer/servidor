import { registerUser } from "../../register/registerParts.js";


const registerAdmin = async (req, res) =>{
    try {
        const {username, password, email} = req.body;

        await registerUser({username, password, email}, "ADMIN");

        return res.status(200).send({
            msg: "registerADMIN"
        })
        
    } catch (error) {
        return res.status(400).send({
            msg: "error user admin"
        })
    }
};

export default registerAdmin;