import { dashboardMetrics, recentActivities, upcomingTasks } from '@/services/mockData/dashboard.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getDashboardMetrics = async () => {
  await delay(300);
  return dashboardMetrics.map(metric => ({
    ...metric,
    formatValue: metric.type === 'currency' 
      ? (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
      : metric.type === 'percentage'
      ? (val) => `${val}%`
      : (val) => val.toLocaleString()
  }));
};

export const getRecentActivities = async () => {
  await delay(200);
  return [...recentActivities];
};

export const getUpcomingTasks = async () => {
  await delay(250);
  return [...upcomingTasks];
};