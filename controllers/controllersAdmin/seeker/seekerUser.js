import pool from "../../../bd/db.js";


const seekerUser = async (req, res) =>{
    try {
        const {word} = req.body;
 

        let query = `SELECT skills.*, users.email, users.username FROM skills INNER JOIN users ON skills.user_id = users.id_user WHERE UNACCENT(UPPER(skill)) LIKE UPPER('%${word}%')`;

        const resp = await pool.query(query);

        return res.status(200).send({
            msg: "buscador",
            user: resp.rows
        })
        
    } catch (error) {
        return res.status(400).send({
            msg: "error",
        })
    }
};

export default seekerUser;

