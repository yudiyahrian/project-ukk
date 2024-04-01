"use client";

import React, { useEffect, useRef, useState } from 'react'
import TextInput from '../TextInput'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js';
import { twMerge } from 'tailwind-merge';

const contentAnimate = {
  inital: {

  }
}

const Auth = () => {
  const [type, setType] = useState<'signIn' | 'signUp'>('signIn');
  const [contentHeight, setContentHeight] = useState<number>(0)

  const changeContent = (content: 'signIn' | 'signUp') => {
    setType(content);
  }

  return (
    <div className={twMerge('flex flex-col gap-3 items-center w-fit p-8 px-12 pb-7 cursor-default h-auto transition-all', contentHeight > 0 && `h-[${contentHeight}]`)}>
      {type === 'signUp' ? (
        <SignUp changeContent={changeContent} />
      ) : (
        <SignIn changeContent={changeContent} />
      )}
    </div>
  )
};

const SignUp = ({ changeContent }: { changeContent: (content: 'signIn' | 'signUp') => void }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const checkEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      setEmailError('please use a valid email address');
    }
  }

  const checkPassword = () => {
    if (!password.length || !confirmPassword.length) {
      setPasswordError('')
    }
  }

  const signUp = () => {
    checkEmail();
  }

  return (
    <>
      <p className='text-lg text-primary font-bold'>app logo</p>

      <div className='flex flex-col gap-2 w-[300px]'>
        <p className='text-dark text-[17px] font-semibold'>Join Our Exclusive Community!</p>
        <p className='text-dark text-opacity-45 font-semibold text-[11px]'>New to Flinsta? Sign up now to start saving your favorite ideas, and discovering inspiration.</p>
      </div>

      <div className='flex flex-col gap-3 mt-2'>
        <TextInput
          icon='mingcute:user-2-fill'
          label='Username'
          value={username}
          setValue={setUsername}
        />

        <TextInput
          icon='ic:baseline-email'
          label='Email'
          value={email}
          setValue={setEmail}
        />

        <TextInput
          icon='mingcute:lock-fill'
          label='Password'
          value={password}
          setValue={setPassword}
          passwordToggle
        />

        <TextInput
          icon='mingcute:unlock-fill'
          label='Confirm Password'
          value={confirmPassword}
          setValue={setConfirmPassword}
          passwordToggle
        />
      </div>

      <motion.button onClick={() => signUp()} whileTap={{ scale: .95, transition: { type: 'linear' } }} className='w-full bg-dark rounded-xl text-xs font-normal py-3.5 mt-4'>
        Create My Account
      </motion.button>

      <p className='text-dark text-opacity-55 font-medium text-xs my-1'>or continue with</p>

      <div className='w-full flex items-center gap-[2px]'>
        <Providers />
      </div>

      <p className='w-[300px] text-dark text-opacity-50 font-medium text-[11px] mt-4'>Your privacy matters. We keep your data secure and never share it.</p>

      <div className='flex items-center gap-1 text-[11px] text-dark mt-4 font-medium'>
        <p className='text-opacity-55'>already have an account?</p>
        <button onClick={() => changeContent('signIn')} className='font-semibold text-xs underline'>Sign In</button>
      </div>
    </>
  )
}

const SignIn = ({ changeContent }: { changeContent: (content: 'signIn' | 'signUp') => void }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const contentRef = useRef<any>(null);

  useEffect(() => {
    changeContent('signIn')
  })

  const checkEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length === 0) {
      setEmailError('You')
    } else if (emailRegex.test(email)) {

    }
  }

  const SignIn = () => {
    checkEmail();
  }

  return (
    <motion.div className='w-full h-full flex flex-col gap-3 items-center' ref={contentRef}>
      <p className='text-lg text-primary font-bold'>app logo</p>

      <div className='flex flex-col gap-2 w-[300px]'>
        <p className='text-dark text-[17px] font-semibold'>Welcome Back!</p>
        <p className='text-dark text-opacity-45 font-semibold text-[11px]'>Already a part of the Flinsta community? Sign in here to explore your boards and discover new content.</p>
      </div>

      <div className='flex flex-col gap-3 mt-2'>
        <TextInput
          icon='ic:baseline-email'
          label='Email'
          value={email}
          setValue={setEmail}
          error={emailError}
        />

        <div className='flex flex-col items-end gap-1'>
          <TextInput
            icon='mingcute:lock-fill'
            label='Password'
            value={password}
            setValue={setPassword}
            passwordToggle
            error={passwordError}
          />
          <button className='text-black text-opacity-55 text-[10px] font-semibold underline hover:text-opacity-75 transition-all'>forgot password?</button>
        </div>
      </div>

      <motion.button disabled whileTap={{ scale: .95, transition: { type: 'linear' } }} className='w-full bg-dark rounded-xl text-xs font-normal py-3.5 mt-2.5'>
        Login
      </motion.button>

      <p className='text-dark text-opacity-55 font-medium text-xs my-1'>or continue with</p>

      <div className='w-full flex items-center gap-[2px]'>
        <Providers />
      </div>

      <p className='w-[300px] text-dark text-opacity-50 font-medium text-[11px] mt-4'>Your privacy matters. We keep your data secure and never share it.</p>

      <div className='flex items-center gap-1 text-[11px] text-dark mt-4 font-medium'>
        <p className='text-opacity-55'>{"Didn't have an account?"}</p>
        <button onClick={() => changeContent('signUp')} className='font-semibold text-xs underline'>Create Account</button>
      </div>
    </motion.div>
  )
}

const Providers = () => {
  const providers = [
    {
      icon: 'flat-color-icons:google',
      label: 'Google'
    },
    {
      icon: 'logos:facebook',
      label: 'Facebook'
    },
    {
      icon: 'bi:github',
      label: 'Github'
    }
  ]

  return (
    <>
      {providers.map((item, index) => (
        <button key={index} className='w-full py-2 rounded-lg border border-black border-opacity-15 flex items-center justify-center'>
          <Icon icon={item.icon} className='text-[22px] text-black' />
        </button>
      ))}
    </>
  )
}

export default Auth