import { z } from 'zod';

// Username Schema
const usernameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First Name must be in capitalize format' },
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name must contain only letters',
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father Name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father Occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father Contact Number is required'),
  motherName: z.string().trim().min(1, 'Mother Name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother Occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother Contact Number is required'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local Guardian Name is required'),
  occupation: z.string().trim().min(1, 'Local Guardian Occupation is required'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local Guardian Contact Number is required'),
  address: z.string().trim().min(1, 'Local Guardian Address is required'),
});

// Main Student Schema
const studentValidationSchema = z.object({
  id: z.string().trim().min(1, 'Student ID is required'),
  password: z.string().max(20),
  name: usernameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender must be male, female, or other' }),
  }),
  dateOfBirth: z.string().trim().min(1, 'Date of Birth is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  contactNo: z.string().trim().min(1, 'Contact Number is required'),
  emergencyContactNo: z
    .string()
    .trim()
    .min(1, 'Emergency Contact Number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  presentAddress: z.string().trim().min(1, 'Present Address is required'),
  permanentAddress: z.string().trim().min(1, 'Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().trim().optional(),
  isActive: z
    .enum(['active', 'blocked'], {
      errorMap: () => ({ message: 'Status must be active or blocked' }),
    })
    .default('active'),
  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
