import React, { useState, useEffect } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { addStudentAPI } from '../Connections/allAPI';

export default function AddStudent({ open, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const [preview, setPreview] = useState("");

    const [studentDetails, setStudentDetails] = useState({
        name: "", email: "", phone: "", course: "", batch: "",
        gender: "", image: "", status: "active",
    });

    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
    }, []);

    useEffect(() => {
        if (studentDetails.image) {
            setPreview(URL.createObjectURL(studentDetails.image));
        } else {
            setPreview("");
        }
    }, [studentDetails.image]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleGender = (val) => setStudentDetails(prev => ({ ...prev, gender: val }));
    const handleStatus = (val) => setStudentDetails(prev => ({ ...prev, status: val }));

    const handleAdd = async (e) => {
        e.preventDefault();
        const { name, email, phone, course, batch, gender, image, status } = studentDetails;

        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (!name || !email || !phone || !course || !batch || !gender || !image || !status) {
            toast.warning("Please fill in all details");
            return;
        }

        setIsLoading(true);
        try {
            const reqBody = new FormData();
            Object.keys(studentDetails).forEach(key => reqBody.append(key, studentDetails[key]));

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            };

            const result = await addStudentAPI(reqBody, reqHeader);

            if (result.status === 200 || result.status === 201) {
                toast.success("Student added successfully");
                setStudentDetails({
                    name: "", email: "", phone: "", course: "", batch: "",
                    gender: "", image: "", status: "active",
                });
                setPreview("");
                onClose();
            } else {
                toast.error(result.response?.data || "Failed to add student");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Add New Student</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleAdd} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="flex justify-center">
                        <label className="relative cursor-pointer group">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-primary-500 transition-colors">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-2">
                                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">Upload Photo</span>
                                    </div>
                                )}
                            </div>
                            <input type="file" className="hidden" onChange={(e) => setStudentDetails({ ...studentDetails, image: e.target.files[0] })} accept="image/*" />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Full Name" name="name" value={studentDetails.name} onChange={handleChange} placeholder="John Doe" />
                        <InputField label="Email Address" type="email" name="email" value={studentDetails.email} onChange={handleChange} placeholder="john@example.com" />
                        <InputField label="Phone Number" name="phone" value={studentDetails.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                        <InputField label="Course" name="course" value={studentDetails.course} onChange={handleChange} placeholder="Computer Science" />
                        <InputField label="Batch" name="batch" value={studentDetails.batch} onChange={handleChange} placeholder="2023-2024" />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Gender</label>
                            <div className="flex gap-4">
                                {['Male', 'Female', 'Other'].map((g) => (
                                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={studentDetails.gender === g.toLowerCase()}
                                            onChange={() => handleGender(g.toLowerCase())}
                                            className="text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-sm text-gray-600">{g}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="status" checked={studentDetails.status === 'active'} onChange={() => handleStatus('active')} className="text-primary-600" />
                                <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="status" checked={studentDetails.status === 'inactive'} onChange={() => handleStatus('inactive')} className="text-primary-600" />
                                <span className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50">
                            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                            save Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const InputField = ({ label, type = "text", ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            {...props}
        />
    </div>
);