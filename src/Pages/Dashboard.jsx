import React, { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap, Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddStudent from '../Components/AddStudent';
import { adminStudentAPI } from '../Connections/allAPI';

function Dashboard() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeStudents: 0,
        totalCourses: 0 // Mock or derived
    });

    useEffect(() => {
        // Fetch basic stats if possible, or just link to AllStudents
        // For now we can fetch all students to get the count
        const fetchStats = async () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                try {
                    const result = await adminStudentAPI({ "Authorization": `Bearer ${token}` });
                    if (result.status === 200) {
                        const students = result.data;
                        setStats({
                            totalStudents: students.length,
                            activeStudents: students.filter(s => s.status === 'active').length,
                            // distinct courses
                            totalCourses: new Set(students.map(s => s.course)).size || 0
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchStats();
    }, [openAddModal]); // Refresh when modal closes/adds student

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Administrator</p>
                </div>
                <button
                    onClick={() => setOpenAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add New Student</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Active Students"
                    value={stats.activeStudents}
                    icon={GraduationCap}
                    color="bg-green-500"
                />
                <StatsCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="bg-purple-500"
                />
            </div>

            {/* Quick Actions / Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-900">Quick Navigation</h2>
                    </div>
                    <div className="space-y-3">
                        <Link to="/all-students" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-md shadow-sm text-primary-600">
                                    <Users className="h-5 w-5" />
                                </div>
                                <span className="font-medium text-gray-900">View All Students</span>
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                        </Link>

                        {/* Add more links if needed */}
                    </div>
                </div>

                <div className="bg-primary-600 p-6 rounded-xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-2">Need Help?</h2>
                        <p className="text-primary-100 mb-4">Check our documentation for help with managing the student database.</p>
                        <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                            Documentation
                        </button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </div>

            <AddStudent open={openAddModal} onClose={() => setOpenAddModal(false)} />
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.replace('bg-', '')}`}>
                <Icon className={`h-6 w-6 text-${color.replace('bg-', '')}`} style={{ color: 'inherit' }} />
                {/* Tailwind dynamic class might fail, hardcoding for now or better use map */}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    )
}

export default Dashboard