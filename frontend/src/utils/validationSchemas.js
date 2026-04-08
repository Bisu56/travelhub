import * as yup from 'yup';

export const loginSchema = yup.object({
  emailOrPhone: yup.string().required('Email or phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = yup.object({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().required('Phone number is required'),
});

export const bookingSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
});

export const reviewSchema = yup.object({
  rating: yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').required('Rating is required'),
  comment: yup.string().min(10, 'Comment must be at least 10 characters').required('Comment is required'),
});

export const payoutRequestSchema = yup.object({
  amount: yup.number().min(100, 'Minimum payout amount is 100').required('Amount is required'),
});
