const express = require('express');
const router = express.Router()
const {listChar, listCharByID, addChar, deleteChar, updateChar} = require('../controllers/users')

router.get('/', listChar);
router.get('/:id', listCharByID); //http://localhost:3000/api/v1/users/?
router.put('/', addChar);
router.patch('/:id', updateChar);
router.delete('/:id', deleteChar);



module.exports = router


//http://localhost:3000/api/v1/users

