import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import Navbar from '../components/Navbar';
import { User, Mail, Lock, Save, X, CheckCircle, AlertCircle } from 'lucide-react';

const UserProfile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ 
        full_name: user?.full_name || '', 
        email: user?.email || '' 
    });
    const [passwordData, setPasswordData] = useState({ 
        old_password: '', 
        new_password: '', 
        confirm_password: '' 
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await API.patch('profile/', formData);
            setUser(res.data);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.new_password !== passwordData.confirm_password) {
            return setMessage({ type: 'error', text: 'New passwords do not match.' });
        }
        try {
            await API.post('change-password/', {
                old_password: passwordData.old_password,
                new_password: passwordData.new_password
            });
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
            setMessage({ type: 'success', text: 'Password changed successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.error || 'Password change failed.' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.type === 'success' ? <CheckCircle className="mr-2" /> : <AlertCircle className="mr-2" />}
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold flex items-center"><User className="mr-2" /> Personal Info</h2>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="text-blue-600 text-sm font-medium">Edit</button>
                            )}
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600">Full Name</label>
                                <input 
                                    disabled={!isEditing}
                                    className="w-full p-2 border rounded mt-1 disabled:bg-gray-50"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Email Address</label>
                                <input 
                                    disabled={!isEditing}
                                    className="w-full p-2 border rounded mt-1 disabled:bg-gray-50"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            {isEditing && (
                                <div className="flex space-x-2 pt-2">
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"><Save className="w-4 h-4 mr-2" /> Save</button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 px-4 py-2 rounded flex items-center"><X className="w-4 h-4 mr-2" /> Cancel</button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-6 flex items-center"><Lock className="mr-2" /> Change Password</h2>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <input 
                                type="password" 
                                placeholder="Current Password" 
                                className="w-full p-2 border rounded"
                                value={passwordData.old_password}
                                onChange={(e) => setPasswordData({...passwordData, old_password: e.target.value})}
                            />
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                className="w-full p-2 border rounded"
                                value={passwordData.new_password}
                                onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                            />
                            <input 
                                type="password" 
                                placeholder="Confirm New Password" 
                                className="w-full p-2 border rounded"
                                value={passwordData.confirm_password}
                                onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                            />
                            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-black transition">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;