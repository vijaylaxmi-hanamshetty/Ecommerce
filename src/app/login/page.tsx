'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\+\d{10,15}$/, 'Enter a valid phone number'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: (values) => {
      console.log('Form Values:', values);
      router.push('/otp');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex w-full max-w-5xl">

        <div className="hidden md:block md:w-1/2">
          <img
            src="/images/woman.jpg"
            alt="E-Commerce Fashion"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6">Log in to continue shopping with us.</p>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">Phone number</label>
              <input
                type="tel"
                {...formik.getFieldProps('phone')}
                placeholder="+1234567890"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.phone && formik.errors.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-blue-500'
                }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">Password</label>
              <input
                type="password"
                {...formik.getFieldProps('password')}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-blue-500'
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
