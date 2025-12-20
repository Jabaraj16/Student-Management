import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl mb-4">
                            <GraduationCap className="h-8 w-8" />
                            <span>EduManager</span>
                        </Link>
                        <p className="text-gray-500 max-w-sm">
                            Empowering educational institutions with modern management tools. Streamline your workflow today.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link to="#" className="hover:text-primary-600">Features</Link></li>
                            <li><Link to="#" className="hover:text-primary-600">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-primary-600">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link to="#" className="hover:text-primary-600">Privacy</Link></li>
                            <li><Link to="#" className="hover:text-primary-600">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} EduManager. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;