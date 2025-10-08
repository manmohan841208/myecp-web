"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/atoms/Card";
import Image from "@/components/atoms/Image";
import { Tooltip, DummyCardImage, PointsImg, RewardImg, BannerImage2} from "@/assets/svg";
import Button from "@/components/atoms/Button";
import { InputField } from "@/components/atoms/InputField";
import Link from "next/link";
import CustomAlert from '@/components/atoms/AlertMessage'
import Carousel from "@/components/atoms/Carousal";
import CustomCheckbox from "@/components/atoms/Checkbox";
import { DynamicTooltip } from "@/components/atoms/Tooltip";
import { useRouter } from 'next/navigation';
import { setUserID, setPassword, setRememberMe } from '@/store/slices/loginSlice';
import { useLoginUserMutation } from '@/store/services/authApi';


const Login = () => {
  const dispatch = useDispatch();
  const { UserName, Password, rememberMe } = useSelector((state: any) => state.login);
  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();
  // const [userId, setUserId] = useState("");
  // const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showError, setShowError] = useState(false);
  
 const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
e.preventDefault();
try {
  const result = await loginUser({ UserName, Password, rememberMe }).unwrap();
  console.log('Login success:', result);
  // You can redirect or store token here
} catch (err) {
  console.error('Login failed:', err);
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
          {showError && <CustomAlert type="error" description={errorMessage}/> }
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <InputField 
              label="User ID" 
              onChange={(e: any) => dispatch(setUserID(e.target.value))}
            />
            <div className="flex justify-end items-center gap-1">
              Forgot
              <Link
                href="#"
                className="text-blue-600 text-sm hover:text-blue-800 "
              >
                User ID
              </Link>
              
              <DynamicTooltip 
                side="right"
                align="center"
                className="bg-black rounded-[4px] w-[120px]"
                content="You may recover your User ID">
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputField 
              label={"Password"} 
              // iconRight={BlackEyeOpen}
              type="password"
              onChange={(e: any) => dispatch(setPassword(e.target.value))}
            />
            <div className="flex justify-end items-center gap-1">
              Forgot
              <Link
                href="#"
                className="text-blue-600 text-sm hover:text-blue-800 "
              >
                Password?
              </Link>
              <DynamicTooltip 
                side="right"
                align="center"
                className="bg-black rounded-[4px] w-[120px]"
                content="You may recover your Password">
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
              {/* </div> */}
            </div>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-1 ">
              {/* <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-blue-600"
              />
              <label htmlFor="remember" className="text-sm">
                Remember User ID
              </label> */}
              <CustomCheckbox 
                id="remember" 
                label="Remember User ID" 
                checked={remember} 
                onChange={setRemember}
              />
            </div>
            <Button 
              variant={UserName && Password ? "primary" : "disabled"}
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
                className="text-blue-600 text-sm hover:text-blue-800 "
              >
                Please register here
              </Link>
              <Image src={Tooltip} alt="tooltip icon" />
            </div>
          </div>
        </Card>

      <Card className="w-[65%] !p-0  hidden lg:block  ">
        {/* <CarouselDemo
          images={[
            <Image
              src={BannerImage}
              alt="Banner 1"
              className="w-full h-full object-cover" 
              key="1"
            />,
            <Image
              src={BannerImage}
              alt="Banner 2"
              className="w-full h-full object-cover"
              key="2"
            />,
            <Image
              src={BannerImage}
              alt="Banner 3"
              className="w-full h-full object-cover"
              key="3"
            />,
          ]}
        /> */}
        <Carousel images={images} autoScroll interval={3000} className="rounded-lg"/>
      </Card>
      </section>

      <section className="card">
        <Card className="">
          <h1>MILITARY STAR</h1>
          <div className="flex md:justify-evenly md:items-start gap-4 items-center flex-col justify-center md:flex-row">
            
          <div className="flex flex-col items-center justify-between h-full ">
          <Image src={DummyCardImage} alt="dummy-card" className="h-fit"/>
          <Button variant={"primary"} className={"w-auto"}>Apply Now</Button>
          <Link
            href="#"
            className="text-blue-600 text-sm hover:text-blue-800 "
          >Learn More</Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Image src={PointsImg} alt="points-img" className="w-82"/>
          <Link
            href="#"
            className="text-blue-600 text-sm hover:text-blue-800 "
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
