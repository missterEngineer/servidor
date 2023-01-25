import pool from "../../bd/db.js";

const seekerProfile = async (req, res) =>{

    try {

        const {word} = req.body;

        let query = `SELECT skillstalent.skill, skillstalent.talent_id, talent.id_talent, talent.nickname, talentInfo.profesion FROM skillsTalent INNER JOIN talent ON talent.id_talent = skillstalent.talent_id INNER JOIN talentInfo ON talentInfo.talent_id = skillstalent.talent_id WHERE UNACCENT(UPPER(skill)) LIKE UNACCENT(UPPER('%${word}%'))`

        const {rows} = await pool.query(query);

        let talents = [];

        if(rows.length >= 1){

            rows.map((el) =>{
                const valor = talents.filter(talent => talent.id_talent == el.id_talent);

                if(valor.length == 0){
                    const talent = {
                        id_talent: el.id_talent,
                        nickname: el.nickname,
                        profesion: el.profesion, 
                    };
                    console.log(talent)
                    talents = [talent, ...talents];
                }

            })

            return res.status(200).send({
                talents
            }) 
            
        }else{
            return res.status(200).send({
                talents: rows
            })
        }

       
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            msg: "error"
        })   
    }
};

export default seekerProfile;