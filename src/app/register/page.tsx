'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\+\d{10,15}$/, 'Enter a valid phone number'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: (values) => {
      console.log('Registering:', values);
     
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Join us and enjoy the best shopping experience.
          </p>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">Full Name</label>
              <input
                type="text"
                {...formik.getFieldProps('fullName')}
                placeholder="John Doe"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.fullName && formik.errors.fullName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-blue-500'
                }`}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{formik.errors.fullName}</p>
              )}
            </div>
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
                <p className="text-red-600 text-sm mt-1">{formik.errors.phone}</p>
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
                <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
