import { leads } from '@/services/mockData/leads.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let leadsData = [...leads];

export const getAllLeads = async () => {
  await delay(300);
  return [...leadsData];
};

export const getLeadById = async (id) => {
  await delay(200);
  const lead = leadsData.find(l => l.Id === parseInt(id));
  if (!lead) throw new Error('Lead not found');
  return { ...lead };
};

export const createLead = async (leadData) => {
  await delay(400);
  const maxId = Math.max(...leadsData.map(l => l.Id), 0);
  const newLead = {
    ...leadData,
    Id: maxId + 1
  };
  leadsData.push(newLead);
  return { ...newLead };
};

export const updateLead = async (id, leadData) => {
  await delay(350);
  const index = leadsData.findIndex(l => l.Id === parseInt(id));
  if (index === -1) throw new Error('Lead not found');
  
  leadsData[index] = { ...leadsData[index], ...leadData };
  return { ...leadsData[index] };
};

export const deleteLead = async (id) => {
  await delay(300);
  const index = leadsData.findIndex(l => l.Id === parseInt(id));
  if (index === -1) throw new Error('Lead not found');
  
  leadsData.splice(index, 1);
  return true;
};