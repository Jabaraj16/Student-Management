import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'react-toastify';
import StudentCard from '../Components/StudentCard';
import { adminStudentAPI } from '../Connections/allAPI';

function Allstudent() {
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setIsLoading(true);
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await adminStudentAPI(reqHeader);
      setStudentData(result.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Students</h1>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            placeholder="Search by name or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Students */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500">Loading students...</div>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student._id} student={student} refresh={getStudentDetails} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No students found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default Allstudent;