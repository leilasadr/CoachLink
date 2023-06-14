const express = require('express');
const {
	rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// this GET route retrieves all of the user's accepted gigs
// for the user to see in Overview 
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  let sqlQuery = `
    SELECT * FROM "gig"
      WHERE "coach_user_id"=($1);`;

  let sqlValues = [req.user.id];

  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      console.log('results from gig GET route:', dbRes.rows);
      res.send(dbRes.rows);
    }).catch((dbErr) => {
      console.log('error with gig GET route:', dbErr);
      res.sendStatus(500);
    })
});

// this GET route retrieves all available gigs for user to 
// check and then apply as appropriate: 
router.get('/available', rejectUnauthenticated, (req, res) => {
  let sqlQuery = `
  SELECT * FROM "gig"
    WHERE "status"=true;`;
  
  pool.query(sqlQuery)
    .then((dbRes) => {
      console.log('GET results for available gigs:', dbRes.rows);
      res.send(dbRes.rows);
    }).catch((dbErr) => {
      console.log('error with GET gigs route:', dbErr);
      res.sendStatus(500);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;