import pool from "../../../bd/db.js";

const followRegisterUser = {

    initFollow: async (req, res) =>{
        try {

            const {cuenta} = req.body;

            let queryEmail = "SELECT * FROM recordSteps WHERE emailsteps = $1";
            const resEmail = await pool.query(queryEmail, [cuenta.email]);

            if(resEmail.rows.length > 0){
                return res.status(200).send({
                    idRecord: resEmail.rows[0].id_recordsteps
                })
            }

            let queryInsert = "INSERT INTO recordSteps(emailSteps, cuentaSteps, infoSteps, formacionSteps, expSteps, skillsSteps) VALUES($1, $2, $3, $4, $5, $6)";
            await pool.query(queryInsert, [cuenta.email, true, false, false, false, false]);

            let queryId = "SELECT * FROM recordSteps WHERE emailsteps = $1";
            const resId = await pool.query(queryId, [cuenta.email]);

            return res.status(200).send({
                idRecord: resId.rows[0].id_recordsteps
            })
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "error"
            })
        }       
    },

    followRegisterPart: async (req, res) =>{
        try {
            
            const {page, idCheck} = req.body;

            if(page == 2){
                let queryPage = "UPDATE recordSteps SET infoSteps = $1 WHERE id_recordSteps = $2";
                await pool.query(queryPage, [true, idCheck])
            }

            if(page == 3){
                let queryPage = "UPDATE recordSteps SET formacionSteps = $1 WHERE id_recordSteps = $2";
                await pool.query(queryPage, [true, idCheck])

            }

            if(page == 4){
                let queryPage = "UPDATE recordSteps SET expSteps = $1 WHERE id_recordSteps = $2";
                await pool.query(queryPage, [true, idCheck])

            }

            if(page == 5){
                let queryPage = "UPDATE recordSteps SET skillsSteps = $1 WHERE id_recordSteps = $2";
                await pool.query(queryPage, [true, idCheck])

            }

            return res.status(200).send({
                msg: "finalized"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "error"
            })
        }        
    },

    getFollowUSer: async (req, res) =>{
        try {

            let queryGet = "SELECT * FROM recordSteps";
            const resp = await pool.query(queryGet);
            
            return res.status(200).send({
                users: resp.rows
            })

        } catch (error) {
            return res.status(200).send({
                msg: "GET"
            })
        }
    
    }

};

export default followRegisterUser;