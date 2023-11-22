const {request, reponse} = require('express');
const usersModel = require('../models/users');
const pool = require('../DB');
//1//
const listUsers = async(req = request, res = response)  => {
let conn;
try {
    conn = await pool.getConnection();

    const users = await conn.query(usersModel.getAll, (err) => {
        if (err) {
            throw err;
            
        }
    })    
    res.json(users)
} 
catch (error) {
    console.log(error);
    res.status(500).json(error);

} finally{
    if(conn)
    {conn.end();}
}
}
//2//
const listUserByID = async(req = request, res = response)  => {
    const {id}=req.params;
    let conn; 

    if (isNaN(id)) {   //cuando no es un número//
        res.status(400).json({msg: `THE ID - IS INVALID`});    //mostrata este mensaje cuando se tecleé un carácter en vez de un munero// 
        return;
        
    }
    
    try {
        conn = await pool.getConnection();
    
        const [user] = await conn.query(usersModel.getByID, [id], (err) => {    //consulta de los registro en nuestra base de datos//
            if (err) {
                throw err;
                
            }
        })

        if (!user) {
            res.status(404).json({msg: `USER WITH ID ${id} NOT FOUND`});     //mostrata este mensaje cuando se tecleé un numero en vez de un carácter// 
            return;
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    
    } finally{
        if(conn)
        {conn.end();}
    }
    }

    //AÑADE UN NUEVO USUARIO O REGISTRO//



    const addUser=async(req = request, res = response) => {
        const {
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation
        } = req.body;

        if (!name || !lastname || !age || !gender || !religion || !occupation) {
            res.status(400).json({msg: 'MISSING INFORMATION'});
            return;
        }
        const salRounds = 10;
        const passwordHash = await bcrypt.hash(password, salRounds);

        const user = [
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation]
        let conn;

        try {
            conn = await pool.getConnection();

            const [usernameExists] = await conn.query(usersModel.getByUsername, [username], (err) => {
                if (err) throw err;
                })
                if (usernameExists) {
                    res.status(409).json({msg: 'The name ${name} already exists'});
                    return;
                }


            const userAdded = await conn.query(usersModel.addRow, [...user], (err) => {
                if (err) throw err;
                })
                if (userAdded.affecteRows === 0){
                    throw new Error('User not added')
                }                                                   
                res.json({msg: 'USER ADDED SECCESFULLY'});        
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return;
        }finally{
            
            if(conn)conn.end();
            
        }
        }

        //Nuevo EndPoint 4 Modificar o Actualizar un registro ya registrado en nuestra base de datos//
        const updateUser = async (req = request, res = response) => {
            let conn;
        
            const {
                name, 
                lastname, 
                age, 
                gender, 
                religion, 
                occupation
            } = req.body;

            const { id } = req.params;

            if (isNaN(id)) {   //cuando no es un número//
                res.status(400).json({msg: `THE ID - IS INVALID`});    //mostrata este mensaje cuando se tecleé un carácter en vez de un munero// 
                return;
                
            }


            let userNewData = [
                name, 
                lastname, 
                age, 
                gender, 
                religion, 
                occupation
            ];
        
            try {
                conn = await pool.getConnection();
        
        const [userExists] = await conn.query
        (usersModel.getByID, 
            [id], 
            (err) => {
            if (err) throw err;
        });

        if (!userExists || userExists.is_active ===0){
            res.status(409).json({msg: `The character with ID ${id} not found`});
                return;
        }

        const [usernameExists] = await conn.query(usersModel.getByUsername, [username], (err) => {
            if (err) throw err;
            })
            if (usernameExists) {
                res.status(409).json({msg: 'The character ${name} already exists'});
                return;
            }

        const [emailExists] = await conn.query(usersModel.getByEmail, [email], (err) => {
            if (err) throw err;
            })
            if (emailExists) {
                res.status(409).json({msg: 'Email ${email} already exists'});
                return;
                }

                const userOldData = [
                userExists.name, 
                userExists.lastname, 
                userExists.age, 
                userExists.gender, 
                userExists.religion, 
                userExists.occupation
            ];

            userNewData.forEach((userData, index) =>{
                if (!userData){
                    userNewData[index] = userOldData[index];
                }
            })
                const userUpdated = await conn.query(
                    usersModel.updateRow,
                    [...userNewData, id],
                    (err) =>{
                        if (err) throw err;
                    }
                )

        if (userUpdated.affecteRows === 0){
        throw new Error('Character not added')
                } 

                res.json({msg: 'Character UPDATED SECCESFULLY'});
                
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
                return;
            } finally {
                if (conn) conn.end();
            }
        }
        
    


//endpoint 5//para eleminar  un usuario
        const deleteUser = async(req = request, res = response) => {
            let conn;
            const {id} = req.params; 
            if (isNaN(id)) {   //cuando no es un número//
                res.status(400).json({msg: `THE ID - IS INVALID`});    //mostrata este mensaje cuando se tecleé un carácter en vez de un munero// 
                return;
                
            }


        try {

            conn = await pool.getConnection();

            const [userExists] = await conn.query
            (usersModel.getByID, 
                [id], 
                (err) => {
                if (err) throw err;
            });

            if (!userExists || userExists.is_active ===0){
                res.status(409).json({msg: `Character with ID ${id} not found`});
                return;

            }

            const userDeleted = await conn.query(
                usersModel.deleteRow,
                [id],
                (err) => {
                    if (err) throw err;
                }
            );
            
            if (userDeleted.affecteRows === 0){
                throw new Error('Character not deleted');

            }
            res.json ({msg: 'Character deleted seccesfully'});

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        } finally{
            if(conn) (await conn).end();


        }
            
}  



        
    module.exports = {listUsers, listUserByID, addUser, updateUser, deleteUser}
