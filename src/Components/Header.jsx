import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

function Header() {
    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
                        <GraduationCap className="h-8 w-8" />
                        <span>EduManager</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;