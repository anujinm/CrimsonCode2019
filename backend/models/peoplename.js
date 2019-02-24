'use strict';
module.exports = (sequelize, DataTypes) => {
  const PeopleName = sequelize.define('PeopleName', {
    name: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    fraction: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
    birthCount: DataTypes.INTEGER,
    jsonData: DataTypes.TEXT,

  }, {});
  PeopleName.associate = function(models) {
    PeopleName.hasMany(models.Like);
  };
  return PeopleName;
};
