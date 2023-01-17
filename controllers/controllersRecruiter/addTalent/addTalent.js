
import pool from "../../../bd/db.js";
import { registerExpLaboral, registerSkills } from "../../register/registerParts.js";
import { registerTalent, registerTalentExp, registertalentFormacion, registerTalentIdiomas, registertalentInfo, registerTalentSkills } from "./addTalentPart.js";

const controlerRegisterTalent = {

    register : async (req, res) =>{

        try {

            const {perfil, info, formacion, experiencia, skills, lang} = req.body;

            const id = req.userInfo.id;

            if(perfil.nickname){
                let queryUserName = "SELECT * FROM talent WHERE nickname = $1";
                const resUserValidar = await pool.query(queryUserName, [perfil.username]);
                if(resUserValidar.rows.length >= 1){
            
                    return res.status(400).send({
                        msg: "Nombre de usuario ya registrado"
                    })
                }
            }
    
            let queryUserEmail = "SELECT * FROM talent WHERE email = $1";
            const resUserValidarEmail = await pool.query(queryUserEmail, [perfil.email]);
            if(resUserValidarEmail.rows.length >= 1){
                return res.status(400).send({
                    msg: "Email ya registrado"
                })
            }

            const idTalent = await registerTalent(perfil, id);

            await registertalentInfo(idTalent, info);

            if(experiencia){
                await registerTalentExp(idTalent, experiencia);
            }

            if(formacion){
                await registertalentFormacion(idTalent, formacion);
            }

            if(lang){
                await registerTalentIdiomas(idTalent, lang);
            }

            if(skills){
                await registerTalentSkills(idTalent, skills);
            }

            return res.status(200).send({
                msg: "ok"
            })
        
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                msg: "Vuelva a intentarlo si el error persiste intentelo mas tarde"
            })
        }

    },

    get : async (req, res) =>{

        try {

            const id = req.userInfo.id;
            
        } catch (error) {
            return res.status(400).send({
                msg: "Vuelva a intentarlo si el error persiste intentelo mas tarde"
            })
        }
    }
};

export default controlerRegisterTalent;