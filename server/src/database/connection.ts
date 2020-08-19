import knex from 'knex'; // write queries SQL as JS script
import path from 'path';

// migrations - control bd versions

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite') // __dirname = directory where the file is being executed
  },
  useNullAsDefault: true,
});

export default db;