module.exports = (sequelize, DataTypes) => {
  const Directories = sequelize.define("directories", {
    dirpath: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  });
  return Directories;
};
