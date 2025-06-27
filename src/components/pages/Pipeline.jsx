import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';
import { getAllLeads, updateLead } from '@/services/api/leadService';

const Pipeline = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const stages = [
    { id: 'prospect', label: 'Prospects', color: 'blue' },
    { id: 'quoted', label: 'Quoted', color: 'purple' },
    { id: 'negotiating', label: 'Negotiating', color: 'orange' },
    { id: 'closed', label: 'Closed', color: 'green' },
  ];

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await getAllLeads();
      setLeads(data);
    } catch (err) {
      setError('Failed to load pipeline data. Please try again.');
      console.error('Pipeline error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const getLeadsByStage = (stage) => {
    return leads.filter(lead => lead.stage.toLowerCase() === stage.toLowerCase());
  };

  const handleStageChange = async (leadId, newStage) => {
    try {
      await updateLead(leadId, { stage: newStage });
      await loadLeads();
      toast.success('Lead stage updated successfully');
    } catch (err) {
      toast.error('Failed to update lead stage');
      console.error('Update error:', err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTotalValue = (stage) => {
    return getLeadsByStage(stage.id).reduce((sum, lead) => sum + lead.value, 0);
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadLeads} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Sales Pipeline</h1>
          <p className="text-neutral-600 mt-2">Track leads through your sales process</p>
        </div>
        
        <Button icon="Target" onClick={() => toast.info('Add lead feature coming soon!')}>
          Add Lead
        </Button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage, index) => {
          const stageLeads = getLeadsByStage(stage.id);
          const stageValue = getTotalValue(stage);
          
          return (
            <motion.div
              key={stage.id}
              className="card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">{stage.label}</h3>
                <div className="text-2xl font-bold gradient-text mb-1">
                  {stageLeads.length}
                </div>
                <div className="text-sm text-neutral-600">
                  {formatCurrency(stageValue)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stages.map((stage, stageIndex) => {
          const stageLeads = getLeadsByStage(stage.id);
          
          return (
            <motion.div
              key={stage.id}
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stageIndex * 0.2 }}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 bg-${stage.color}-500 rounded-full`}></div>
                  <h3 className="font-semibold text-neutral-800">{stage.label}</h3>
                  <span className="text-sm text-neutral-500">({stageLeads.length})</span>
                </div>
              </div>

              {/* Stage Column */}
              <div className="space-y-3 min-h-[400px] bg-neutral-50 rounded-lg p-4">
                {stageLeads.length === 0 ? (
                  <div className="text-center py-8">
                    <ApperIcon name="Inbox" className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">No leads in this stage</p>
                  </div>
                ) : (
                  stageLeads.map((lead, leadIndex) => (
                    <motion.div
                      key={lead.Id}
                      className="card p-4 cursor-pointer hover:shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: leadIndex * 0.1 }}
                      onClick={() => toast.info(`Lead details for ${lead.name} - Feature coming soon!`)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-neutral-800 truncate">{lead.name}</h4>
                          <div className="relative group">
                            <button className="p-1 hover:bg-neutral-100 rounded">
                              <ApperIcon name="MoreHorizontal" className="w-4 h-4 text-neutral-400" />
                            </button>
                            
                            {/* Stage Move Menu */}
                            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {stages
                                .filter(s => s.id !== stage.id)
                                .map(targetStage => (
                                  <button
                                    key={targetStage.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStageChange(lead.Id, targetStage.id);
                                    }}
                                    className="w-full text-left px-3 py-1 hover:bg-neutral-50 text-sm text-neutral-700"
                                  >
                                    Move to {targetStage.label}
                                  </button>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-neutral-600">
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="Mail" className="w-4 h-4" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="Phone" className="w-4 h-4" />
                            <span>{lead.phone}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="DollarSign" className="w-4 h-4" />
                            <span className="font-medium">{formatCurrency(lead.value)}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="User" className="w-4 h-4" />
                              <span className="text-xs">{lead.assignedTo}</span>
                            </div>
                            
                            <StatusBadge status={lead.source} size="sm" />
                          </div>
                          
                          {lead.nextAction && (
                            <div className="flex items-center space-x-2 text-amber-600">
                              <ApperIcon name="Calendar" className="w-4 h-4" />
                              <span className="text-xs">
                                Next: {new Date(lead.nextAction).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pipeline Analytics */}
      <motion.div
        className="card-premium p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">Pipeline Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {formatCurrency(leads.reduce((sum, lead) => sum + lead.value, 0))}
            </div>
            <p className="text-neutral-600">Total Pipeline Value</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {leads.length}
            </div>
            <p className="text-neutral-600">Total Leads</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {leads.length > 0 ? Math.round((getLeadsByStage('closed').length / leads.length) * 100) : 0}%
            </div>
            <p className="text-neutral-600">Conversion Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pipeline;