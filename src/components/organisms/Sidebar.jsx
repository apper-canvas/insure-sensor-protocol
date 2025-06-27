import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ mobile = false, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    { name: 'Clients', href: '/clients', icon: 'Users' },
    { name: 'Policies', href: '/policies', icon: 'Shield' },
    { name: 'Pipeline', href: '/pipeline', icon: 'TrendingUp' },
    { name: 'Tasks', href: '/tasks', icon: 'CheckSquare' },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-neutral-200 shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Shield" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">InsureHub</h1>
            <p className="text-xs text-neutral-500">CRM</p>
          </div>
        </div>
        
        {mobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.href}
              onClick={mobile ? onClose : undefined}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-r-2 border-primary-500'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ApperIcon
                    name={item.icon}
                    className={`mr-3 w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-500'
                    }`}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-700 truncate">
              Insurance Agent
            </p>
            <p className="text-xs text-neutral-500 truncate">
              agent@insurehub.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;