import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // cria um arquivo no diretório atual
    },
    useNullAsDefault: true,
    pool: {
        // A próxima linha habilita as contraints de foreign key no sqlite
        // Info: https://github.com/knex/knex/issues/453#issuecomment-54160324
        afterCreate: function(cnct: any, cb: any) {
            cnct.run('PRAGMA foreign_keys = ON', cb);
        }
    }
});

export default connection;
