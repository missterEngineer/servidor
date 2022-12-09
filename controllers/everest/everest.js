import pool from "../../bd/db.js";


const controllerEverest = {

    get: async (req, res) =>{
        try {
            const id = req.userInfo.id;

            let query = "SELECT * FROM everest WHERE user_id = $1";
            const rep = await pool.query(query, [id]);

            return res.status(200).send({
                info: rep.rows
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "Error"
            })
        }
    }, 


    register: async (req, res) =>{
        try {
            const id = req.userInfo.id;
            
            const {nameproject, sector, area, exercise, typestake} = req.body;

            let query = "INSERT INTO everest(nameproject, sector, area, exercise, typestake, user_id) VALUES($1, $2, $3, $4, $5, $6)";
            await pool.query(query, [nameproject, sector, area, exercise, typestake, id]);

            return res.status(200).send({
                msg: "Registro completado"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "Error"
            })
        }
    }, 


    act: async (req, res) =>{
        try {
            const id = req.userInfo.id;
            
            const {nameproject, sector, area, exercise, typestake, idEve} = req.body;
            
            let query = "UPDATE everest SET nameproject = $1, sector = $2, area = $3, exercise = $4, typestake = $5, user_id = $6 WHERE id_everest = $7";

            await pool.query(query, [nameproject, sector, area, exercise, typestake, id, idEve]);

            return res.status(200).send({
                msg: "completado"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "Error"
            })
        }
    }, 


    clear: async (req, res) =>{
        try {
            const id = req.params.id;

            let query = "DELETE FROM everest WHERE id_everest = $1";

            await pool.query(query, [id]);
            
            return res.status(200).send({
                msg: "completado"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "Error"
            })
        }
    }, 
};

export default controllerEverest;