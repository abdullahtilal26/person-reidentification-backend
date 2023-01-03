module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
  });
  return Role;
};
