const router = require('express').Router()
const Games = require('./games-model.js')

router.get('/', (req, res) => {
    Games.find()
        .then(games => {
            res.status(200).json(games);
        }).catch(err => {
            res.status(500).json({ message: 'error getting games' })
        })
})
router.get('/:id', (req, res) => {
    Games.findById(req.params.id)
        .then(game => {
            if (game) {
                res.status(200).json(game);
            } else {
                res.status(404).json({ message: 'game not found' });
            }

        }).catch(err => {
            res.status(500).json({ message: 'error getting games' })
        })
})

router.post('/', (req, res) => {
    if (req.body.name && req.body.genre) {
        Games.insert(req.body)
            .then(game => {
                res.status(200).json(game);
            })
            .catch(error => {
                if (err.errno == 19) {
                    res.status(405).json({ message: "Game already exists" })
                } else {
                    res.status(500).json({ message: 'We ran into an error adding the game' });
                }

            });
    } else {
        res.status(422).json({ message: 'needs a title and genre' })
    }
});

router.delete('/:id', (req, res) => {
    Games.remove(req.params.id)
        .then(game => {
            if(game > 0){
                 res.status(200).json(game);
            }else {
                res.status(404).json({ message : 'no game with this id'})
            }
           
        })
        .catch(error => {
            res.status(500).json({ message: 'We ran into an error deleting the game' });
        });
});

router.put('/:id', (req, res) => {
    Games.update(req.params.id, req.body)
        .then(game => {
            res.status(200).json(game);
        })
        .catch(error => {
            res.status(500).json({ message: 'We ran into an error updating the game' });
        });
});

module.exports = router