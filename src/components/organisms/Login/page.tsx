

'use client';
import React, { useState, useMemo, ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@/components/atoms/Card';
import Image from '@/components/atoms/Image';
import {
  Tooltip,
  DummyCardImage,
  PointsImg,
  RewardImg,
  BannerImage2,
} from '@/assets/svg';
import Button from '@/components/atoms/Button';
import { InputField } from '@/components/atoms/InputField';

import Link from 'next/link';
import CustomAlert from '@/components/atoms/AlertMessage';
import Carousel from '@/components/atoms/Carousal/index';
import CustomCheckbox from '@/components/atoms/Checkbox';
import { DynamicTooltip } from '@/components/atoms/Tooltip';  
import { useRouter } from 'next/navigation';
import {
  setUserID,
  setPassword,
  setRememberMe,
} from '@/store/slices/loginSlice';
import { useLoginMutation } from '@/store/services/authApi';
import {
  USER_ID_LABEL,
  USER_PASSWORD_LABEL,
  LOGIN_BTN,
  FORGOT,
  FORGOT_PASSWORD,
  NEW_TO_MYECP,
  PLEASE_REGISTER_HERE,
  REMEMBER_USER_ID,
} from '@/constants/loginConstants';
import { useAuth } from '@/context/AuthProvider';
import { useGetPromotionsQuery } from '@/store/services/promotionsApi';
import { generatePromotionImages } from '@/components/molecules/PromotionBanners';

const Login = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { UserName, Password, rememberMe } = useSelector(
    (state: any) => state.login,
  );
  const [loginUser, { isLoading }] = useLoginMutation();
  const { data: promotionData } = useGetPromotionsQuery(1);
  const [remember, setRemember] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState<ReactElement[]>([]);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result: any = await loginUser({
        UserName,
        Password,
        IsSecurityQuestionNeeded: true,
      }).unwrap();
      localStorage.setItem('userInfo', JSON.stringify(result));
      localStorage.setItem('token', result?.Token);
      if (result?.IsSecurityQuestionsNeeded) {
        router.push('/security-questions');
      } else if (result?.Is2FANeeded) {
        router.push('/login/2FA');
      } else {
        login(result?.Token);
        router.push('/');
      }
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(err.data?.Message || 'Login failed. Please try again.');
    }
  };

  useEffect(() => {
    if (!isLoading && promotionData) {
      const baseUrl = process.env.NEXT_PUBLIC_BANNER_IMAGE_BASE_URL;
      const generatedImages = generatePromotionImages(promotionData, baseUrl);
      setImages(generatedImages);
    }
  }, [promotionData, isLoading]);

  const imageComponents = [
    <Image
      src={'https://myecp-dev-dpavtgrx.uc.gateway.dev/api/promotion-images?id=2836'}
      alt="Banner 1"
      // className="rounded-[8px]"
      key="1"
      width={800}
      height={300}
    />,
    <Image
      src={'https://myecp-dev-dpavtgrx.uc.gateway.dev/api/promotion-images?id=2838'}
      alt="Banner 2"
      // className="rounded-[8px]"
      key="2"
      width={800}
      height={300}
    />,
    <Image
      src={BannerImage2}
      alt="Banner 1"
      // className="rounded-[8px]"
      key="1"
      width={800}
      height={300}
    />,
  ];

  return (
   <div className="flex w-full flex-col gap-4 max-w-[1152px] mx-auto">
      <section className="flex w-full gap-4">
        <Card className="flex min-h-[410px] lg:max-h-[410px] w-full flex-col justify-between !p-3 lg:max-w-[373px]" >
          <div>
            {showError && (
              <CustomAlert type="error" description={errorMessage} />
            )}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div className="flex flex-col gap-1">
                <InputField
                  label={USER_ID_LABEL}
                  onChange={(e: any) =>
                    dispatch(
                      setUserID(e.target.value),
                      setShowError(false),
                      setErrorMessage(''),
                    )
                  }
                />
                <div className="flex items-center justify-end gap-1">
                  {FORGOT}
                  <Link
                    href="/forgot-user"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {USER_ID_LABEL}
                  </Link>
                  <DynamicTooltip
                    side="right"
                    align="center"
                    className="w-[120px] rounded-[4px] bg-black"
                    content="You may recover your User ID"
                  >
                    <Image src={Tooltip} alt="tooltip icon" />
                  </DynamicTooltip>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <InputField
                  label={USER_PASSWORD_LABEL}
                  type="password"
                  onChange={(e: any) =>
                    dispatch(
                      setPassword(e.target.value),
                      setShowError(false),
                      setErrorMessage(''),
                    )
                  }
                />
                <div className="flex items-center justify-end gap-1">
                  {FORGOT}
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {FORGOT_PASSWORD}
                  </Link>
                  <DynamicTooltip
                    side="right"
                    align="center"
                    className="w-[120px] rounded-[4px] bg-black"
                    content="You may recover your Password"
                  >
                    <Image src={Tooltip} alt="tooltip icon" />
                  </DynamicTooltip>
                  {/* </div> */}
                </div>
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-1">
                  <CustomCheckbox
                    id="remember"
                    label={REMEMBER_USER_ID}
                    checked={remember}
                    onChange={setRemember}
                  />
                </div>
                <Button variant={UserName && Password ? 'primary' : 'disable'}>
                  {LOGIN_BTN}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-2 text-center text-sm">
            <div className="flex items-center justify-center gap-1">
              {NEW_TO_MYECP}{' '}
              <Link
                href="/create-profile"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {PLEASE_REGISTER_HERE}
              </Link>
              <DynamicTooltip
                side="right"
                align="center"
                className="w-[152px] rounded-[4px] bg-black"
                content="Your MyECP profile is unique to MyECP.com"
              >
                <Image src={Tooltip} alt="tooltip icon" />
              </DynamicTooltip>
            </div>
          </div>
          
        </Card>

        <Card className="w-ull relative hidden max-h-[410px]  overflow-hidden !p-0 shadow-lg lg:block">
          <Carousel
            images={imageComponents}
            autoScroll
            interval={3000}
            // className="rounded-lg"
          />
        </Card>
        
      </section>


      <section className="w-full">


        <Card className=" h-full lg:max-h-[300px] w-full px-4 ">
          <div className='max-h-9 py-2'>
            <h1 className="!text-base">MILITARY STAR</h1>
          </div>

            {/* <p className='text-sm text-black hidden sm:text-[12px] sm:block'>
            </p> */}
            <div className='w-full text-white hidden lg:hidden sm:block'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, maxime! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, quo deleniti itaque cupiditate vero nihil blanditiis exercitationem, nisi 
             </div>
            

          <div className='w-full flex flex-col gap-6 lg:flex-row lg:justify-evenly lg:gap-2 pb-[14px]'>
 
            {/* Column 1 - Dummy Card Image + Button + Learn More */}
            <div className="flex flex-col items-center justify-between md:basis-1/3 max-h-[250px]">
              <div className="flex max-h-[182px] max-w-[240px] flex-col items-center justify-center">
                <Image
                  src={DummyCardImage}
                  alt="dummy-card"
                  className="max-h-[182px] max-w-[240px]"
                />
              </div>
              <div className="flex max-h-10 w-full items-center justify-center">
                <Button variant={'primary'} className="max-w-[97px]">
                  Apply Now
                </Button>
              </div>
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Learn More
              </Link>
            </div>

            {/* Column 2 - Points Image + Terms Link */}
            <div className="flex flex-col items-center justify-between md:basis-1/3 ">
              <div className='max-h-[246px]  max-w-[384px] flex flex-col items-center justify-center'>
                  <div className="max-h-[222px] max-w-[331px]">
                    <Image src={PointsImg} alt="points-img" className="max-h-[222px]" />
                  </div>

                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    See Rewards Terms and Conditions
                  </Link>
              </div>
            </div>

            {/* Column 3 - Reward Image */}
            <div className="flex items-center justify-center md:basis-1/3 max-h-[243px]">
              <div className="max-h-[243px]  max-w-[304px]">
                <Image src={RewardImg} alt="reward-img" className="max-h-[243px] max-w-[304px]" />
              </div>
            </div>

          </div>
        </Card>
      </section>


    </div>
  );
};

export default Login;
