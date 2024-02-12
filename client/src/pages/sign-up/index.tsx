import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input } from '@material-tailwind/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/Icon Gradient.png';
import { RegisterFormSchema, RegisterFormValues } from '../../lib/validation';
import api from '../../utils/api';
import { useAuthStore } from '../../store/authStore';

function AccountPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const { user } = useAuthStore();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await api.post('/auth/register', {
        ...values,
      });
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);

        // Set a timer to clear the error message after 5 seconds
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } else if (error.request) {
        console.log('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error while setting up the request:', error.message);
      }
    }
  };
  return (
    <div>
      <div className='flex items-center justify-center '>
        <div className='bg-[#212942] w-max px-12 border-y-4 border-[#17e0fa] '>
          <div className='flex items-center justify-center gap-4 mt-16 mb-1'>
            <img src={LOGO} className='w-[40px]' alt='Maple vista logo' />
            <p className='text-[20px] text-[#5264d0]'>MapleVistaa</p>
          </div>
          <p className='text-[14px] mb-8 text-center text-[#c8c8d9] font-medium'>
            Sign in to your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-8'>
              <Input
                label='First Name'
                crossOrigin=''
                className='bg-[#262e49] !important'
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className='text-red-500'>First Name is required</span>
              )}
            </div>

            <div className='mb-8'>
              <Input
                label='Last Name'
                crossOrigin=''
                className='bg-[#262e49] !important'
                {...register('lastName')}
              />
              {errors.lastName && (
                <span className='text-red-500'>Last Name is required</span>
              )}
            </div>

            <div className='mb-8'>
              <Input
                label='Email'
                crossOrigin=''
                className='bg-[#262e49] !important'
                {...register('email')}
              />
              {errors.email && (
                <span className='text-red-500'>Email is required</span>
              )}
            </div>

            <div className='mb-2'>
              <Input
                type='password'
                label='Password'
                className='bg-[#262e49] !important'
                crossOrigin=''
                {...register('password')}
              />
              {errors.password && (
                <span className='text-red-500'>Password is required</span>
              )}
            </div>

            <div className='flex items-center mb-6'>
              <Checkbox label='Remember Me' crossOrigin='' />
              <p className='text-[#5264d0]'>Forget Password</p>
            </div>

            <Button className='w-full mb-4' type='submit'>
              {' '}
              Sign Up
            </Button>
          </form>
          <p className='w-full mb-4 text-[#5264d0] text-center'>
            Already a member?{' '}
            <span
              className='hover:text-white hover:underline hover:cursor-pointer'
              onClick={() => navigate('/')}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
