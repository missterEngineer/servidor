import jwt from "jwt-simple";

const middlewareAdmin = (req, res, next) =>{
    try {

        const token = req.headers.authorization;

        if(!token){

            return res.status(400).send({
                message: "Error faltan la autorizacion"
            });
        }
        
        const payload = jwt.decode(token, process.env.JWT_SECRET);

        if(payload.typeuser != "ADMIN"){
            return res.status(400).send({
                msg: "User not authorized"
            })
        }

        req.userInfo = payload;

        next();

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error en la validacion de credenciales"
        })
    }
 
};

export default middlewareAdmin;