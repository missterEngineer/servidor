import pool from "../../../bd/db.js";

const getInfoAdmin = {

    section: async (req, res) =>{

        const info = req.params.idUser.split("-");

        const idUser = info[1];

        if(info[0] == "all"){

            let queryUser = "SELECT userInfo.profesion, users.id_user, users.username, users.email FROM userInfo LEFT JOIN users ON users.id_user = userInfo.user_id";
            const resUser = await pool.query(queryUser);

            if(resUser.rows.length == 0){
                return res.status(200).send({
                    "type": "falta"
                })
            }

            return res.status(200).send({
                info: resUser.rows
            })

        } 

        if(info[0] == "user"){

            let queryUser = "SELECT * FROM userInfo WHERE userInfo.user_id = $1";
            const resUser = await pool.query(queryUser, [idUser]);

            if(resUser.rows.length == 0){
                return res.status(200).send({
                    "type": "falta"
                })
            }
        }

        if(info[0] == "formacion"){

            let queryStudies = "SELECT * FROM studies WHERE user_id = $1";
            const resStudies = await pool.query(queryStudies, [idUser]);

            let queryCuros = "SELECT * FROM courses WHERE user_id = $1";
            const resCurso = await pool.query(queryCuros, [idUser]);

            const formacion ={
                studies: resStudies.rows,
                cursos: resCurso.rows
            };


            return res.status(200).send({
                formacion
            });
        }


        if(info[0] == "experiencia"){

            let queryJob = "SELECT * FROM jobs WHERE user_id = $1";
            const resJob = await pool.query(queryJob, [idUser]);

            return res.status(200).send({
                jobs: resJob.rows
            });
        }

        if(info[0] == "skills"){

            let queryIdiomas = "SELECT * FROM languages WHERE user_id = $1";
            const resIdiomas = await pool.query(queryIdiomas, [idUser]);

            let querySkill = "SELECT * FROM Skills WHERE user_id = $1";
            const resSkill = await pool.query(querySkill, [idUser]);

            const skills ={
                idiomas: resIdiomas.rows,
                skills: resSkill.rows
            };

            return res.status(200).send({
                skills
            });
        }
    },

    sectionFull: async (req, res) =>{

        const {idUSer} = req.params;

        let queryUser = "SELECT users.username, users.email, userInfo.* FROM users LEFT JOIN userInfo ON userInfo.user_id = users.id_user WHERE users.id_user = $1"
        const resUser = await pool.query(queryUser, [idUSer]);

        let queryStudies = "SELECT * FROM studies WHERE studies.user_id = $1";
        const resStudies = await pool.query(queryStudies, [idUSer])

        let queryCursos = "SELECT * FROM courses WHERE courses.user_id = $1";
        const resCursos = await pool.query(queryCursos, [idUSer]);

        let queryJob = "SELECT * FROM jobs WHERE jobs.user_id = $1";
        const resJob = await pool.query(queryJob, [idUSer]);

        let queryIdiomas = "SELECT * FROM languages WHERE languages.user_id = $1";
        const resIdiomas = await pool.query(queryIdiomas, [idUSer])

        let querySoft = "SELECT * FROM softSkills WHERE softSkills.user_id = $1";
        const resSoft = await pool.query(querySoft, [idUSer]);

        let querySkills = "SELECT * FROM skills WHERE skills.user_id = $1";
        const resSkills = await pool.query(querySkills, [idUSer])

        let queyEve = "SELECT * FROM everest WHERE user_id = $1"
        const resEve = await pool.query(queyEve, [idUSer])

        const info ={
            user: resUser.rows[0],
            estudios: resStudies.rows,
            cursos: resCursos.rows,
            job: resJob.rows,
            idiomas: resIdiomas.rows,
            softSkill: resSoft.rows,
            skills: resSkills.rows,
            eve: resEve.rows
        };


        return res.status(200).send({
           info
        })
    }

};

export default getInfoAdmin