"use client";
import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Image from "@/components/atoms/Image";
import { BannerImage, Tooltip, DummyCardImage, PointsImg, RewardImg, BlackEyeOpen, BannerImage2 } from "@/assets/svg";
import Button from "@/components/atoms/Button";
import { InputField } from "@/components/atoms/InputField";
// import CarouselDemo from "@/components/atoms/carouselTest";
import Link from "next/link";
// import CustomAlert from '@/components/atoms/AlertMessage'
import Carousel from "@/components/atoms/Carousal";
import { DynamicTooltip } from "@/components/atoms/Tooltip";



const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // alert(`User ID: ${userId}\nPassword: ${password}\nRemember: ${remember}`);
  };

  const errorMessage = "The information you entered does not match our records. Your MyECP Profile has been locked for 15 minutes. For immediate assistance, please contact customer service 24/7 at 1-877-891-7827."

  const images = [
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
    // <Image
    //   src={BannerImage2}
    //   alt="Banner 3"
    //   className="rounded-lg"
    //   key="4"
    // />,
    // <Image
    //   src={BannerImage2}
    //   alt="Banner 3"
    //   className="rounded-lg"
    //   key="5"
    // />,
  ]

  return (
    <div className="flex flex-col gap-3 w-full">
      <section className="flex gap-3 w-full ">
        <Card className="lg:w-[35%] w-full !p-3 min-h-[410px] flex flex-col justify-between">
          <div>
            {/* <CustomAlert type="error" description={errorMessage}/> */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <InputField label="User ID" />
                <div className="flex justify-end items-center gap-1">
                  Forgot
                  <Link
                    href="#"
                    className="text-blue-600 text-sm hover:text-blue-800 "
                  >
                    User ID

                  </Link>
                  <DynamicTooltip
                    content={
                      <>
                        <p>You may</p>
                        <p>recover your User ID</p>
                      </>
                    }
                    className="bg-black rounded-[4px] "
                    side="right"
                    align="center"
                  >
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
                    content={
                      <>
                        <p>You may reset</p>
                        <p>your Password</p>
                      </>
                    }
                    className="bg-black rounded-[4px] "
                    side="right"
                    align="center"
                  >
                    <Image src={Tooltip} alt="tooltip icon" />
                  </DynamicTooltip>
                  {/* </div> */}
                </div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-1 h-5 justify-center items-center">
                  {/* <InputField
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-black !border-black border-[4px] "
                /> */}
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className=" !accent-black  w-4 h-4 border-[6px] border-black rounded-[2px] "
                  />

                  <label htmlFor="remember" className="text-sm">
                    Remember User ID
                  </label>
                </div>
                <Button variant={"disable"}>Log In</Button>
              </div>
            </form>
          </div>

          <div className="text-center text-sm mt-2">
            <div className="flex justify-center items-center gap-1">
              New to My ECP? Please
              <Link
                href="#"
                className="text-blue-600 text-sm hover:text-blue-800 "
              >
                register here
              </Link>
              <DynamicTooltip
                content={
                  <>
                    <p>Your MyECP profile is</p>
                    <p>unique to MyECP.com</p>
                  </>
                }
                className="bg-black rounded-[4px] "
                side="right"
                align="center"
              >
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
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
          <Carousel images={images} autoScroll interval={3000} className="rounded-lg" />
        </Card>
      </section>

      <section className="card">
        <Card className="">
          <h1>MILITARY STAR</h1>
          <div className="flex md:justify-evenly md:items-start gap-4 items-center flex-col justify-center md:flex-row">

            <div className="flex flex-col items-center justify-between h-full ">
              <Image src={DummyCardImage} alt="dummy-card" className="h-fit" />
              <Button variant={"primary"} className={"w-auto"}>Apply Now</Button>
              <Link
                href="#"
                className="text-blue-600 text-sm hover:text-blue-800 "
              >Learn More</Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Image src={PointsImg} alt="points-img" className="w-82" />
              <Link
                href="#"
                className="text-blue-600 text-sm hover:text-blue-800 "
              >See Rewards Terms and Conditions</Link>
            </div>

            <div>
              <Image src={RewardImg} alt="reward-img" className="w-76" />
            </div>

          </div>

        </Card>
      </section>
    </div>
  );
};

export default Login;
