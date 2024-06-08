import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import z from "zod";
import { User } from '@/components/types/user';

const schema = z.object({
  username: z.string()
    .min(1, { message: "* please enter your email address" })
    .email({ message: "* invalid email address" }),
  password: z.string()
    .min(1, { message: "* please enter your password" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character" }),
  retypePassword: z.string()
    .min(1, { message: "* please retype your password" }),
}).refine(data => data.password === data.retypePassword, {
  message: "Passwords don't match",
  path: ["retypePassword"],
});

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<FieldValues> = async (data) => {

    const user: User = {
      username: data.username,
      password: data.password,
      role: "CUSTOMER"
    };

    console.log(user);

    try {
      const response = await fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="username" {...register("username")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" />
        <ErrorMessage errors={errors} name="username" as="span" className="mt-2 text-sm text-red-500" />
      </div>
      <div className='relative'>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <ErrorMessage errors={errors} name="password" as="span" className="mt-2 text-sm text-red-500" />
      </div>
      <div>
        <label htmlFor="retypePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Retype password</label>
        <input type="password" id="retypePassword" {...register("retypePassword")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <ErrorMessage errors={errors} name="retypePassword" as="span" className="mt-2 text-sm text-red-500" />
      </div>
      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account? <Link href="/login/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
      </p>
    </form>
  );
}

export default SignUpForm;