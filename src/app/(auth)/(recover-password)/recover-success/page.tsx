import React from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import CustomAlert from '@/components/atoms/AlertMessage'


const PasswordSuccessfullRecoverPage = () => {
  return (
    <div className="p-4 md:px-16 !text-base">
      <Card className="bg-[var(--color-white)] !p-0 md:w-[74.65%] w-full" header="MyECP Password Reset">
        <div className="p-6 !pb-0 flex flex-col sm:gap-4">

            <CustomAlert type="success" description="Your password has been reset successfully for MyECP account." />
          
          <div className="flex items-center justify-end pb-4 gap-2">
            <Button variant="primary">Login</Button>

          </div>

        </div>
      </Card>
    </div>
  )
}

export default PasswordSuccessfullRecoverPage
