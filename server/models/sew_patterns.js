module.exports = (sequelize, DataTypes) => {
  const sew_patterns = sequelize.define(
    'sew_patterns',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      url: { type: DataTypes.TEXT, allowNull: false },
      title: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      expiration: { type: DataTypes.DATE, allowNull: true },
    },
    {}
  );

  return sew_patterns;
};
