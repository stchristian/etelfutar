const Sequelize = require('sequelize');
const fs = require("fs");

const path = process.env.DB_PATH;

const db = {};

//What we define here, applies to all models created with sequelize
const sequelize = new Sequelize(path, {
  define: {
    timestamps: false
  },
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  }
});

db.sequelize = sequelize;

// Importing data models
const MenuItem = sequelize.import("../models/MenuItems");
const User = sequelize.import("../models/User");
const Order = sequelize.import("../models/Order");
const OrderItem = sequelize.import("../models/OrderItem");

const models = {
  MenuItem,
  User,
  Order,
  OrderItem
}

db.models = models;

// Create associations
Object.keys(models).forEach((key) => {
  if (models[key].associate) {
    models[key].associate(models);
  }
})

// Recreate tables and seed data and sync
var initScript = fs.readFileSync("sample_data.sql", 'utf8');
sequelize.transaction((transaction) => {
  const options = {
    raw: true,
    transaction
  };
  return sequelize.query('SET FOREIGN_KEY_CHECKS = 0;', options)
    .then(() => {
      return sequelize.query(initScript, options);
    })
    .then(() => {
      return MenuItem.sync({transaction});
    })
    .then(() => {
      return OrderItem.sync({ force: true, transaction });
    })
    .then(() => {
      return User.sync({ force: true, transaction });
    })
    .then(() => {
      return Order.sync({ force: true, transaction });
    })
    .then(() => {
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 1;', options);
    });
});

module.exports = db;
