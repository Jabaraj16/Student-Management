import React, { useState, useEffect } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { editStudentAPI } from '../Connections/allAPI';
import { serverURL } from '../Connections/serverURL';

export default function EditStudent({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState("");

    const [studentDetails, setStudentDetails] = useState({
        id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        course: data.course,
        batch: data.batch,
        gender: data.gender,
        image: "",
        status: data.status,
    });

    useEffect(() => {
        if (studentDetails.image) {
            setPreview(URL.createObjectURL(studentDetails.image));
        }
    }, [studentDetails.image]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setStudentDetails({
            id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            course: data.course,
            batch: data.batch,
            gender: data.gender,
            image: "",
            status: data.status,
        });
        setPreview("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleGender = (val) => setStudentDetails(prev => ({ ...prev, gender: val }));
    const handleStatus = (val) => setStudentDetails(prev => ({ ...prev, status: val }));

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { id, name, email, phone, course, batch, gender, image, status } = studentDetails;

        const reqBody = new FormData();
        reqBody.append("name", name);
        reqBody.append("email", email);
        reqBody.append("phone", phone);
        reqBody.append("course", course);
        reqBody.append("batch", batch);
        reqBody.append("gender", gender);
        reqBody.append("status", status);
        preview ? reqBody.append("image", image) : reqBody.append("image", data.image);

        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoading(true);
            const reqHeader = {
                "Content-Type": preview ? "multipart/form-data" : "application/json",
                "Authorization": `Bearer ${token}`
            };
            try {
                const result = await editStudentAPI(id, reqBody, reqHeader);
                if (result.status === 200) {
                    toast.success("Student updated successfully");
                    handleClose();
                    refresh();
                } else {
                    toast.error(result.response?.data || "Update failed");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error updating student");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <button onClick={handleOpen} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Edit Student</h2>
                            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-6 space-y-6">
                            <div className="flex justify-center">
                                <label className="relative cursor-pointer group">
                                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-primary-500 transition-colors">
                                        <img
                                            src={preview ? preview : `${serverURL}/uploads/${data.image}`}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/5609/5609019.png' }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                                            Change
                                        </div>
                                    </div>
                                    <input type="file" className="hidden" onChange={(e) => setStudentDetails({ ...studentDetails, image: e.target.files[0] })} accept="image/*" />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" name="name" value={studentDetails.name} onChange={handleChange} />
                                <InputField label="Email Address" type="email" name="email" value={studentDetails.email} onChange={handleChange} />
                                <InputField label="Phone Number" name="phone" value={studentDetails.phone} onChange={handleChange} />
                                <InputField label="Course" name="course" value={studentDetails.course} onChange={handleChange} />
                                <InputField label="Batch" name="batch" value={studentDetails.batch} onChange={handleChange} />

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
                                <button type="button" onClick={handleClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50">
                                    {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                                    Update Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
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