const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

const db = {};

let sequelize = new Sequelize(
  'postgres://ugbymvayzhvbed:447be0b26a2383a88f036da66a2db95f1ff35bc5bf1f5c3e34bd2dab049676ee@ec2-174-129-33-27.compute-1.amazonaws.com:5432/d13nq1p72pshnn',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
