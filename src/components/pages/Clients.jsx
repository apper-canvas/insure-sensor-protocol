import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from '@/components/molecules/DataTable';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';
import { getAllClients, deleteClient } from '@/services/api/clientService';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await getAllClients();
      setClients(data);
      setFilteredClients(data);
      
      if (data.length === 0) {
        console.log('No clients found');
      }
    } catch (err) {
      setError('Failed to load clients. Please try again.');
      console.error('Clients error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSearch = (term, filter) => {
    let filtered = clients;
    
    if (term) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(term.toLowerCase()) ||
        client.email.toLowerCase().includes(term.toLowerCase()) ||
        client.phone.includes(term)
      );
    }
    
    setFilteredClients(filtered);
  };

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setShowDetailPanel(true);
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(clientId);
        await loadClients();
        toast.success('Client deleted successfully');
        setShowDetailPanel(false);
        setSelectedClient(null);
      } catch (err) {
        toast.error('Failed to delete client');
        console.error('Delete error:', err);
      }
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'occupation', label: 'Occupation' },
    { key: 'createdAt', label: 'Added', type: 'date' },
  ];

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadClients} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Clients</h1>
          <p className="text-neutral-600 mt-2">Manage your client relationships and information</p>
        </div>
        
        <Button icon="UserPlus" onClick={() => toast.info('Add client feature coming soon!')}>
          Add Client
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className={`transition-all duration-300 ${showDetailPanel ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="card-premium p-6">
            {/* Search and Filters */}
            <div className="mb-6">
              <SearchBar
                placeholder="Search clients by name, email, or phone..."
                onSearch={handleSearch}
              />
            </div>

            {/* Results */}
            {filteredClients.length === 0 ? (
              <Empty 
                title="No clients found"
                description="Start building your client base by adding your first client"
                actionLabel="Add Client"
                onAction={() => toast.info('Add client feature coming soon!')}
                icon="Users"
              />
            ) : (
              <DataTable
                data={filteredClients}
                columns={columns}
                onRowClick={handleRowClick}
                pageSize={15}
              />
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {showDetailPanel && selectedClient && (
            <motion.div
              className="w-1/3 hidden lg:block"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="card-premium p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-800">Client Details</h2>
                  <button
                    onClick={() => setShowDetailPanel(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                  >
                    <ApperIcon name="X" className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Client Info */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="User" className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800">{selectedClient.name}</h3>
                    <p className="text-neutral-600">{selectedClient.occupation}</p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Mail" className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="text-sm text-neutral-500">Email</p>
                        <p className="text-neutral-800">{selectedClient.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Phone" className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="text-sm text-neutral-500">Phone</p>
                        <p className="text-neutral-800">{selectedClient.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="MapPin" className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="text-sm text-neutral-500">Address</p>
                        <p className="text-neutral-800">{selectedClient.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Calendar" className="w-5 h-5 text-neutral-400" />
                      <div>
                        <p className="text-sm text-neutral-500">Date of Birth</p>
                        <p className="text-neutral-800">
                          {new Date(selectedClient.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedClient.notes && (
                    <div>
                      <p className="text-sm text-neutral-500 mb-2">Notes</p>
                      <p className="text-neutral-800 bg-neutral-50 p-3 rounded-lg text-sm">
                        {selectedClient.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button variant="secondary" size="sm" className="flex-1">
                      <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDeleteClient(selectedClient.Id)}
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Clients;