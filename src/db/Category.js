const CategoryModel = (db, DataTypes) => {
  const Category = db.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Category;
};

export default CategoryModel;
