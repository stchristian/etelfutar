/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const MenuItem = sequelize.define('MenuItems', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Category: {
      type: DataTypes.STRING(120),
      allowNull: false,
      defaultValue: ''
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    Name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      defaultValue: ''
    },
    Price: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    Spicy: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    Vegatarian: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'MenuItems',
  });

  MenuItem.associate = (models) => {
    
  }

  return MenuItem
};
