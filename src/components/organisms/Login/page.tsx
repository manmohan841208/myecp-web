"use client";
import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Image from "@/components/atoms/Image";
import {  Tooltip, DummyCardImage, PointsImg, RewardImg, BannerImage2} from "@/assets/svg";
import Button from "@/components/atoms/Button";
import { InputField } from "@/components/atoms/InputField";
// import CarouselDemo from "@/components/atoms/carouselTest";
import Link from "next/link";
import CustomAlert from '@/components/atoms/AlertMessage'
import Carousel from "@/components/atoms/Carousal";
import CustomCheckbox from "@/components/atoms/Checkbox";
import { DynamicTooltip } from "@/components/atoms/Tooltip";
import { useRouter } from 'next/navigation';



const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showError, setShowError] = useState(false);
  
const router = useRouter()


const handleLogin = (e: React.FormEvent) => {
  e.preventDefault()
   // Fake credentials
  if (
    userId === 'test@aafes.com' 
    && 
    password === 'Test@1234') {
      setShowError(false);
      if(remember){
        router.push("/security-form");
      }else{
        router.push("/login/2FA")
      }
    } else {
      setShowError(true);
    }
}


  

  const errorMessage = "The information you entered does not match our records. Your MyECP Profile has been locked for 15 minutes. For immediate assistance, please contact customer service 24/7 at 1-877-891-7827."

 const images=[
            <Image
              src={BannerImage2}
              alt="Banner 1"
              className="rounded-[8px]" 
              key="1"
            />,
            <Image
              src={BannerImage2}
              alt="Banner 2"
              className="rounded-[8px]"
              key="2"
            />,
            <Image
              src={BannerImage2}
              alt="Banner 3"
              className="rounded-[8px]"
              key="3"
            />,
          ]

  return (
    <div className="flex flex-col gap-3 w-full">
      <section  className="flex gap-3 w-full ">
        <Card className="lg:w-[35%] w-full !p-3 min-h-[410px] flex flex-col justify-between">
        <div>
          {showError && (
              <CustomAlert type="error" description={errorMessage} />
            )}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <InputField
                  label="User ID"
                  value={userId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserId(e.target.value)
                  }
                />
            <div className="flex justify-end items-center gap-1">
              Forgot
              <Link
                href="#"
                className="text-[var(--color-link)] text-sm"
              >
                User ID
              </Link>
              
              <DynamicTooltip 
                side="right"
                align="center"
                className="bg-[var(--color-black)] rounded-[4px] "
                content={
                  <>
                    <p>You may </p>
                    <p> recover your User ID</p>
                  </>
                }
                >
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputField
                  label={"Password"}
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
            <div className="flex justify-end items-center gap-1">
              Forgot
              <Link
                href="#"
                className="text-[var(--color-link)] text-sm  "
              >
                Password?
              </Link>
              <DynamicTooltip 
                side="right"
                align="center"
                className="bg-[var(--color-black)] rounded-[4px] "
                content={
                  <>
                    <p>You may recover</p>
                    <p>your Password</p>
                  </>
                }
                >
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
              {/* </div> */}
            </div>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-1 ">
              
                  <CustomCheckbox 
                  label=" Remember User ID"
                  onChange={()=>setRemember(!remember)}
                  />

            </div>
            <Button 
              variant={userId && password ? "primary" : "disable"}
            >
              Log In
            </Button>
          </div>
          </form>
        </div>

          <div className="text-center text-sm mt-2">
            <div className="flex justify-center items-center gap-1">
              New to My ECP?{" "}
              <Link
                href="#"
                className="text-[var(--color-link)] text-sm "
              >
                Please register here
              </Link>
              <DynamicTooltip 
                side="right"
                align="center"
                className="bg-[var(--color-black)] rounded-[4px] "
                content={
                  <>
                    <p>Your MyECP profile is </p>
                    <p>unique to MyECP.com</p>
                  </>
                }
                >
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
            </div>
          </div>
        </Card>

      <Card className="w-[65%] !p-0  hidden lg:block  ">
        <Carousel images={images} autoScroll interval={3000} className="rounded-[8px]"/>
      </Card>
      
      </section>

      <section className="card">
        <Card className="p-4">
          <h1>MILITARY STAR</h1>
          <div className="flex md:justify-evenly md:items-start gap-4 items-center flex-col justify-center md:flex-row">
            
          <div className="flex flex-col items-center justify-between h-full ">
          <Image src={DummyCardImage} alt="dummy-card" className="h-fit"/>
          <Button variant={"primary"} className={"w-auto"}>Apply Now</Button>
          <Link
            href="#"
            className="text-[var(--color-link)] text-sm   "
          >Learn More</Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Image src={PointsImg} alt="points-img" className="w-82"/>
          <Link
            href="#"
            className="text-[var(--color-link)] text-sm  "
          >See Rewards Terms and Conditions</Link>
        </div>

        <div>
          <Image src={RewardImg} alt="reward-img" className="w-76"/>
        </div>

      </div>
      
    </Card>
  </section>
    </div>
  );
};

export default Login;
