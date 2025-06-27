import { tasks } from '@/services/mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasksData = [...tasks];

export const getAllTasks = async () => {
  await delay(300);
  return [...tasksData];
};

export const getTaskById = async (id) => {
  await delay(200);
  const task = tasksData.find(t => t.Id === parseInt(id));
  if (!task) throw new Error('Task not found');
  return { ...task };
};

export const createTask = async (taskData) => {
  await delay(400);
  const maxId = Math.max(...tasksData.map(t => t.Id), 0);
  const newTask = {
    ...taskData,
    Id: maxId + 1,
    completed: false
  };
  tasksData.push(newTask);
  return { ...newTask };
};

export const updateTask = async (id, taskData) => {
  await delay(350);
  const index = tasksData.findIndex(t => t.Id === parseInt(id));
  if (index === -1) throw new Error('Task not found');
  
  tasksData[index] = { ...tasksData[index], ...taskData };
  return { ...tasksData[index] };
};

export const deleteTask = async (id) => {
  await delay(300);
  const index = tasksData.findIndex(t => t.Id === parseInt(id));
  if (index === -1) throw new Error('Task not found');
  
  tasksData.splice(index, 1);
  return true;
};