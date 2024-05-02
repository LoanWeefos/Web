const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
  username: 'wikit',
  email: 'wikit@eban.com',
  password: 'contraseña123'
});

newUser.save()
  .then((user) => {
    console.log('Usuario guardado:', user);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
