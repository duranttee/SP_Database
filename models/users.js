const usersModel = {
    getAll: `
    SELECT 
            *
        FROM
            southpark
    `,
    getByID:`
    SELECT 
             *
        FROM
        southpark
            WHERE
                id =?
    `,

    getByName:`
    SELECT 
             *
        FROM
        southpark
            WHERE
                Name =?
    `,

    addChar: `
    INSERT INTO 
    southpark(
        name, 
        lastname, 
        age, 
        gender, 
        religion, 
        occupation

    )VALUES(
    ?, ?, ?, ?, ?, ?
    )
    `,
    
    updateChar: `
    UPDATE  
        southpark
    SET 
    name = ?,
    lastname = ?,
    age = ?,
    gender = ?,
    religion = ?,
    occupation = ?

    WHERE
    id=?
    `,
    
    deleteChar:`
    
    DELETE FROM
    southpark
    WHERE
        id =?
    
    `
    }
    module.exports = usersModel;