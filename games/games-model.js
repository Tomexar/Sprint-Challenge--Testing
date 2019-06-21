const knex = require('knex');
const knexConfig = require('../knexfile');

const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findById,
    remove,
    insert
}

function find() {
    return db('games')
}

function findById(id) {
    return db('games')
        .where({ id })
        .first()
}

function insert(game){
    return db('games')
    .insert(game, 'id')
    .then(([id]) => {
        return findById(id)
    })
}

function remove(id){
    return db('games')
    .where({ id })
    .del();
}