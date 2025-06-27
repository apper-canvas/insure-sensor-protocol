import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'table') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="card p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-1/2" />
              </div>
              <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full animate-pulse w-20" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-4">
              <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-2/3" />
              <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-full" />
              <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-3/4" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full animate-pulse w-16" />
                <div className="h-8 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded animate-pulse w-20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.4,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;