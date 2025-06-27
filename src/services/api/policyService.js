import { policies } from '@/services/mockData/policies.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let policiesData = [...policies];

export const getAllPolicies = async () => {
  await delay(350);
  return [...policiesData];
};

export const getPolicyById = async (id) => {
  await delay(200);
  const policy = policiesData.find(p => p.Id === parseInt(id));
  if (!policy) throw new Error('Policy not found');
  return { ...policy };
};

export const createPolicy = async (policyData) => {
  await delay(450);
  const maxId = Math.max(...policiesData.map(p => p.Id), 0);
  const newPolicy = {
    ...policyData,
    Id: maxId + 1
  };
  policiesData.push(newPolicy);
  return { ...newPolicy };
};

export const updatePolicy = async (id, policyData) => {
  await delay(400);
  const index = policiesData.findIndex(p => p.Id === parseInt(id));
  if (index === -1) throw new Error('Policy not found');
  
  policiesData[index] = { ...policiesData[index], ...policyData };
  return { ...policiesData[index] };
};

export const deletePolicy = async (id) => {
  await delay(300);
  const index = policiesData.findIndex(p => p.Id === parseInt(id));
  if (index === -1) throw new Error('Policy not found');
  
  policiesData.splice(index, 1);
  return true;
};