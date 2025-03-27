import Task from '../models/task';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    tasks: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error('Unauthorized');
      return Task.findAll({ where: { userId: user.id } });
    },
    task: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Unauthorized');
      return Task.findOne({ where: { id, userId: user.id } });
    },
  },
  Mutation: {
    createTask: async (_: any, { title, description, status }: any, { user }: any) => {
      if (!user) throw new Error('Unauthorized');
      return Task.create({ title, description, status, userId: user.id });
    },
    updateTask: async (_: any, { id, title, description, status }: any, { user }: any) => {
      if (!user) throw new Error('Unauthorized');
      const task = await Task.findOne({ where: { id, userId: user.id } });
      if (!task) throw new Error('Task not found');
      return task.update({ title, description, status });
    },
    deleteTask: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Unauthorized');
      const task = await Task.findOne({ where: { id, userId: user.id } });
      if (!task) throw new Error('Task not found');
      await task.destroy();
      return true;
    },
    signup: async (_: any, { name, email, password }: any) => {
      return User.create({ name, email, password });
    },
    login: async (_: any, { email, password }: any, { req }: any) => {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      req.session.userId = user.id;
      return 'Logged in successfully';
    },
  },
  Task: {
    user: async (task: any) => User.findByPk(task.userId),
  },
};