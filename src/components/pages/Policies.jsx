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
import { getAllPolicies } from '@/services/api/policyService';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const loadPolicies = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await getAllPolicies();
      setPolicies(data);
      setFilteredPolicies(data);
    } catch (err) {
      setError('Failed to load policies. Please try again.');
      console.error('Policies error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleSearch = (term, filter) => {
    let filtered = policies;
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(policy => 
        policy.status.toLowerCase() === filter.toLowerCase()
      );
    }
    
    // Apply search term
    if (term) {
      filtered = filtered.filter(policy =>
        policy.policyNumber.toLowerCase().includes(term.toLowerCase()) ||
        policy.type.toLowerCase().includes(term.toLowerCase()) ||
        policy.provider.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredPolicies(filtered);
    setActiveFilter(filter);
  };

  const handleRowClick = (policy) => {
    toast.info(`Policy details for ${policy.policyNumber} - Feature coming soon!`);
  };

  const getRenewalStatus = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const daysUntilRenewal = Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilRenewal < 0) return 'expired';
    if (daysUntilRenewal <= 30) return 'pending';
    return 'active';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const columns = [
    { key: 'policyNumber', label: 'Policy Number' },
    { key: 'type', label: 'Type' },
    { key: 'provider', label: 'Provider' },
    { key: 'premium', label: 'Premium', type: 'currency' },
    { key: 'renewalDate', label: 'Renewal Date', type: 'date' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (value, row) => (
        <StatusBadge status={getRenewalStatus(row.renewalDate)} />
      )
    },
  ];

  const filterOptions = [
    { label: 'All Policies', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Pending Renewal', value: 'pending' },
    { label: 'Expired', value: 'expired' },
  ];

  // Calculate summary stats
  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => getRenewalStatus(p.renewalDate) === 'active').length;
  const pendingRenewals = policies.filter(p => getRenewalStatus(p.renewalDate) === 'pending').length;
  const expiredPolicies = policies.filter(p => getRenewalStatus(p.renewalDate) === 'expired').length;
  const totalPremiums = policies.reduce((sum, p) => sum + p.premium, 0);

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadPolicies} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Policies</h1>
          <p className="text-neutral-600 mt-2">Monitor policy renewals and coverage details</p>
        </div>
        
        <Button icon="Shield" onClick={() => toast.info('Add policy feature coming soon!')}>
          Add Policy
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Policies', value: totalPolicies, icon: 'Shield', color: 'primary' },
          { label: 'Active', value: activePolicies, icon: 'CheckCircle', color: 'accent' },
          { label: 'Pending Renewal', value: pendingRenewals, icon: 'Clock', color: 'neutral' },
          { label: 'Expired', value: expiredPolicies, icon: 'XCircle', color: 'neutral' },
          { label: 'Total Premiums', value: formatCurrency(totalPremiums), icon: 'DollarSign', color: 'secondary' },
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
            placeholder="Search policies by number, type, or provider..."
            onSearch={handleSearch}
            filters={filterOptions}
          />
        </div>

        {/* Results */}
        {filteredPolicies.length === 0 && policies.length === 0 ? (
          <Empty 
            title="No policies found"
            description="Start by adding your first insurance policy to track renewals and coverage"
            actionLabel="Add Policy"
            onAction={() => toast.info('Add policy feature coming soon!')}
            icon="Shield"
          />
        ) : filteredPolicies.length === 0 ? (
          <Empty 
            title="No policies match your search"
            description="Try adjusting your search criteria or filter settings"
            icon="Search"
          />
        ) : (
          <DataTable
            data={filteredPolicies}
            columns={columns}
            onRowClick={handleRowClick}
            pageSize={15}
          />
        )}
      </div>

      {/* Renewal Alerts */}
      {pendingRenewals > 0 && (
        <motion.div
          className="card bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-800">Renewal Alerts</h3>
              <p className="text-amber-700">
                You have {pendingRenewals} {pendingRenewals === 1 ? 'policy' : 'policies'} requiring renewal within 30 days.
              </p>
            </div>
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Policies;