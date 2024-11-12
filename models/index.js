const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations after models are loaded
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Import models
db.Vendor = require('./vendors')(sequelize, Sequelize.DataTypes);
db.Rider = require('./riders')(sequelize, Sequelize.DataTypes);
db.Customer = require('./customers')(sequelize, Sequelize.DataTypes);
db.Order = require('./orders')(sequelize, Sequelize.DataTypes);

// Define associations
db.Vendor.hasMany(db.Order, { foreignKey: 'vendorId' });
db.Order.belongsTo(db.Vendor, { foreignKey: 'vendorId' });

db.Rider.hasMany(db.Order, { foreignKey: 'riderId' });
db.Order.belongsTo(db.Rider, { foreignKey: 'riderId' });

db.Customer.hasMany(db.Order, { foreignKey: 'customerId' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customerId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
