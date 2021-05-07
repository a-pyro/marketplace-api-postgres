import sequelize from 'sequelize';
const { Sequelize, DataTypes } = sequelize;

export const db = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { port: process.env.PGPORT, host: process.env.PGHOST, dialect: 'postgres' }
);
import ProductModel from './Product.js';
import UserModel from './User.js';
import CategoryModel from './Category.js';
import ReviewModel from './Review.js';

export const Product = ProductModel(db, DataTypes);
export const User = UserModel(db, DataTypes);
export const Category = CategoryModel(db, DataTypes);
export const Review = ReviewModel(db, DataTypes);

User.hasMany(Review); //fk(User) in User
Review.belongsTo(User);

Product.hasMany(Review); //fk(Product) in review
Review.belongsTo(Product);

Category.hasMany(Product); //fk(category) in Product
Product.belongsTo(Category);

db.authenticate()
  .then(() => console.log('Connection established'))
  .catch((e) => console.log(e));

export default { db, Product, User, Category, Review };
