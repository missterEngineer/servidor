import jwt from "jwt-simple";

const getJwt = ({id_user, username, email, userconfirmation, typeuser}) =>{

    const payload = {
        id: id_user,
        username,
        email,
        stateUser: userconfirmation,
        typeuser
    };

    return jwt.encode(payload, process.env.JWT_SECRET);
};

export default getJwt;