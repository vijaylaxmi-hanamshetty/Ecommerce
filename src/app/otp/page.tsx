'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function OTPPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .matches(/^\d{6}$/, 'OTP must be 6 digits'),
    }),
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      // Replace this with your backend call
      if (values.otp === '123456') {
        router.push('/dashboard');
      } else {
        setFieldError('otp', 'Invalid OTP. Please try again.');
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the 6-digit code sent to your phone or email.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            {...formik.getFieldProps('otp')}
            placeholder="Enter OTP"
            className={`w-full text-center px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-lg tracking-widest ${
              formik.touched.otp && formik.errors.otp
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-500'
            }`}
          />
          {formik.touched.otp && formik.errors.otp && (
            <p className="text-red-600 text-sm text-center">{formik.errors.otp}</p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {formik.isSubmitting ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}
