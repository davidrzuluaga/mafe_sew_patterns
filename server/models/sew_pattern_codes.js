module.exports = (sequelize, DataTypes) => {
  const sew_pattern_codes = sequelize.define(
    'sew_pattern_codes',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      code: { type: DataTypes.TEXT, allowNull: false },
      sew_pattern_id: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      expiration: { type: DataTypes.DATE, allowNull: true },
      used: { type: DataTypes.DATE, allowNull: true },
    },
    {}
  );

  return sew_pattern_codes;
};