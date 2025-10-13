'use client'

import CustomAlert from '@/components/atoms/AlertMessage'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { InputField } from '@/components/atoms/InputField'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const ForYourSecurityPage = () => {
  const [city, setCity] = useState('')
  const [friendName, setFriendName] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  const correctCity = 'Texas'
  const correctFriendName = 'John'

  const handleSubmit = () => {
    if (city === correctCity && friendName === correctFriendName) {
      router.push('/login')
    console.log('true')
    } else {
      setShowAlert(true)
    }
  }

  const isEmpty = !city || !friendName

  return (
    <div className="p-4 md:px-16 !text-base">
      <Card className="bg-[var(--color-white)] !p-0 md:w-[74.65%] w-full" header="For Your Security">
        <div className="p-6 !pb-0 flex flex-col sm:gap-4">

          {showAlert && (
            <CustomAlert type="error" description="The information you entered does not match our records. You have 2 attempts remaining. Security questions are selected at random. The below questions may have changed " />
          )}

          <div className="flex justify-end">
            <b>
              <span className="text-[var(--text-error)] px-1">*</span>Required Fields
            </b>
          </div>

          <p>
            To verify and protect your account, please answer your security questions.
          </p>

          <Card className="bg-[var(--color-white)] w-full flex p-6">
            <div className="flex-1">
              <InputField
                label={
                  <div className="flex gap-1">
                    <p className="text-black">In what city was your highschool? (enter full name of city only.)</p>
                    <span className="text-[var(--text-error)]">*</span>
                  </div>
                }
                error={isEmpty ? "" : undefined}
                className="w-full sm:w-1/2 border-black text-base text-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </Card>

          <Card className="bg-[var(--color-white)] w-full flex p-6">
            <div className="flex-1">
              <InputField
                label={
                  <div className="flex gap-1">
                    <p className="text-black">What is your best friend’s first name?</p>
                    <span className="">*</span>
                  </div>
                }
                error={isEmpty ? "" : undefined}
                className="w-full sm:w-1/2 border-black text-base text-black"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex items-center justify-end pb-4 gap-2">
            <Button variant="outline">Cancel</Button>

            <Button
              variant={isEmpty ? 'disable' : 'primary'}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            //   disable={isEmpty}
              onClick={handleSubmit}
            >
              Reset Password
            </Button>
          </div>

        </div>
      </Card>
    </div>
  )
}

export default ForYourSecurityPage