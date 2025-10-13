'use client'

// import CustomAlert from '@/components/atoms/AlertMessage'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { InputField } from '@/components/atoms/InputField'
// import React, { useState } from 'react'
import React from 'react'
// import { useRouter } from 'next/navigation'

const ResetPasswordPage = () => {
 

  return (
    <div className="p-4 md:px-16 !text-base">
      <Card className="bg-[var(--color-white)] !p-0 md:w-[74.65%] w-full" header="For Your Security">
        <div className="p-6 !pb-0 flex flex-col sm:gap-4">

            {/* <CustomAlert type="error" description="Password not match" /> */}
          
          <div className="flex justify-end">
            <b>
              <span className="text-[var(--text-error)] px-1">*</span>Required Fields
            </b>
          </div>

          <Card className="customCard w-full md:p-6 px-6 py-3 flex flex-col sm:flex-row gap-3">
            <div className="sm:w-1/2 w-full">
              <InputField
                label="New Password"
                isAsterisk={true}
                name="lastName"
              />
            </div>

            <div className="sm:w-1/2 w-full">
               <InputField
                 label="Confirm Password"
                 isAsterisk={true}
                 name="ssn"
                 type="password"
                 maxLength={5}
                />
            </div>
          </Card>

          <div className="flex items-center justify-end pb-4 gap-2">
            <Button variant="outline">Cancel</Button>

            <Button
              variant='disable'
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            
            >
              Submit
            </Button>
          </div>

        </div>
      </Card>
    </div>
  )
}

export default ResetPasswordPage