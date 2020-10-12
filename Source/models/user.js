const { sequelize, DataTypes } = require("../database/sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    first_name: {
      type: DataTypes.STRING,
      validate: { notNull: false },
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      validate: { notNull: false },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isLowercase: true, isEmail: true, notNull: false },
      allowNull: false,
    },
    passwd: { type: DataTypes.STRING, allowNull: false },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (user, opition) => {
        const hash = await bcrypt.hash(user.passwd, 10);

        user.passwd = hash;
      },
    },
  }
);

module.exports = User;
