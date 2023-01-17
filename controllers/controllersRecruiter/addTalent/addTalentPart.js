

import pool from "../../../bd/db.js";

export const registerTalent = async (values, idUser) =>{
 
    let queryUser = "INSERT INTO talent(nickname, email, stateVisible, user_id) VALUES($1, $2, $3, $4)";

    await pool.query(queryUser, [values.nickname, values.email, true, idUser]);

    let queryGetId = "SELECT id_talent FROM talent WHERE email = $1";

    const resId = await pool.query(queryGetId, [values.email]);

    return resId.rows[0].id_talent;

};

export const registertalentInfo = async (id, values) =>{

    if(values){
        let query = "INSERT INTO talentInfo(names, surnames, nationality, birlhday, talent_id, profesion) VALUES($1, $2, $3, $4, $5, $6)";
        await pool.query(query, [values.name, values.surname, values.nacionalidad, values.fechaNac, id, values.profesion])
    }

}

export const registerTalentExp = async (id, values) =>{

    if(values){

        const expKeys = Object.keys(values);

        let queryExperiencia = "INSERT INTO experience(company, portExperience, seniority, talent_id) VALUES";

        expKeys.forEach((el, i) =>{
            if(expKeys.length == i + 1){
                queryExperiencia += `('${values[el].empresa}', '${values[el].cargo}', '${values[el].experiencia}', ${id})` 
            }else{
                queryExperiencia += `('${values[el].empresa}', '${values[el].cargo}', '${values[el].experiencia}', ${id}), `
            }
        })
        await pool.query(queryExperiencia);
    }

};

export const registertalentFormacion = async (id, values) =>{

    if(values){

        const estudiosKeys = Object.keys(values);

        let queryEstudios = "INSERT INTO studiesTalent(title, institution, country, typeStudy, talent_id) VALUES";

        estudiosKeys.forEach((el, i) =>{
            if(estudiosKeys.length == i + 1){
                queryEstudios += `('${values[el].titulo}', '${values[el].institucion}', '${values[el].pais}', '${values[el].tipoEstudio}', '${id}')` 
            }else{
                queryEstudios += `('${values[el].titulo}', '${values[el].institucion}', '${values[el].pais}', '${values[el].tipoEstudio}', '${id}'), `
            }
        })

        await pool.query(queryEstudios);


    }


};

export const registerTalentIdiomas = async (id, values) =>{

    if(values){

        let queryIdiomas = "INSERT INTO langTalent(languages, level, talent_id) VALUES"

        values.forEach((el, i) =>{

            if(values.length == i + 1){
                queryIdiomas += `('${el.idioma}', '${el.nivel}', ${id})`;
            }else{
                queryIdiomas += `('${el.idioma}', '${el.nivel}', ${id}), `;
            }
        })

        await pool.query(queryIdiomas);
    }
};

export const registerTalentSkills = async (id, valuesTec) =>{

    if(valuesTec){
        let querySkills = "INSERT INTO skillsTalent(skill, level, talent_id) VALUES";

        valuesTec.forEach((el, i) =>{
            if(valuesTec.length == i + 1){
                querySkills += `('${el.skill}', '${el.nivel}', ${id})`;
            }else{
                querySkills += `('${el.skill}', '${el.nivel}', ${id}), `;
            }
        })

        await pool.query(querySkills);
    }
};

