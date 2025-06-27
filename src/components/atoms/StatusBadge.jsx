import { motion } from 'framer-motion';

const StatusBadge = ({ status, variant = 'default', size = 'md' }) => {
  const variants = {
    active: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-300',
    inactive: 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-600 border border-neutral-300',
    pending: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300',
    expired: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
    prospect: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
    quoted: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
    negotiating: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300',
    closed: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-300',
    high: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
    medium: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300',
    low: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
    default: 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-600 border border-neutral-300'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const statusVariant = variants[status?.toLowerCase()] || variants[variant] || variants.default;

  return (
    <motion.span
      className={`status-badge inline-flex items-center font-medium rounded-full ${statusVariant} ${sizes[size]}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {status}
    </motion.span>
  );
};

export default StatusBadge;