// import { create } from 'zustand';

// type OTP = {
//   OTPValue: string | null;
//   email: string | null;
// };

// interface OptState {
//   OTPValue: string | null;
//   email: string | null;
//   setOpt: (otp) => void;
//   clearOTP: () => void;
// }

// const useOptStore = create<OptState>((set) => ({
//   OTPValue: null,
//   email: null,
//   setOpt: (otp: OTP) => set({ OTPValue: otp.OTPValue, email: otp.email }),
//   clearOTP: () => set({ OTPValue: null, email: null }),
// }));

// export default useOptStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type OTP = {
  OTPValue: string | null;
  email: string | null;
};

interface OptState {
  OTPValue: string | null;
  email: string | null;
  setOpt: (otp: OTP) => void;
  clearOTP: () => void;
}

const useOptStore = create<OptState>(
  persist(
    (set) => ({
      OTPValue: null,
      email: null,
      setOpt: (otp: OTP) => set({ OTPValue: otp.OTPValue, email: otp.email }),
      clearOTP: () => set({ OTPValue: null, email: null }),
    }),
    {
      name: 'opt-storage', // Specify a name for the storage
      getStorage: () => localStorage, // Use localStorage as the storage medium
    }
  )
);

export default useOptStore;
