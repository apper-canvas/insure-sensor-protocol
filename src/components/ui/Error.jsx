import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-500" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-neutral-800 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-neutral-600 text-center mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;