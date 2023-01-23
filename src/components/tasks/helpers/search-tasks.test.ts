import { Task } from 'features/types';
import { searchTasks } from './search-tasks';

const tasks: Task[] = [
  {
    id: 'tsk_1',
    createdAt: '2022-12-31T21:56:41.997Z',
    updatedAt: '2023-01-04T18:55:50.258Z',
    title: 'First Task',
    details: 'this is my 1st task',
    status: 'Todo',
    priority: 'Normal',
    userId: 'usr_1',
    expireDate: '',
    isExpired: false
  },
  {
    id: 'tsk_2',
    createdAt: '2023-01-01T21:56:51.220Z',
    updatedAt: '2023-01-04T18:55:58.259Z',
    title: 'Second Task',
    details: 'this is my 2nd task',
    status: 'Completed',
    priority: 'Normal',
    userId: 'usr_1',
    expireDate: '',
    isExpired: false
  },
  {
    id: 'tsk_3',
    createdAt: '2023-01-04T18:54:15.951Z',
    updatedAt: '2023-01-04T18:54:15.951Z',
    title: 'Third Task',
    details: 'this is my 3rd task',
    status: 'InProgress',
    priority: 'High',
    userId: 'usr_1',
    expireDate: '',
    isExpired: false
  }
];

describe('searchTasks', () => {
  it('should return an empty array if tasks is an empty array and query is empty', () => {
    const query = '';
    const result = searchTasks([], query);
    expect(result).toEqual([]);
  });

  it('should return an empty array if tasks is an empty array and query is not empty', () => {
    const query = 'task';
    const result = searchTasks([], query);
    expect(result).toEqual([]);
  });

  it('should return the same array if tasks is not an empty array and query is empty', () => {
    const query = '';
    const result = searchTasks(tasks, query);
    expect(result).toEqual(tasks);
  });

  it('should return an array of tasks that where every task item contains the query word', () => {
    const query = 'task';
    const result = searchTasks(tasks, query);
    expect(result).toEqual(tasks);
  });

  it('should return an array of tasks that match the search query in the title', () => {
    const query = 'First';
    const result = searchTasks(tasks, query);
    expect(result).toEqual([
      {
        id: 'tsk_1',
        createdAt: '2022-12-31T21:56:41.997Z',
        updatedAt: '2023-01-04T18:55:50.258Z',
        title: 'First Task',
        details: 'this is my 1st task',
        status: 'Todo',
        priority: 'Normal',
        userId: 'usr_1'
      }
    ]);
  });

  it('should return an array of tasks that match the search query in the details', () => {
    const query = '1st task';
    const result = searchTasks(tasks, query);
    expect(result).toEqual([
      {
        id: 'tsk_1',
        createdAt: '2022-12-31T21:56:41.997Z',
        updatedAt: '2023-01-04T18:55:50.258Z',
        title: 'First Task',
        details: 'this is my 1st task',
        status: 'Todo',
        priority: 'Normal',
        userId: 'usr_1'
      }
    ]);
  });

  it('should return an array of tasks that match the search query in the title and details', () => {
    const query = 'task';
    const result = searchTasks(tasks, query);
    expect(result).toEqual(tasks);
  });
});
