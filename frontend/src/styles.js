// This file centralizes your UI design for a professional look
export const styles = {
  // --- Centering Containers ---
  fullPageCenter: { 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f8fafc', // Soft slate background
    padding: '20px',
    fontFamily: "'Inter', sans-serif"
  },
  
  // --- Card Component (Login, Signup, Profile) ---
  card: { 
    width: '100%', 
    maxWidth: '420px', 
    padding: '40px', 
    backgroundColor: '#ffffff', 
    borderRadius: '16px', 
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', 
    border: '1px solid #e2e8f0' 
  },
  
  // --- Typography ---
  header: { textAlign: 'center', marginBottom: '32px' },
  title: { fontSize: '26px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: 0 },
  
  // --- Form Elements ---
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '20px', textAlign: 'left' },
  label: { display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' },
  input: { 
    width: '100%', 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1', 
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  primaryBtn: { 
    width: '100%', 
    padding: '12px', 
    backgroundColor: '#2563eb', // Royal Blue
    color: '#ffffff', 
    border: 'none', 
    borderRadius: '8px', 
    fontSize: '16px',
    fontWeight: '600', 
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  footerText: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' },
  link: { color: '#2563eb', fontWeight: '600', textDecoration: 'none' },

  // --- Admin Dashboard Layout ---
  dashboardLayout: { 
    minHeight: '100vh', 
    backgroundColor: '#f1f5f9',
    padding: '40px 20px', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center' // Centers the contentWrapper horizontally
  },
  contentWrapper: { 
    width: '100%', 
    maxWidth: '1000px' // Keeps the dashboard from stretching too wide
  },
  dashboardHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '40px' 
  },
  pageTitle: { fontSize: '24px', fontWeight: '700', color: '#0f172a' },
  logoutBtn: { 
    backgroundColor: '#ef4444', 
    color: '#fff', 
    border: 'none', 
    padding: '8px 16px', 
    borderRadius: '6px', 
    fontWeight: '600',
    cursor: 'pointer' 
  },

  // --- Metrics Cards ---
  statsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
    gap: '20px', 
    marginBottom: '30px' 
  },
  statCard: { 
    backgroundColor: '#fff', 
    padding: '24px', 
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  },
  statLabel: { color: '#64748b', fontSize: '14px', fontWeight: '500', margin: 0 },
  statValue: { fontSize: '32px', fontWeight: '700', color: '#1e293b', margin: '10px 0 0 0' },

  // --- Modern Data Table ---
  tableContainer: { 
    backgroundColor: '#fff', 
    borderRadius: '12px', 
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thead: { backgroundColor: '#f8fafc' },
  th: { 
    padding: '16px 24px', 
    fontSize: '12px', 
    fontWeight: '600', 
    textTransform: 'uppercase', 
    color: '#64748b',
    borderBottom: '1px solid #e2e8f0'
  },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '16px 24px', fontSize: '14px', color: '#334155' },

  // --- Status Badges ---
  adminBadge: { 
    padding: '4px 12px', 
    backgroundColor: '#dcfce7', 
    color: '#166534', 
    borderRadius: '99px', 
    fontSize: '12px', 
    fontWeight: '600' 
  },
  userBadge: { 
    padding: '4px 12px', 
    backgroundColor: '#dbeafe', 
    color: '#1e40af', 
    borderRadius: '99px', 
    fontSize: '12px', 
    fontWeight: '600' 
  },

  // --- Table Actions ---
  editBtn: { color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '15px' },
  deleteBtn: { color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }
};