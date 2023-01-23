import { Task } from 'features/types';
import { sortTasks } from './sort-tasks';

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

describe('Test Sorting function', () => {
  // Test sorting by title (ascending)
  test('it should sort task items by title in ascending order', () => {
    const sortedTasks = sortTasks(tasks, { sort: 'asc', type: 'alpha' });
    expect(sortedTasks[0].title).toBe('First Task');
    expect(sortedTasks[1].title).toBe('Second Task');
    expect(sortedTasks[2].title).toBe('Third Task');
  });

  // Test sorting by title (descending)
  test('it should sort task items by title in descending order', () => {
    const sortedTasks = sortTasks(tasks, { sort: 'desc', type: 'alpha' });
    expect(sortedTasks[0].title).toBe('Third Task');
    expect(sortedTasks[1].title).toBe('Second Task');
    expect(sortedTasks[2].title).toBe('First Task');
  });

  // Test sorting by date (ascending)
  test('it should sort task items by date of creation in ascending order', () => {
    const sortedTasks = sortTasks(tasks, { sort: 'asc', type: 'date' });
    expect(sortedTasks[0].title).toBe('First Task');
    expect(sortedTasks[1].title).toBe('Second Task');
    expect(sortedTasks[2].title).toBe('Third Task');
  });

  // Test sorting by date (descending)
  test('it should sort task items by date of creation in descending order', () => {
    const sortedTasks = sortTasks(tasks, { sort: 'desc', type: 'date' });
    expect(sortedTasks[0].title).toBe('Third Task');
    expect(sortedTasks[1].title).toBe('Second Task');
    expect(sortedTasks[2].title).toBe('First Task');
  });

  // Test sorting by priority (ascending)
  test('it should sort task items by priority in ascending order', () => {
    const sortedTasks = sortTasks(tasks, { sort: 'asc', type: 'priority' });
    expect(sortedTasks[0].title).toBe('Second Task');
    expect(sortedTasks[1].title).toBe('First Task');
    expect(sortedTasks[2].title).toBe('Third Task');
  });

  // Test sorting by priority (descending)
  test('it should sort task items by priority in descending order', () => {
    const sortedTasks = sortTasks(tasks, { sort: 'desc', type: 'priority' });
    expect(sortedTasks[0].title).toBe('Third Task');
    expect(sortedTasks[1].title).toBe('Second Task');
    expect(sortedTasks[2].title).toBe('First Task');
  });
});
