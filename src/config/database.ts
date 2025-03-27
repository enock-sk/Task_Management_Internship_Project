import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Update with your DB host
  username: 'your-username',
  password: 'your-password',
  database: 'task_management',
  logging: false,
});

export default sequelize;