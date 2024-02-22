import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/Icon Gradient.png";
import { LoginFormSchema, LoginFormValues } from "../../lib/validation";
import { useAuthStore } from "../../store/authStore";
import api from "../../utils/api";
import ShoppingCart from "../../components/ShoppingCart";
import "../../components/leaklight.css";
import { FormError } from "../../components/FormError";

function AccountPage() {
  const navigate = useNavigate();
  const { setUser, user } = useAuthStore();
  const [error, setError] = useState('');

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
        console.log(error.response.data.message);
        setError(error.response.data.message);
        setTimeout(() => {
          setError('');
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
      <div>
        <div className='rainbow-gradient-circle'></div>
        <div className='rainbow-gradient-circle theme-pink'></div>
      </div>

      <div className="flex items-center justify-center ">
        <div className="bg-[#FFFFFF]/10 bg-opacity-20 w-max px-8 rounded-md">
          <div className="flex items-center justify-center gap-4 mt-12 mb-3">
            <img src={LOGO} className="w-[40px]" alt="Maple vista logo" />
            <p className="text-[20px] text-[#5264d0]">MapleVista</p>
          </div>
          <p className='text-[14px] mb-8 text-center text-[#fff] font-regular'>
            Sign in to your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-8'>
              <div className='w-full'>
                <div className='relative h-10 w-full min-w-[200px] '>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white bg-opacity-0 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                    {...register("email")}
                  />

                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5  hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                {errors.email && (
                  <span className='text-red-500'>{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className='mb-2'>
              <div className='w-full'>
                <div className='relative h-10 w-full min-w-[200px] '>
                  <input
                    type="password"
                    placeholder="Password"
                    className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-none bg-opacity-0 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                    {...register("password")}
                  />

                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5  hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                {errors.password && (
                  <span className='text-red-500'>{errors.password.message}</span>
                )}
              </div>
            </div>

            <div className='flex gap-8 items-center mb-6'>
              <div className='flex items-center -ml-2'>
                <Checkbox className='' crossOrigin='' />
                <p className='text-white font-thin text-[14px]'>Remember Me</p>
              </div>

              <p className='text-[#5264d0] text-[14px]'>Forget Password</p>
            </div>
            {error && (
              <div className='mb-2'>
                <FormError message={error} />
              </div>
            )}

            <Button
              className='bg w-full mb-4 bg-gradient-to-r from-[#5D4FCA] to-[#13EAFD]'
              type='submit'
            >
              {' '}
              Sign in
            </Button>
          </form>
          <p className="w-full mb-8 text-[#5264d0] text-center text-[15px]">
            Don't have an account?{" "}
            <span
              className="hover:text-white hover:underline hover:cursor-pointer"
              onClick={() => navigate("/sign-up")}
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
