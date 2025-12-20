import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Mail, Lock, Loader, ArrowRight, GraduationCap } from 'lucide-react';
import { LoginAdminAPI, registerAdminAPI } from '../Connections/allAPI';

function Auth({ insideLogin }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    setFormData({ email: "", password: "" })
  }, [insideLogin])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      if (insideLogin) {
        // Login Logic
        const result = await LoginAdminAPI(formData);
        if (result.status === 200) {
          toast.success("Welcome back!");
          sessionStorage.setItem("token", result.data.token);
          setTimeout(() => navigate("/dashboard"), 1000);
        } else {
          toast.error(result.response?.data?.message || "Login failed");
        }
      } else {
        // Register Logic
        const result = await registerAdminAPI(formData);
        if (result.status === 201) {
          toast.success("Registration successful! Please login.");
          setTimeout(() => navigate("/login"), 2000);
          setFormData({ email: "", password: "" });
        } else {
          toast.error(result.response?.data?.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Hero Image */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900 opacity-90" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <GraduationCap className="h-8 w-8" />
            <span>EduManager</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Streamline Your Institute Management
            </h1>
            <p className="text-primary-100 text-lg max-w-md">
              Efficiently manage students, courses, and faculty with our comprehensive solution.
            </p>
          </div>
          <div className="text-primary-200 text-sm">
            © {new Date().getFullYear()} EduManager Inc.
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl opacity-50" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl opacity-50" />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center lg:hidden mb-4">
              <div className="bg-primary-50 p-3 rounded-xl">
                <GraduationCap className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {insideLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-gray-600">
              {insideLogin
                ? 'Enter your credentials to access your account'
                : 'Get started with your free admin account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {insideLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {insideLogin ? "Don't have an account? " : "Already have an account? "}
              <Link
                to={insideLogin ? '/register' : '/login'}
                className="font-medium text-primary-600 hover:text-primary-500 hover:underline transition-colors"
              >
                {insideLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}
export default Auth