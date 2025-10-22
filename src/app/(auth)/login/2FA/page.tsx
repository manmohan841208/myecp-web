'use client';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Email, Phone } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import CustomCheckbox from '@/components/atoms/Checkbox';
// import CustomAccordion from "@/components/atoms/Accordion";
import { useRouter } from 'next/navigation';

const TwoFactorAuthPage = () => {
  const route = useRouter();

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base ">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header="For Your Added Security"
      >
        <div className="flex flex-col gap-4 px-4">
          <div className="flex justify-end pt-3">
            <b>
              <span className="px-1 text-[var(--text-error)]">*</span>Required
              Fields
            </b>
          </div>

          <p className=' text-sm sm:!text-base'>
            We need to confirm it’s really you. As part of the two-factor
            authentication process, we’ll send you an authentication code
            through one of the below delivery methods.
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
              <div className="flex flex-col py-9">
                <RadioGroup className="flex flex-col gap-9">
                  <div className="flex items-center gap-3 pl-4 text-[var(--color-disabled-text)]">
                    <div className="flex h-15 w-15 items-start justify-center">
                      <Image
                        src={Phone}
                        alt="phone-img"
                        className="opacity-35"
                      />
                    </div>
                    <div>
                      <Label htmlFor="r2" className="text-base font-bold">
                        Phone
                      </Label>
                      <div className="flex items-center justify-start gap-1">
                        <RadioGroupItem value="phone" id="r2" />
                        <span>******7890</span>
                      </div>
                      <div className="pl-4">
                        <p>
                          You are not enrolled to receive 2FA code via text.
                        </p>
                        <p>You can enroll by going to My Profile at anytime.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-4">
                    <div className="flex h-15 w-15 items-center justify-center">
                      <Image src={Email} alt="email-img" />
                    </div>
                    <div>
                      <Label htmlFor="r2" className="text-base font-bold">
                        Email
                      </Label>
                      <div className="flex items-center justify-center gap-1">
                        <RadioGroupItem value="email" id="r2" checked={true} />
                        <span>T***1@GMAIL.COM</span>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="pb-5 text-sm">
                Please call 1-877-891-7827 If you no longer have access to this
                email address or phone number
              </div>
            </div>
          </Card>
          <div className="flex items-center justify-between pb-4">
            <div>
              <CustomCheckbox label="Remember User ID" className="!text-sm" />
            </div>
            <div className="flex items-center justify-center gap-2 h-10">
              <Button variant={'outline'} className='h-full'>Cancel</Button>

              <Button
                variant={'primary'}
                onClick={() => route.push('/login/2FA/code-entry')}
                className='h-full'
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactorAuthPage;
