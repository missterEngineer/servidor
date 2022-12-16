import jwt from "jwt-simple";

const tokenValidate = (id, code) =>{

    const payload = {
        id,
        code,
        validate: true
    };
    return jwt.encode(payload, process.env.JWT_SECRET);
};

export default tokenValidate;