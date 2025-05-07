const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("contacts", {
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,     
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
