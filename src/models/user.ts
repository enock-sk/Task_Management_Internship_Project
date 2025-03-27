import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'User',
    hooks: { beforeCreate: (user) => user.hashPassword() },
  }
);

export default User;