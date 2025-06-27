import { toast } from 'react-toastify';

export const getDashboardMetrics = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "value" } },
        { field: { Name: "change" } },
        { field: { Name: "changeType" } },
        { field: { Name: "icon" } },
        { field: { Name: "color" } },
        { field: { Name: "type" } }
      ]
    };
    
    const response = await apperClient.fetchRecords('dashboard_metric', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return (response.data || []).map(metric => ({
      ...metric,
      formatValue: metric.type === 'currency' 
        ? (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
        : metric.type === 'percentage'
        ? (val) => `${val}%`
        : (val) => val.toLocaleString()
    }));
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    toast.error('Failed to load dashboard metrics');
    return [];
  }
};

export const getRecentActivities = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "type" } },
        { field: { Name: "description" } },
        { field: { Name: "clientName" } },
        { field: { Name: "timestamp" } }
      ],
      orderBy: [
        {
          fieldName: "timestamp",
          sorttype: "DESC"
        }
      ],
      pagingInfo: {
        limit: 10,
        offset: 0
      }
    };
    
    const response = await apperClient.fetchRecords('recent_activity', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    toast.error('Failed to load recent activities');
    return [];
  }
};

export const getUpcomingTasks = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title" } },
        { field: { Name: "priority" } },
        { field: { Name: "dueDate" } },
        { field: { Name: "relatedTo" } }
      ],
      orderBy: [
        {
          fieldName: "dueDate",
          sorttype: "ASC"
        }
      ],
      pagingInfo: {
        limit: 10,
        offset: 0
      }
    };
    
    const response = await apperClient.fetchRecords('upcoming_task', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching upcoming tasks:", error);
    toast.error('Failed to load upcoming tasks');
    return [];
  }
};