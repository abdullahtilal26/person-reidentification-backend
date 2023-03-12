module.exports = (sequelize, DataTypes) => {
  const Directories = sequelize.define("directories", {
    dir_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
