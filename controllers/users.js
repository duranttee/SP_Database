const {request, reponse} = require('express');
const usersModel = require('../models/users');
const pool = require('../db');


// Enpoint 1//
const listChar = async(req = request, res = response)  => {
let conn;
try {
    conn = await pool.getConnection();

    const southpark= await conn.query(usersModel.getAll, (err) => {
        if (err) {
            throw err;
            
        }
    })    
    res.json(southpark)
} 
catch (error) {
    console.log(error);
    res.status(500).json(error);

} finally{
    if(conn)
    {conn.end();}
}
}

// Enpoint 2//
const listCharByID = async(req = request, res = response)  => {
    const {id}=req.params;
    let conn; 

    if (isNaN(id)) {   
        res.status(400).json({msg: `THE ID IS INVALID`});     
        return;
        
    }
    
    try {
        conn = await pool.getConnection();
    
        const [southpark] = await conn.query(usersModel.getByID, [id], (err) => {  
            if (err) {
                throw err;
                
            }
        })
        if (!southpark) {
            res.status(404).json({msg: `CHARACTER WITH ID ${id} NOT FOUND`});      
            return;
        }

        res.json(southpark);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    
    } finally{
        if(conn)
        {conn.end();}
    }
    }

    // EndPoint 3 //
    const addChar = async(req = request, res = response) => {
        const {
            id,
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation
                
        } = req.body;

        if (!name || !lastname || !age || !gender || !religion || !occupation ) {
            res.status(400).json({msg: 'MISSING INFORMATION'});
            return;
        }
        const southpark = [
            
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation

            ]

        let conn;

        try {
            conn = await pool.getConnection();

            const [NameExists] = await conn.query(usersModel.getByName, [name], (err) => {
                if (err) throw err;
                })
                if (NameExists) {
                    res.status(409).json({msg: `CHARACTER ${name} already exists`});
                    return;
                }


            const nameAdded = await conn.query(usersModel.addChar, [...southpark], (err) => {
                if (err) throw err;
                })
                if (nameAdded.affecteRows === 0){
                    throw new Error('Name not added')
                }                                                   
                res.json({msg: 'CHARACTER ADDED SECCESFULLY'});        
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return;
        }finally{
            
            if(conn)conn.end();
            
        }
        }


        //Nuevo EndPoint 4  Actualizar datos
        const updateChar = async (req = request, res = response) => {
            let conn;
        
            const {
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation
            } = req.body;

            const {id} = req.params;

            let southparkNewData = [
            name, 
            lastname, 
            age, 
            gender, 
            religion, 
            occupation
            ];
        
            try {
                conn = await pool.getConnection();
        
        const [southparkExists] = await conn.query
        (usersModel.getByID, 
            [id], 
            (err) => {
            if (err) throw err;
        });

        if (!southparkExists || southparkExists.is_active ===0){
            res.status(409).json({msg: `CHARACTER with ID ${id} not found`});
            return;
        }

        const [NameExists] = await conn.query(usersModel.getByName, [name], (err) => {
            if (err) throw err;
            })
            if (NameExists) {
                res.status(409).json({msg: 'CHARACTER already exists'});
                return;
            }

                const southparkOldData = [
                southparkExists.name,
                southparkExists.lastname,
                southparkExists.age,
                southparkExists.gender,
                southparkExists.religion,
                southparkExists.occupation
                

            ];

            southparkNewData.forEach((southparkData, index) =>{
                if (!southparkData){
                    southparkNewData[index] = southparkOldData[index];
                }
            })
                const updateChar = await conn.query(
                    usersModel.updateChar,
                    [...southparkNewData, id],
                    (err) =>{
                        if (err) throw err;
                    }
                )

        if (updateChar.affecteRows === 0){
        throw new Error('User not added')
                } 

                res.json({msg: 'CHARACTER UPDATED SECCESFULLY'});
                
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
                return;
            } finally {
                if (conn) conn.end();
            }
        }
        
    


//endpoint 5 eliminar 
        const deleteChar = async(req = request, res = response) => {
            let conn;
            const {id} = req.params; 


        try {

            conn = await pool.getConnection();

            const [southparkExists] = await conn.query
            (usersModel.getByID, 
                [id], 
                (err) => {
                if (err) throw err;
            });

            if (!southparkExists || southparkExists.is_active ===0){
                res.status(409).json({msg: `CHARACTER with ID ${id} not found`});
                return;

            }

            const CharDeleted = await conn.query(
                usersModel.deleteChar,
                [id],
                (err) => {
                    if (err) throw err;
                }
            );
            
            if (southparkDeleted.affecteRows === 0){
                throw new Error('CHARACTER NOT DELETED');

            }
            res.json ({msg: 'Character deleted seccesfully'});

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        } finally{
            if (conn) conn.end();


        }
            
        }
        
module.exports = {listChar, listCharByID, addChar, updateChar, deleteChar }