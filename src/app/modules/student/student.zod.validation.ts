import { z } from 'zod';

// Username Schema
const createUsernameValidationSchema = z.object({
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
const createGuardianValidationSchema = z.object({
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
const createLocalGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local Guardian Name is required'),
  occupation: z.string().trim().min(1, 'Local Guardian Occupation is required'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local Guardian Contact Number is required'),
  address: z.string().trim().min(1, 'Local Guardian Address is required'),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUsernameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender must be male, female, or other' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
      contactNo: z.string().trim().min(1, 'Contact Number is required'),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, 'Emergency Contact Number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string().trim().min(1, 'Present Address is required'),
      permanentAddress: z
        .string()
        .trim()
        .min(1, 'Permanent Address is required'),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

// Username Schema
const updateUsernameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First Name must be in capitalize format' },
    )
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name must contain only letters',
    })
    .optional(),
});

// Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father Name is required').optional(),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, 'Father Occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father Contact Number is required')
    .optional(),
  motherName: z.string().trim().min(1, 'Mother Name is required').optional(),
  motherOccupation: z
    .string()
    .trim()
    .min(1, 'Mother Occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother Contact Number is required')
    .optional(),
});

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local Guardian Name is required').optional(),
  occupation: z
    .string()
    .trim()
    .min(1, 'Local Guardian Occupation is required')
    .optional(),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local Guardian Contact Number is required')
    .optional(),
  address: z
    .string()
    .trim()
    .min(1, 'Local Guardian Address is required')
    .optional(),
});

// Main Student Schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUsernameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({
            message: 'Gender must be male, female, or other',
          }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required')
        .optional(),
      contactNo: z
        .string()
        .trim()
        .min(1, 'Contact Number is required')
        .optional(),
      emergencyContactNo: z
        .string()
        .trim()
        .min(1, 'Emergency Contact Number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z
        .string()
        .trim()
        .min(1, 'Present Address is required')
        .optional(),
      permanentAddress: z
        .string()
        .trim()
        .min(1, 'Permanent Address is required')
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
