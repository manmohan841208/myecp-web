'use client';

import Card from '@/components/atoms/Card';
import Image from '@/components/atoms/Image';
import React, { useState } from 'react';
import { Email } from '@/assets/svg';
import { InputField } from '@/components/atoms/InputField';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useRouter } from 'next/navigation';

const TwoFactAuthCodeEntryPage = () => {
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);

  const isEmpty = code.trim().length < 6;

  const router = useRouter();

  const handleContinue = () => {
    if (code === '123456') {
      setShowError(false);
      router.push('/account-summary');
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="mx-auto max-w-[1152px] bg-red-400 p-4 !text-base ">
      <Card
        header={'For Your Added Security'}
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
      >
        <div className="flex flex-col gap-4 px-4">
          {showError && (
            <CustomAlert
              type="error"
              className="mt-3"
              description={`We're sorry! The code you entered is either expired or invalid. Please try again.`}
            />
          )}

          <div className="flex justify-end pt-3">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <p>
            <span className="font-bold">Check your Email.</span> An email with
            your authentication code has been sent. Please enter it below and
            click “Confirm”
          </p>

          <Card
            className="w-full bg-[var(--color-white)] !p-0"
            header={
              <>
                Select Delivery Method{' '}
                <span className="text-[var(--text-error)]">*</span>
              </>
            }
          >
            <div className="px-3">
              <div className="flex flex-col pt-9 pb-3">
                <div className="flex items-center gap-3 pl-4 text-[var(--color-disabled-text)]">
                  <div className="flex h-[60px] w-[60px] items-center justify-center">
                    <Image src={Email} alt="email-img" />
                  </div>

                  <div className="flex-1">
                    <InputField
                      label={
                        <div className="flex gap-1">
                          <p className="text-black">Enter Your Code</p>
                          <span className="text-[var(--text-error)]">*</span>
                        </div>
                      }
                      // className="w-full border-black text-base text-black sm:w-1/2"
                      value={code}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCode(e.target.value)
                      }
                      inputMode="numeric"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>

              <div className="ps-[calc(1rem+60px+0.75rem)] pb-5 text-sm">
                <Link href="#" className="text-[var(--hyperlink)]">
                  Click here to request a new authentication code
                </Link>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-end gap-2 mb-4 h-10">
            <Button variant={'outline'} className='h-full'>Cancel</Button>

            <Button
              variant={isEmpty ? 'disable' : 'primary'}
              className="h-full disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactAuthCodeEntryPage;
