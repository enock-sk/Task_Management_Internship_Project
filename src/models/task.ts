import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'pending' | 'in-progress' | 'completed';
  public userId!: number;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending',
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'Task' }
);

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

export default Task;