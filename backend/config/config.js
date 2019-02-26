module.exports = {
    development: {
        username: "root",
        password: "Pizda123$",
        database: "names_backend",
        host: "35.236.54.90",
        dialect: "mysql",
        operatorsAliases: false
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        operatorsAliases: false
    },
    production: {
        username: process.env.CC2019_MYSQL_USER,
        password: process.env.CC2019_MYSQL_PASSWORD,
        database: process.env.CC2019_MYSQL_DATABASE,
        host: process.env.CC2019_MYSQL_HOST,
        dialectOptions: {
          socketPath: process.env.CC2019_MYSQL_HOST
        },
        dialect: "mysql",
        operatorsAliases: false
    }
};
