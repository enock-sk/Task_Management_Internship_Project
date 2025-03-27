import Task from '../models/task';
import User from '../models/user';
import sequelize from '../config/database';

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await User.create({ name: 'Test User', email: 'test@example.com', password: 'password123' });
});

afterAll(async () => await sequelize.close());

describe('Task Model', () => {
  test('should create a task', async () => {
    const task = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      userId: 1,
    });
    expect(task.title).toBe('Test Task');
  });
});