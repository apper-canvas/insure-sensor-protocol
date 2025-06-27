import { toast } from 'react-toastify';

export const getAllPolicies = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "policyNumber" } },
        { field: { Name: "type" } },
        { field: { Name: "provider" } },
        { field: { Name: "premium" } },
        { field: { Name: "coverage" } },
        { field: { Name: "startDate" } },
        { field: { Name: "renewalDate" } },
        { field: { Name: "status" } },
        { field: { Name: "clientId" } }
      ]
    };
    
    const response = await apperClient.fetchRecords('policy', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching policies:", error);
    toast.error('Failed to load policies');
    return [];
  }
};

export const getPolicyById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "policyNumber" } },
        { field: { Name: "type" } },
        { field: { Name: "provider" } },
        { field: { Name: "premium" } },
        { field: { Name: "coverage" } },
        { field: { Name: "startDate" } },
        { field: { Name: "renewalDate" } },
        { field: { Name: "status" } },
        { field: { Name: "clientId" } }
      ]
    };
    
    const response = await apperClient.getRecordById('policy', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching policy with ID ${id}:`, error);
    toast.error('Failed to load policy');
    return null;
  }
};

export const createPolicy = async (policyData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Name: policyData.Name || policyData.policyNumber,
        policyNumber: policyData.policyNumber,
        type: policyData.type,
        provider: policyData.provider,
        premium: parseFloat(policyData.premium),
        coverage: parseInt(policyData.coverage),
        startDate: policyData.startDate,
        renewalDate: policyData.renewalDate,
        status: policyData.status,
        clientId: parseInt(policyData.clientId)
      }]
    };
    
    const response = await apperClient.createRecord('policy', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} policies:${JSON.stringify(failedRecords)}`);
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }
      
      return successfulRecords.length > 0 ? successfulRecords[0].data : null;
    }
    
    return null;
  } catch (error) {
    console.error("Error creating policy:", error);
    toast.error('Failed to create policy');
    return null;
  }
};

export const updatePolicy = async (id, policyData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      records: [{
        Id: parseInt(id),
        Name: policyData.Name || policyData.policyNumber,
        policyNumber: policyData.policyNumber,
        type: policyData.type,
        provider: policyData.provider,
        premium: parseFloat(policyData.premium),
        coverage: parseInt(policyData.coverage),
        startDate: policyData.startDate,
        renewalDate: policyData.renewalDate,
        status: policyData.status,
        clientId: parseInt(policyData.clientId)
      }]
    };
    
    const response = await apperClient.updateRecord('policy', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} policies:${JSON.stringify(failedUpdates)}`);
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }
      
      return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
    }
    
    return null;
  } catch (error) {
    console.error("Error updating policy:", error);
    toast.error('Failed to update policy');
    return null;
  }
};

export const deletePolicy = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord('policy', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} policies:${JSON.stringify(failedDeletions)}`);
        failedDeletions.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
    
    return false;
  } catch (error) {
    console.error("Error deleting policy:", error);
    toast.error('Failed to delete policy');
    return false;
  }
};