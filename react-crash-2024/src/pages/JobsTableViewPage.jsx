import * as React from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { Box, Divider, Drawer, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const locationColors = {
  'Boston, MA': '#60a5fa',     // blue
  'Miami, FL': '#34d399',      // green
  'Brooklyn, NY': '#f59e0b',   // amber
  'Phoenix, AZ': '#f87171',    // red
  'Atlanta, GA': '#a78bfa',    // purple
  'Portland, OR': '#f472b6',   // pink
  'Seattle, WA': '#6b7280',    // gray
  'Denver, CO': '#10b981',     // emerald
  'San Francisco, CA': '#8b5cf6', // violet
  'Chicago, IL': '#f59e0b',    // amber
  'Austin, TX': '#84cc16',     // lime
  'New York, NY': '#f97316',   // orange
  'Los Angeles, CA': '#ec4899', // pink
  'Remote': '#6366f1',         // indigo
};

// eslint-disable-next-line react/prop-types
const JobsTableViewPage = ({ deleteJob }) => {
  const [jobs, setJobs] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  

  const loadTable = () => {
    setLoading(true);
    try {
      console.log('Loading jobs from localStorage...');
      const storedJobs = localStorage.getItem('jobs');
      const data = storedJobs ? JSON.parse(storedJobs) : [];
      console.log('Jobs loaded:', data);
      setJobs(data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
      toast.error('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTable();
  }, []);

  const onDeleteClick = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      await deleteJob(jobId);
      await loadTable(); // Reload the table after deletion
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job. Please try again.');
    }
  };

  const onViewClick = (job) => {
    console.log('Viewing job:', job);
    setSelectedJob(job);
    setDrawerOpen(true);
  };

  const columns = [
    { 
      field: 'title', 
      headerName: 'Job Title', 
      flex: 1.8,
      minWidth: 200,
      renderCell: (params) => (
        <div className="font-semibold text-gray-900 py-2">
          {params.value}
        </div>
      ),
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div className="font-medium text-gray-900 py-2">
          {params.value}
        </div>
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1.2,
      minWidth: 150,
      renderCell: (params) => {
        const color = locationColors[params.value] || '#94a3b8';
        return (
          <span
            style={{
              backgroundColor: color,
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '16px',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    { 
      field: 'salary', 
      headerName: 'Salary', 
      flex: 1.1,
      minWidth: 130,
      renderCell: (params) => (
        <div className="font-medium text-gray-900 py-2">
          {params.value}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1.3,
      minWidth: 180,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="flex justify-center gap-2 w-full h-full items-center">
          <button
            onClick={() => onViewClick(params.row)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View
          </button>
          <Link
            to={`/edit-job/${params.row.id}`}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center"
          >
            Edit
          </Link>
          <button
            onClick={() => onDeleteClick(params.row.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading jobs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <Link
          to="/add-job"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          + Add New Job
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Jobs Table View</h1>
          <p className="text-gray-600 mt-1">Manage all job listings in one place</p>
        </div>
        
        <div className="p-6">
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No jobs found</div>
              <Link
                to="/add-job"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Add Your First Job
              </Link>
            </div>
          ) : (
            <DataGrid
              rows={jobs}
              columns={columns}
              getRowId={(row) => row.id}
              pageSizeOptions={[10, 25, 50]}
              initialState={{ 
                pagination: { 
                  paginationModel: { pageSize: 10 } 
                },
                sorting: {
                  sortModel: [{ field: 'title', sort: 'asc' }],
                },
              }}
              autoHeight
              disableRowSelectionOnClick
              rowHeight={60}
              sx={{
                border: 0,
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8fafc',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#374151',
                  borderBottom: '2px solid #e5e7eb',
                },
                '& .MuiDataGrid-row': {
                  borderBottom: '1px solid #f3f4f6',
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                },
                '& .MuiDataGrid-cell': {
                  padding: '12px 16px',
                  borderBottom: 'none',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '2px solid #e5e7eb',
                  backgroundColor: '#f8fafc',
                },
              }}
            />
          )}
        </div>
      </div>

      {/* Job Details Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 450 }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} color="primary.main">
              Job Details
            </Typography>
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              size="small"
              sx={{ 
                color: 'gray',
                '&:hover': {
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          {selectedJob ? (
            <>
              <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
                {selectedJob.title}
              </Typography>
              
              <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                <Typography 
                  variant="body2" 
                  sx={{ 
                    backgroundColor: '#e0e7ff', 
                    color: '#3730a3', 
                    px: 2, 
                    py: 1, 
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  {selectedJob.type}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    backgroundColor: '#fef3c7', 
                    color: '#92400e', 
                    px: 2, 
                    py: 1, 
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  📍 {selectedJob.location}
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight={700} color="success.main" mb={3}>
                💰 {selectedJob.salary} / Year
              </Typography>

              <Typography variant="body1" fontWeight={600} mb={2} color="text.primary">
                Job Description
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4} sx={{ lineHeight: 1.7 }}>
                {selectedJob.description}
              </Typography>

              {selectedJob.company && (
                <Box sx={{ mt: 3, p: 3, backgroundColor: '#f8fafc', borderRadius: 3, border: '1px solid #e5e7eb' }}>
                  <Typography variant="h6" fontWeight={700} mb={2} color="primary.main">
                    🏢 Company Information
                  </Typography>
                  <Typography variant="body1" fontWeight={600} mb={2} color="text.primary">
                    {selectedJob.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3} sx={{ lineHeight: 1.6 }}>
                    {selectedJob.company.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" mb={1} sx={{ fontWeight: 600 }}>
                      📧 Email: <span style={{ color: '#3730a3', fontWeight: 500 }}>{selectedJob.company.contactEmail}</span>
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      📞 Phone: <span style={{ color: '#3730a3', fontWeight: 500 }}>{selectedJob.company.contactPhone || 'Not provided'}</span>
                    </Typography>
                  </Box>
                </Box>
              )}
              
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Link
                  to={`/edit-job/${selectedJob.id}`}
                  style={{ flex: 1, textDecoration: 'none' }}
                  onClick={() => setDrawerOpen(false)}
                >
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Edit Job
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    onDeleteClick(selectedJob.id);
                    setDrawerOpen(false);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Delete Job
                </button>
              </Box>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No job selected.
            </Typography>
          )}
        </Box>
      </Drawer>
    </section>
  );
};

export default JobsTableViewPage;