import { clients } from '@/services/mockData/clients.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let clientsData = [...clients];

export const getAllClients = async () => {
  await delay(300);
  return [...clientsData];
};

export const getClientById = async (id) => {
  await delay(200);
  const client = clientsData.find(c => c.Id === parseInt(id));
  if (!client) throw new Error('Client not found');
  return { ...client };
};

export const createClient = async (clientData) => {
  await delay(400);
  const maxId = Math.max(...clientsData.map(c => c.Id), 0);
  const newClient = {
    ...clientData,
    Id: maxId + 1,
    createdAt: new Date().toISOString()
  };
  clientsData.push(newClient);
  return { ...newClient };
};

export const updateClient = async (id, clientData) => {
  await delay(400);
  const index = clientsData.findIndex(c => c.Id === parseInt(id));
  if (index === -1) throw new Error('Client not found');
  
  clientsData[index] = { ...clientsData[index], ...clientData };
  return { ...clientsData[index] };
};

export const deleteClient = async (id) => {
  await delay(300);
  const index = clientsData.findIndex(c => c.Id === parseInt(id));
  if (index === -1) throw new Error('Client not found');
  
  clientsData.splice(index, 1);
  return true;
};