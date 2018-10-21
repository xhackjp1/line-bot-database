const {
  Client
} = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
});

//
exports.get_words = function(callback) {

  var query = `select id, choice1, choice2, choice3, choice4, imageUrl from quiz;`;
  client.query(
    query,
    function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      callback(result);
    }
  );
}

// exports.add_words = function(callback) {
//
// }

// exports.delete_words = function(callback) {
//
// }