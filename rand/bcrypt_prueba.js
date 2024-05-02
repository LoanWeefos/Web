const bcrypt = require('bcrypt');

const plaintextPassword = 'secretPassword';

bcrypt.hash(plaintextPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
  bcrypt.compare(plaintextPassword, hash, (err, result) => {
    if (err) throw err;
    console.log('Password Correct:', result); // true
  });
});