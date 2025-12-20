import React, { useState } from 'react';
import { Mail, Phone, BookOpen, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import EditStudent from './EditStudent';
import { serverURL } from '../Connections/serverURL';
import { deleteStudentAPI } from '../Connections/allAPI';

export default function StudentCard({ student, refresh }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const result = await deleteStudentAPI(student._id, {
          "Authorization": `Bearer ${token}`
        });
        if (result.status === 200) {
          toast.success("Student deleted successfully");
          refresh();
        } else {
          toast.error(result.response.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete student");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Card Header with Image and Status */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={`${serverURL}/uploads/${student.image}`}
          alt={student.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/5609/5609019.png' }}
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${student.status === 'active'
            ? 'bg-green-500/10 text-green-700 bg-white'
            : 'bg-red-500/10 text-red-700 bg-white'
          }`}>
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {student.name}
          </h3>
          <div className="flex items-center gap-2 text-primary-600 text-sm font-medium mt-1">
            <BookOpen className="h-4 w-4" />
            <span>{student.course}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">{student.batch}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="h-4 w-4" />
            <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone className="h-4 w-4" />
            <span>{student.phone}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <EditStudent data={student} refresh={refresh} />

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Student"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-600 font-medium">Confirm?</span>
              <button
                onClick={handleDelete}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}