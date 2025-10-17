'use client';

// import CustomAlert from '@/components/atoms/AlertMessage'
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
// import React, { useState } from 'react'
import React from 'react';
// import { useRouter } from 'next/navigation'

const ResetPasswordPage = () => {
  return (
    <div className="p-4 !text-base md:px-16">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header="For Your Security"
      >
        <div className="flex flex-col p-6 !pb-0 sm:gap-4">
          {/* <CustomAlert type="error" description="Password not match" /> */}

          <div className="flex justify-end">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <Card className="customCard flex w-full flex-col gap-3 px-6 py-3 sm:flex-row md:p-6">
            <div className="w-full sm:w-1/2">
              <InputField
                label="New Password"
                mandantory={true}
                name="lastName"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <InputField
                label="Confirm Password"
                mandantory={true}
                name="ssn"
                type="password"
                maxLength={5}
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2 pb-4">
            <Button variant="outline">Cancel</Button>

            <Button
              variant="disable"
              className="disabled:cursor-not-allowed disabled:opacity-50"
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
