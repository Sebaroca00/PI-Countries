const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const { loadCountriesToDatabase } = require('../server/src/controllers/countryControllers.js'); 

conn.sync({ force: true })
  .then(() => {
    return loadCountriesToDatabase();
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));

