import React from 'react'
import ClientComponent from './ClientComponent'
import prisma from '@/lib/prisma';

const page = async () => {

    const testArray = await prisma.task.findMany();
  return (
    <div>

        <ClientComponent />
        <p>{JSON.stringify(testArray, null, 2)}</p>
    </div>
  )
}

export default page