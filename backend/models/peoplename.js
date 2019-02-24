'use strict';
module.exports = (sequelize, DataTypes) => {
  const PeopleName = sequelize.define('PeopleName', {
    name: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    fraction: DataTypes.INTEGER
  }, {});
  PeopleName.associate = function(models) {
    // associations can be defined here
  };
  return PeopleName;
};