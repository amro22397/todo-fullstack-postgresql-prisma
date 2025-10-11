import React from 'react'
import LoginPage from '@/components/signIn/SignIn'
import { redirect } from 'next/navigation';
import { getSession } from './actions/getUser';

const page = async () => {

  const session = await getSession();
  console.log(session?.user?.email)

  if (session?.user?.email) {
    return redirect('/to-dos');
  }

  return (
    <div className='flex justify-center items-center h-screen poppins'>
      <LoginPage />
      <div className=""></div>
    </div>
  )
}

export default page

