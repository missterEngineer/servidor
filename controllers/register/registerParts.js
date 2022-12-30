import bcrypt from "bcrypt";

import pool from "../../bd/db.js";

export const registerUser = async (values, typeUser) =>{

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash  = await bcrypt.hash(values.password, salt);

    let queryUser = "INSERT INTO users(username, email, password, userConfirmation, imgUser, typeUser) VALUES($1, $2, $3, $4, $5, $6)";

    await pool.query(queryUser, [values.username, values.email, hash, true, null, typeUser]);

    let queryGetId = "SELECT id_user FROM users WHERE email = $1";

    const resId = await pool.query(queryGetId, [values.email]);

    return resId.rows[0].id_user;

};

export const registerPersona = async (id, values, profecion) =>{

    if(values){
        let query = "INSERT INTO userInfo(names, surname, dateBirth, nationality, docIdentity, tlf, location, user_id, profesion) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        await pool.query(query, [values.nombre, values.apellido, values.fechaNac, values.nacionalidad, `${values.tipoDocumento} - ${values.numeroDocumento}`, `${values.codigoTlf} - ${values.telefono}`, `${values.paisUbicacion} - ${values.regiosUbicacion} - ${values.cityUbicacion}`, id, profecion.titulo])
    }

}

export const registerExpLaboral = async (id, values) =>{

    if(values){

        const trabajosKeys = Object.keys(values).filter(el => el[0] == "t");

        let queryExperiencia = "INSERT INTO jobs(company, position, seniority, description, stateJob, dateStart, dateFinal, user_id) VALUES";

        trabajosKeys.forEach((el, i) =>{
            if(trabajosKeys.length == i + 1){
                queryExperiencia += `('${values[el].empresa}', '${values[el].puestoTrabajo}', '${values[el].experiencia}', '${values[el].actividades.replace(/['"]+/g, '').replace(/(\r\n|\n|\r)/gm," ").replace(/[^a-zA-Z0-9\.\,\-\:\;\"\'\()\u00C0-\u017F]/g, " ").toLowerCase().trim()}', ${values[el].stateFinJoin == "true" ? true : false}, '${values[el].dateInic}', ${values[el].stateFinJoin == "false" ? `'${values[el].dateFin}'` : null}, ${id})` 
            }else{
                queryExperiencia += `('${values[el].empresa}', '${values[el].puestoTrabajo}', '${values[el].experiencia}', '${values[el].actividades.replace(/['"]+/g, '').replace(/[^a-zA-Z0-9\n\.\,\-\:\;\"\'\()\u00C0-\u017F]/g, " ").toLowerCase().trim()}', ${values[el].stateFinJoin == "true" ? true : false}, '${values[el].dateInic}', ${values[el].stateFinJoin == "false" ? `'${values[el].dateFin}'` : null}, ${id}), `
            }
        })
        await pool.query(queryExperiencia);
    }

};

export const registerFormacion = async (id, valuesEstudios, valuesCursos) =>{

    if(valuesEstudios){

        const estudiosKeys = Object.keys(valuesEstudios);

        let queryEstudios = "INSERT INTO studies(typeStudies, study, institution, countryStudy, stateStudy, dateStartStudy, dateFinalStudy, user_id) VALUES";

        estudiosKeys.forEach((el, i) =>{
            if(estudiosKeys.length == i + 1){
                queryEstudios += `('${valuesEstudios[el].tipoEstudio}', '${valuesEstudios[el].estudio}', '${valuesEstudios[el].institucion}', '${valuesEstudios[el].pais}', '${valuesEstudios[el].estudioTerminado == "true" ? true : false}', ${valuesEstudios[el].estudioTerminado == "true" ? `'${valuesEstudios[el].dateInic}'` : null}, ${valuesEstudios[el].estudioTerminado == "true" ? `'${valuesEstudios[el].dateFin}'` : null}, '${id}')` 
            }else{
                queryEstudios += `('${valuesEstudios[el].tipoEstudio}', '${valuesEstudios[el].estudio}', '${valuesEstudios[el].institucion}', '${valuesEstudios[el].pais}', '${valuesEstudios[el].estudioTerminado == "true" ? true : false}', ${valuesEstudios[el].estudioTerminado == "true" ? `'${valuesEstudios[el].dateInic}'` : null}, ${valuesEstudios[el].estudioTerminado == "true" ? `'${valuesEstudios[el].dateFin}'` : null}, '${id}'), `
            }
        })

        await pool.query(queryEstudios);


    }


    if(valuesCursos){

        const cursosKeys = Object.keys(valuesCursos);

        let queryCursos = "INSERT INTO courses(stage, nameCourse, stateCourse, dateStartCourse, dateFinalCourse, user_id) VALUES";

        cursosKeys.forEach((el, i) =>{
            if(cursosKeys.length == i + 1){
                queryCursos += `('${valuesCursos[el].plataforma}', '${valuesCursos[el].curso}', ${valuesCursos[el].cursoTerminado == "true" ? true : false}, ${valuesCursos[el].cursoTerminado == "true" ? `'${valuesCursos[el].dateInic}'` : null}, ${valuesCursos[el].cursoTerminado == "true" ? `'${valuesCursos[el].dateFin}'` :null}, ${id})`;
            }else{
                queryCursos += `('${valuesCursos[el].plataforma}', '${valuesCursos[el].curso}', ${valuesCursos[el].cursoTerminado == "true" ? true : false}, ${valuesCursos[el].cursoTerminado == "true" ? `'${valuesCursos[el].dateInic}'` : null}, ${valuesCursos[el].cursoTerminado == "true" ? `'${valuesCursos[el].dateInic}'` : null}, ${id}), `;
            }
        })

        await pool.query(queryCursos);
    }

};

export const registerIdiomas = async (id, values) =>{

    if(values){

        let queryIdiomas = "INSERT INTO languages(language, levelLang, user_id) VALUES"

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

export const registerSkills = async (id, valuesTec) =>{

    if(valuesTec){
        let querySkills = "INSERT INTO skills(skill, experience, user_id) VALUES";

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

export const registerEtiquetaTrabajo = async (id, values) =>{

    if(values){
        let queryEtiqueta = "INSERT INTO etiquetaTrabajo(etiqueta, user_id) VALUES";

        values.forEach((el, i) =>{
            if(values.length == i + 1){
                queryEtiqueta += `('${el}', ${id})`;
            }else{
                queryEtiqueta += `('${el}', ${id}), `;
            }
        })

        await pool.query(queryEtiqueta);
    }
};