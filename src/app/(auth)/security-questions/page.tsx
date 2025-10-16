'use client'

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useState } from 'react';
import CustomCheckbox from '@/components/atoms/Checkbox';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/atoms/AlertMessage';

export default function SecurityForm() {
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityQuestion === "test") {
      router.push('/account-summary');
    } else {
      setErrorMessage("Oops! The answer you entered is incorrect.");
      setShowError(true);
    }
  };

  return (
    <div className='px-4 py-7 md:px-16'>
      <Card
        className="bg-[var(--color-white)] !p-0 md:w-[74.65%] w-full"
        header="For Your Added Security"
      >
        <div className='px-4 flex flex-col gap-4'>
          {showError && (
            <CustomAlert
              type="error"
              className='mt-3'
              description={errorMessage}
            />
          )}

          <div className='flex justify-end pt-3'>
            <b><span className="text-[var(--text-error)] px-1">*</span>Required Fields</b>
          </div>

          <p className='text-base'>
            We need to confirm it&apos; really you. To verify and protect your account, please answer your security question.
          </p>

          <form className="" onSubmit={handleLogin}>
            <Card className='flex flex-col gap-3 bg-white px-[38px] pt-9 pb-6 border-t-4 border-t-[#D3D3D3]'>
              <InputField
                type='text'
                value={securityQuestion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSecurityQuestion(e.target.value)
                }
                label={
                  <>
                    What is the first name of your oldest niece? <span className="text-[var(--text-error)] ">*</span>
                  </>
                }
                className='sm:w-[47.95%] w-full border-[2px] border-[var(--primary-color)]'
              />

              <div>
                <CustomCheckbox label="Remember User ID" className="!text-sm" />
              </div>

              <p>Do not select this option if you are using a public computer, such as in a library.</p>
            </Card>

            <div className='flex justify-end items-center gap-2 py-4'>
              <Button variant={'outline'}>Cancel</Button>
              <Button
                variant={securityQuestion.length > 2 ? "primary" : 'disable'}
                onClick={(e: any) => {
                  if (securityQuestion.length <= 2) {
                    e.preventDefault();
                    setErrorMessage("Please first fill the security question, then continue.");
                    setShowError(true);
                  }
                }}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}