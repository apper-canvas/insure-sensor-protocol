import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MetricCard from '@/components/molecules/MetricCard';
import DataTable from '@/components/molecules/DataTable';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { getDashboardMetrics, getRecentActivities, getUpcomingTasks } from '@/services/api/dashboardService';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [metricsData, activitiesData, tasksData] = await Promise.all([
        getDashboardMetrics(),
        getRecentActivities(),
        getUpcomingTasks()
      ]);
      
      setMetrics(metricsData);
      setActivities(activitiesData);
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const activityColumns = [
    { key: 'type', label: 'Type', sortable: false },
    { key: 'description', label: 'Description' },
    { key: 'clientName', label: 'Client' },
    { key: 'timestamp', label: 'Time', type: 'date' },
  ];

  const taskColumns = [
    { key: 'title', label: 'Task' },
    { key: 'priority', label: 'Priority', type: 'status' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
    { key: 'relatedTo', label: 'Related To' },
  ];

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-neutral-600 mt-2">Welcome back! Here's your business overview.</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-neutral-500">Today</p>
          <p className="text-lg font-semibold text-neutral-700">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
              formatValue={metric.formatValue}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          className="card-premium p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Activity" className="w-5 h-5 text-secondary-600" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-800">Recent Activities</h2>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>

          {activities.length === 0 ? (
            <Empty 
              title="No recent activities"
              description="Your recent client interactions will appear here"
              icon="Activity"
            />
          ) : (
            <DataTable
              data={activities}
              columns={activityColumns}
              pagination={false}
              sortable={false}
            />
          )}
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          className="card-premium p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-accent-600" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-800">Upcoming Tasks</h2>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>

          {tasks.length === 0 ? (
            <Empty 
              title="No upcoming tasks"
              description="Your scheduled tasks and reminders will appear here"
              icon="CheckSquare"
            />
          ) : (
            <DataTable
              data={tasks}
              columns={taskColumns}
              pagination={false}
              sortable={false}
            />
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="card-premium p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Client', icon: 'UserPlus', color: 'primary' },
            { label: 'Create Policy', icon: 'Shield', color: 'secondary' },
            { label: 'New Lead', icon: 'Target', color: 'accent' },
            { label: 'Schedule Task', icon: 'Calendar', color: 'neutral' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              className="p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon 
                name={action.icon} 
                className="w-8 h-8 text-neutral-400 group-hover:text-primary-600 mx-auto mb-2" 
              />
              <p className="text-sm font-medium text-neutral-600 group-hover:text-primary-700">
                {action.label}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;