import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { UserCheck, UserX, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await API.get(`admin/users/?page=${page}`);
            setUsers(res.data.results); // Django DRF returns 'results' with pagination
            setTotalPages(Math.ceil(res.data.count / 10));
        } catch (err) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [page]);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        if (!window.confirm(`Are you sure you want to set this user to ${newStatus}?`)) return;
        
        try {
            await API.patch(`admin/users/${id}/status/`, { status: newStatus });
            fetchUsers();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">User Management</h1>
                {loading ? <Loader2 className="animate-spin m-auto" /> : (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-4">Full Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{u.full_name}</td>
                                        <td className="p-4">{u.email}</td>
                                        <td className="p-4 capitalize">{u.role}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => toggleStatus(u.id, u.status)}
                                                className={`flex items-center px-3 py-1 rounded transition ${u.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                            >
                                                {u.status === 'active' ? <><UserX className="w-4 h-4 mr-1" /> Deactivate</> : <><UserCheck className="w-4 h-4 mr-1" /> Activate</>}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="p-4 flex justify-between items-center bg-gray-50">
                            <button disabled={page === 1} onClick={() => setPage(page-1)} className="flex items-center text-gray-600 disabled:opacity-30"><ChevronLeft /> Prev</button>
                            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => setPage(page+1)} className="flex items-center text-gray-600 disabled:opacity-30">Next <ChevronRight /></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;