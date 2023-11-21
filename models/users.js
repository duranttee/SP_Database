const usersModel = {
    getAll: `
    SELECT 
    *
    FROM    
        users_1
    ` ,


    getByID: `
    SELECT
        *
    FROM
        users_1
    WHERE
        id = ?
    `,

    getByUsername: `
    SELECT
        *
    FROM
        users_1
    WHERE
        username = ?
    `,

    getByEmail: `
    SELECT
        *
    FROM
        users_1
    WHERE
        email = ?
    `,

    addRow: `
        INSERT INTO
            users_1 (
                username, 
                password,
                email,
                name,
                lastname,
                phonenumber,
                role_id,
                is_active
            )VALUES(
                ?, ?, ?, ?, ?, ?, ?, ?
                
                

            )
    `
    ,

    updateRow: `
        UPDATE
            users_1
        SET
            username = ?,
            password = ?,
            email = ?,
            name = ?,
            lastname = ?,
            phonenumber = ?,
            role_id = ?,
            is_active = ?
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