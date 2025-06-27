import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const Header = ({ onMenuClick }) => {
  const [notifications] = useState([
    { id: 1, message: "Policy renewal due for John Doe", time: "2 hours ago", type: "warning" },
    { id: 2, message: "New lead: Sarah Wilson", time: "4 hours ago", type: "info" },
    { id: 3, message: "Quote approved for Mike Johnson", time: "1 day ago", type: "success" },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const handleGlobalSearch = (term, filter) => {
    console.log('Global search:', { term, filter });
    // Implement global search logic here
  };

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
        >
          <ApperIcon name="Menu" className="w-6 h-6" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
          <SearchBar
            placeholder="Search clients, policies, leads..."
            onSearch={handleGlobalSearch}
            filters={[
              { label: 'All', value: 'all' },
              { label: 'Clients', value: 'clients' },
              { label: 'Policies', value: 'policies' },
              { label: 'Leads', value: 'leads' },
            ]}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors duration-200 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="Bell" className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></span>
              )}
            </motion.button>

            {showNotifications && (
              <motion.div
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-premium border border-neutral-200 py-2 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="px-4 py-2 border-b border-neutral-100">
                  <h3 className="text-sm font-semibold text-neutral-700">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0">
                      <p className="text-sm text-neutral-700">{notification.message}</p>
                      <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-neutral-100">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Actions */}
          <motion.button
            className="btn-primary text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Quick Add</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;