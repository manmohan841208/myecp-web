'use client';
import React, { useState } from 'react';
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
import Carousel from '@/components/atoms/Carousal';
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

const Login = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { UserName, Password, rememberMe } = useSelector(
    (state: any) => state.login,
  );
  const [loginUser, { data, error, isLoading }] = useLoginMutation();
  const [remember, setRemember] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser({
        UserName,
        Password,
        IsSecurityQuestionNeeded: false,
      }).unwrap();
      localStorage.setItem('token', result?.Token);
      if (result?.Token) {
        login(result?.Token);
        router.push('/');
      }
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(err.data?.Message || 'Login failed. Please try again.');
    }
  };

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
  ];

  return (
    <div className="flex w-full flex-col gap-3">
      <section className="flex w-full gap-3">
        <Card className="flex min-h-[410px] w-full flex-col justify-between !p-3 lg:w-[35%]">
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
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {PLEASE_REGISTER_HERE}
              </Link>
              <Image src={Tooltip} alt="tooltip icon" />
            </div>
          </div>
        </Card>

        <Card className="hidden w-[65%] !p-0 lg:block">
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
          <Carousel
            images={images}
            autoScroll
            interval={3000}
            className="rounded-lg"
          />
        </Card>
      </section>

      <section className="card">
        <Card className="p-4">
          <h1>MILITARY STAR</h1>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-evenly">
            <div className="flex h-full flex-col items-center justify-between">
              <Image src={DummyCardImage} alt="dummy-card" className="h-fit" />
              <Button variant={'primary'} className={'w-auto'}>
                Apply Now
              </Button>
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image src={PointsImg} alt="points-img" className="w-82" />
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                See Rewards Terms and Conditions
              </Link>
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
