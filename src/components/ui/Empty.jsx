import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  actionLabel = "Add New",
  onAction,
  icon = "Database"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
      </motion.div>
      
      <h3 className="text-xl font-semibold gradient-text mb-2">
        {title}
      </h3>
      
      <p className="text-neutral-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>{actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;