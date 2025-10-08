import Card from "@/components/atoms/Card"
import React from "react"
import Button from "@/components/atoms/Button"
import { Tooltip } from "@/assets/svg"
import Image from "@/components/atoms/Image"


export default function RecoverUserID(){
    return(
    <div className="px-4 py-4 md:px-16 !text-base w-full">
      <Card
        className="bg-[var(--color-white)] !p-0 md:w-[74.65%] w-full"
        header="Confirmation"
      >
        <div className="p-4 flex flex-col gap-4">


          <div className="card pt-4 pb-4 ">
                <div className=" pr-4 pl-4 flex items-center justify-start gap-1 cursor-pointer pt-3 pb-3 ">
                    <div className="flex items-center justify-center pl-2">
                        <Image 
                        src={Tooltip} 
                        alt="tooltip-img"
                        />
                    </div>
                    <i>Log in Assistance</i>
                </div>

                <hr className="border-[var(--text-disabled)]"/>

                <div 
                className=" pr-4 pl-6 flex items-center justify-start gap-1  pb-2 pt-3 ">
                    <p>Your User ID is</p> <b>MMACCXPrime.</b>
                </div>
          </div>
          
          <div className=" flex justify-end items-center pb-4">
           
            <div className="flex items-center justify-center gap-2">
              
              <Button 
              variant={"primary"}
            //   onClick={()=>route.push('/login/2FA/code-entry')}
              >
                Login
                </Button>

            </div>
          </div>
        </div>
      </Card>

    </div>
    )
}
