import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DataTable from '@/components/molecules/DataTable';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';
import { getAllTasks, updateTask, deleteTask } from '@/services/api/taskService';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await getAllTasks();
      setTasks(data);
      setFilteredTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSearch = (term, filter) => {
    let filtered = tasks;
    
    // Apply priority filter
    if (filter !== 'all') {
      if (filter === 'completed') {
        filtered = filtered.filter(task => task.completed);
      } else if (filter === 'overdue') {
        filtered = filtered.filter(task => 
          !task.completed && new Date(task.dueDate) < new Date()
        );
      } else {
        filtered = filtered.filter(task => 
          task.priority.toLowerCase() === filter.toLowerCase()
        );
      }
    }
    
    // Apply search term
    if (term) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.description.toLowerCase().includes(term.toLowerCase()) ||
        task.relatedTo.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredTasks(filtered);
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await updateTask(taskId, { completed: !completed });
      await loadTasks();
      toast.success(`Task ${!completed ? 'completed' : 'reopened'} successfully`);
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Update error:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        await loadTasks();
        toast.success('Task deleted successfully');
      } catch (err) {
        toast.error('Failed to delete task');
        console.error('Delete error:', err);
      }
    }
  };

  const getTaskStatus = (task) => {
    if (task.completed) return 'completed';
    if (new Date(task.dueDate) < new Date()) return 'overdue';
    return 'pending';
  };

  const columns = [
    { 
      key: 'completed', 
      label: '', 
      sortable: false,
      render: (value, row) => (
        <button
          onClick={() => handleToggleComplete(row.Id, row.completed)}
          className="p-1 hover:bg-neutral-100 rounded"
        >
          <ApperIcon 
            name={value ? "CheckCircle2" : "Circle"} 
            className={`w-5 h-5 ${value ? 'text-accent-600' : 'text-neutral-400'}`} 
          />
        </button>
      )
    },
    { key: 'title', label: 'Task' },
    { key: 'priority', label: 'Priority', type: 'status' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
    { key: 'relatedTo', label: 'Related To' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value, row) => (
        <StatusBadge status={getTaskStatus(row)} />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (value, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => toast.info('Edit task feature coming soon!')}
            className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-primary-600"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteTask(row.Id)}
            className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-red-600"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </button>
        </div>
      )
    },
  ];

  const filterOptions = [
    { label: 'All Tasks', value: 'all' },
    { label: 'High Priority', value: 'high' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'Low Priority', value: 'low' },
    { label: 'Completed', value: 'completed' },
    { label: 'Overdue', value: 'overdue' },
  ];

  // Calculate summary stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const overdueTasks = tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length;
  const highPriorityTasks = tasks.filter(t => !t.completed && t.priority === 'High').length;

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Tasks</h1>
          <p className="text-neutral-600 mt-2">Manage your daily tasks and reminders</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4 mr-2 inline" />
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                viewMode === 'calendar'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <ApperIcon name="Calendar" className="w-4 h-4 mr-2 inline" />
              Calendar
            </button>
          </div>
          
          <Button icon="Plus" onClick={() => toast.info('Add task feature coming soon!')}>
            Add Task
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: totalTasks, icon: 'CheckSquare', color: 'primary' },
          { label: 'Completed', value: completedTasks, icon: 'CheckCircle2', color: 'accent' },
          { label: 'Overdue', value: overdueTasks, icon: 'AlertCircle', color: 'neutral' },
          { label: 'High Priority', value: highPriorityTasks, icon: 'AlertTriangle', color: 'neutral' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-lg flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wide">{stat.label}</p>
                <p className="text-lg font-bold text-neutral-800">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="card-premium p-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <SearchBar
            placeholder="Search tasks by title, description, or related item..."
            onSearch={handleSearch}
            filters={filterOptions}
          />
        </div>

        {/* Results */}
        {viewMode === 'list' ? (
          filteredTasks.length === 0 && tasks.length === 0 ? (
            <Empty 
              title="No tasks found"
              description="Stay organized by creating your first task or reminder"
              actionLabel="Add Task"
              onAction={() => toast.info('Add task feature coming soon!')}
              icon="CheckSquare"
            />
          ) : filteredTasks.length === 0 ? (
            <Empty 
              title="No tasks match your search"
              description="Try adjusting your search criteria or filter settings"
              icon="Search"
            />
          ) : (
            <DataTable
              data={filteredTasks}
              columns={columns}
              pageSize={15}
            />
          )
        ) : (
          <div className="text-center py-12">
            <ApperIcon name="Calendar" className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Calendar View</h3>
            <p className="text-neutral-600 mb-4">Calendar view feature coming soon!</p>
            <Button 
              variant="secondary" 
              onClick={() => setViewMode('list')}
            >
              Switch to List View
            </Button>
          </div>
        )}
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks > 0 && (
        <motion.div
          className="card bg-gradient-to-r from-red-50 to-red-100 border-red-200 p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertCircle" className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800">Overdue Tasks</h3>
              <p className="text-red-700">
                You have {overdueTasks} overdue {overdueTasks === 1 ? 'task' : 'tasks'} that need attention.
              </p>
            </div>
            <Button variant="secondary" size="sm">
              View Overdue
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Tasks;