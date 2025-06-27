import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon, 
  color = 'primary',
  formatValue = (val) => val 
}) => {
  const colorSchemes = {
    primary: {
      bg: 'from-primary-500 to-primary-600',
      icon: 'bg-primary-100 text-primary-600',
      gradient: 'from-primary-50 to-primary-100'
    },
    secondary: {
      bg: 'from-secondary-500 to-secondary-600',
      icon: 'bg-secondary-100 text-secondary-600',
      gradient: 'from-secondary-50 to-secondary-100'
    },
    accent: {
      bg: 'from-accent-500 to-accent-600',
      icon: 'bg-accent-100 text-accent-600',
      gradient: 'from-accent-50 to-accent-100'
    },
    neutral: {
      bg: 'from-neutral-600 to-neutral-700',
      icon: 'bg-neutral-100 text-neutral-600',
      gradient: 'from-neutral-50 to-neutral-100'
    }
  };

  const changeColors = {
    positive: 'text-accent-600',
    negative: 'text-red-500',
    neutral: 'text-neutral-500'
  };

  const changeIcons = {
    positive: 'TrendingUp',
    negative: 'TrendingDown',
    neutral: 'Minus'
  };

  const scheme = colorSchemes[color];

  return (
    <motion.div
      className="card-premium p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-50`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${scheme.icon} flex items-center justify-center shadow-lg`}>
            <ApperIcon name={icon} className="w-6 h-6" />
          </div>
          
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${changeColors[changeType]}`}>
              <ApperIcon name={changeIcons[changeType]} className="w-4 h-4" />
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-3xl font-bold gradient-text">
            {formatValue(value)}
          </p>
        </div>
      </div>

      <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${scheme.bg} opacity-10 rounded-full`} />
    </motion.div>
  );
};

export default MetricCard;