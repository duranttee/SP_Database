const usersModel = {
    getAll: `
    SELECT 
    *
    FROM    
        southpark
    ` ,


    getByID: `
    SELECT
        *
    FROM
        southpark
    WHERE
        id = ?
    `,

    getByUsername: `
    SELECT
        *
    FROM
        southpark
    WHERE
        name = ?
    `,


    addRow: `
        INSERT INTO
            southpark (
                name, 
                lastname, 
                age, 
                gender, 
                religion, 
                occupation
            )VALUES(
                ?, ?, ?, ?, ?, ?, ?, ?
                
                

            )
    `
    ,

    updateRow: `
        UPDATE
            southpark
        SET
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation
        WHERE 
            id = ?
    ` 
    ,

    deleteRow: `
    UPDATE
        users_1
    SET
        is_active = 0
    WHERE
        id = ?
    `,
}

module.exports = usersModel;