// Import Express, Router, and Data
// Import Modules
const express = require('express');
const router = express.Router();

// Import Data Source
const db = require('../data/dbConfig.js');

// Get All Accounts
router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.json(accounts);
    })
    .catch (err => {
        res
        .status(500)
        .json({
            message: 'Failed to GET accounts list.',
        });
    });
});

// Get Account by Id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id })
    .then(account => {
        if (account.length) {
            res
            .json(account);
        } else {
            res
            .status(404)
            .json({ 
                message: `Could not find account with ID: ${id}. `,
            })
        }})
        .catch (err => {
            res 
            .status(500)
            .json({
                message: 'Failed to GET account.'
            });
        });
    });

    /* Get all accounts sorted by Budget
    router.get('/asc', (req, res) => {
        db('accounts').orderBy('budget', 'desc')
        .then(accounts => {
            res.json(accounts);
        })
        .catch (err => {
            res
            .status(500)
            .json({
                message: 'Failed to GET accounts list.',
            });
        });
    });
    
    // Get all accounts sorted by Budget (descending)

    router.get('/desc', (req, res) => {
        db('accounts').orderBy('budget', 'desc')
        .then(accounts => {
            res.json(accounts);
        })
        .catch (err => {
            res
            .status(500)
            .json({
                message: 'Failed to GET accounts list.',
            });
        });
    });
    */
    
    // Create Account

    router.post ('/', (req,res) =>{
        db('accounts')
          .insert(req.body)
          .then(id => {
            res.status(201).json(id)
          })
        });
    // Update Account

    router.put('/:id', (req, res) => {
        const {name, budget} = req.body;
        const { id } = req.params;

        db('accounts')
        .where({id})
        .update(req.body)
        .then(update => {
        if (!id) {
            res
            .status(404)
            .json({
                message: `Cannot find account with id:${id}.`
            })
        } else {
            res
            .status(202)
            .json({
                message: 'Account successfully updated.',
            })
        .catch (err => {
            res
            .status(500)
            .json({
                message: 'Failed to UPDATE account.', err,
            });
        
        });
    }});
});

    // Delete Account

    router.delete('/:id', (req, res) => {
        const { id } = req.params;

        db('accounts').where({id}).del()
        .then(account => {
        if (!id) {
            res
            .status(404)
            .json({
                message: `Cannot find account with id:${id}.`
            })
        } else {
            res
            .status(200)
            .json({
                message: `Account successfully deleted.`
            })
            .catch (err => {
                res
                .status(500)
                .json({
                    message: 'Failed to DELETE account.', err
                });
            });
        }
    })
});

// export router
module.exports = router;