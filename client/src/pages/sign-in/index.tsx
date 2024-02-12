import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/Icon Gradient.png';
import { LoginFormSchema, LoginFormValues } from '../../lib/validation';
import { useAuthStore } from '../../store/authStore';
import api from '../../utils/api';

function AccountPage() {
  const navigate = useNavigate();
  const { setUser, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // useEffect(() => {
  //   if (user) {
  //    if (user.subscription) {
  //      navigate('/plans');
  //    } else {
  //      navigate('/account');
  //    }
  //   }
  // }, [user, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await api.post('/auth/login', { ...values });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data.user);

      if (!data.user.subscription) {
        navigate('/plans');
      } else {
        navigate('/account');
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.error);
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
              <Input label='Email' crossOrigin='' {...register('email')} />
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
              Sign in
            </Button>
          </form>
          <p className='w-full mb-4 text-[#5264d0]'>
            Don't have an account?{' '}
            <span
              className='hover:text-white hover:underline hover:cursor-pointer'
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
