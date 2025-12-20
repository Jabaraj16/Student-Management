import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Smartphone, Shield, Zap } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                            Manage Your Institute <br />
                            <span className="text-primary-600">With Confidence</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-8">
                            The all-in-one platform for student data management, course tracking, and administrative workflows.
                        </p>
                        <div className="flex justify-center gap-4">
                            {isLoggedIn ? (
                                <Link to="/dashboard">
                                    <button className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Go to Dashboard <ArrowRight className="h-5 w-5" />
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <button className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Get Started <ArrowRight className="h-5 w-5" />
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-16 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-3xl">
                            {/* Fallback/Placeholder if image fails or for design */}
                            <img
                                src="https://wpschoolpress.com/wp-content/uploads/2023/03/student-management-system.png"
                                alt="Dashboard Preview"
                                className="rounded-3xl shadow-2xl border-4 border-white mx-auto relative z-10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full w-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose EduManager?</h2>
                        <p className="mt-4 text-gray-500">Everything you need to run your educational institution smoothly.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Optimized for performance with instant data retrieval." },
                            { icon: Shield, title: "Secure Data", desc: "Enterprise-grade security for your student records." },
                            { icon: Smartphone, title: "Mobile Ready", desc: "Access your dashboard from any device, anywhere." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-6">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default LandingPage;