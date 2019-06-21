const { insert } = require('./games-model')
const supertest = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('../api/server.js')


describe('games model', () => {
    beforeEach(async () => {
        await db('games').truncate();
    });

    it('should send env to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
    describe('GET', () => {
        it('responds with 200', () => {
            return supertest(server).get('/games').expect(200)
        })

        it('should be an array of games', () => {
            return supertest(server).get('/games').then(res => {
                expect(Array.isArray(res.body)).toBe(true)
            })
        })

        it('should return 404 if the id doesnt exist', () =>{
            return supertest(server).get('/games/5').expect(404)
        })
    })

    describe('POST', () =>{
        it('should return 200', () =>{
            return supertest(server)
                .post('/games')
                    .send({ name: 'post test', genre: 'post genre', release_year:1994})
                .expect(200)      
        })

        it('should return 422 if missing info', () =>{
            return supertest(server)
                .post('/games')
                    .send({ name:'missing tets'})
                .expect(422)
        })

        // it('should return 405 if there is a duplicate', () => {
        //     return supertest(server)
        //     .post('/games')
        //         .send({ name: 'test game 1', genre: 'test genre 1', release_year: 1994 })
        //         .send({ name: 'test game 1', genre: 'test genre 1', release_year: 1994 })
        //     .expect(405)
        // })
    })

    describe('DELETE', () =>{
        it('should return 404 if game doesnt exist', () =>{
            return supertest(server).delete('/games/5').expect(404)
        })

    })

   
})