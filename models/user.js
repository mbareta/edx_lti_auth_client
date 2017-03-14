'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        // associations can be defined here
      }
    }
  });

  return User;
};
