const { application } = require('express')
const minimist = require('minimist');

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/', (req, res) => {

})

app.get('/app', (req, res) => {
// Respond with status 200
    res.statusCode = 200;
// Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.get('/app/flip', (req, res) => {
    res.status(200).json({ "flip" : coinFlip()})
})

app.get('/app/flips/:number', (req, res) => {
    var flips = coinFlips(req.params.number);
    res.status(200).json({ "raw" : flips, "summary" : countFlips(flips)})
})

app.get('/app/flip/call/:something', (req, res) => {
    var flip = flipACoin(req.params.something)
    res.status(200).json(flip)
})

app.use(function(req, res) {
    res.status(404).send("404 NOT FOUND")
    res.type("text/plain")
})

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
    var x = Math.floor(Math.random() * 2);
    if (x == 1) {
      return "heads";
    }
    return "tails";
  }
  
  /** Multiple coin flips
   * 
   * Write a function that accepts one parameter (number of flips) and returns an array of 
   * resulting "heads" or "tails".
   * 
   * @param {number} flips 
   * @returns {string[]} results
   * 
   * example: coinFlips(10)
   * returns:
   *  [
        'heads', 'heads',
        'heads', 'tails',
        'heads', 'tails',
        'tails', 'heads',
        'tails', 'heads'
      ]
   */
  
  function coinFlips(flips) {
    var arr = [];
    for (var i = 0; i < flips; i++) {
      arr.push(coinFlip());
    }
    return arr;
  }
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
  function countFlips(array) {
    var headNum = 0;
    var tailNum = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        headNum++;
      } else {
        tailNum++;
      }
    }
  
    return {heads: headNum, tails: tailNum};
  }
  
  /** Flip a coin!
   * 
   * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
   * 
   * @param {string} call 
   * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
   * 
   * example: flipACoin('tails')
   * returns: { call: 'tails', flip: 'heads', result: 'lose' }
   */
  
  function flipACoin(call) {
    var headsOrTails = coinFlip();
    var result;
    if (headsOrTails == call) {
      result = "win";
    } else {
      result = "lose";
    }
    return {call: call, flip: headsOrTails, result: result};
  }