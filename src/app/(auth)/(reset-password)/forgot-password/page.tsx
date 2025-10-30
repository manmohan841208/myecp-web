'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import { Relode } from '@/assets/svg';
import Image from '@/components/atoms/Image';
import CustomAlert from '@/components/atoms/AlertMessage';
import { NotSecure } from '@/assets/svg';
import { useRouter } from 'next/navigation';
import { setForgotPWDSecurityQuestions } from '@/store/slices/forgotSecurityQuestionsSlice';
import { useDispatch } from 'react-redux';
import { useForgotPasswordMutation } from '@/store/services/forgotPasswordApi';
import { useLazyGetCaptchaImageQuery } from '@/store/services/getCaptchaApi';
import { extractTextFromCaptchaBlob } from '@/utils/blobToText';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/schemas/forgotPasswordSchema';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { Loader } from '@/components/atoms/Loader';
import { FORGOT_PASSWORD } from '@/constants/forgotPasswordConstants';
import { PLEASE_ENTER_THE_STRING_AS_SHOWN_ABOVE } from '@/constants/forgotUserIdConstants';
import { set } from 'zod';
import DatePicker from '@/components/atoms/Calendar/page';
import { format } from 'date-fns';

export default function ForgotUserIdPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const route = useRouter();

  const [captchaVerify, setCaptchaVerify] = useState('');
  const [form, setForm] = useState({
    UserName: '',
    SSNLast5: '',
    DOB_Day: '',
    DOB_Month: '',
    DOB_Year: '',
  });

  const [showCredentialError, setShowCredentialError] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trigger, { data: blob, isFetching }] = useLazyGetCaptchaImageQuery();
  const [captchaText, setCaptchaText] = useState('');
  const [fieldError, setFieldError] = useState(false);

  const {
    control,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  // ✅ Watch all form values
  const values = useWatch({ control });

  // ✅ Check validity using Zod schema
  const isFormValid = forgotPasswordSchema.safeParse(values).success;

  const fetchCaptcha = async () => {
    try {
      const blobData = await trigger().unwrap();
      const text = await extractTextFromCaptchaBlob(blobData);
      setCaptchaText(text);
    } catch (err) {
      console.error('Failed to fetch or read CAPTCHA:', err);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleDOBChange = (date: any) => {
    const [month, day, year] = date.split('/');
    setShowError(false);
    setErrorMessage('');
    setForm((prev) => ({
      ...prev,
      DOB_Year: year,
      DOB_Month: month,
      DOB_Day: day,
    }));
  };

  const handleValidate = async (data: ForgotPasswordFormValues) => {
    const isCaptchaValid = captchaVerify === captchaText;

    if (!isCaptchaValid) {
      setShowCaptchaError(true);
      setShowError(true);
      setErrorMessage('Please enter verification code shown below.');
      return;
    } else {
      setShowCaptchaError(false);
      setShowError(false);
      setErrorMessage('');
    }

    const payload: any = {
      UserName: data.UserName,
      SSNLast5: data.SSNLast5,
      DOB_Day: form.DOB_Day,
      DOB_Month: form.DOB_Month,
      DOB_Year: form.DOB_Year,
    };

    try {
      const response: any = await forgotPassword(payload).unwrap();
      localStorage.setItem('forgotPwdUserName', data.UserName);
      dispatch(setForgotPWDSecurityQuestions(response));
      route.push('/for-your-security'); // Navigate to next step
    } catch (err: any) {
      setShowError(true);
      setFieldError(true);
      setErrorMessage(
        err?.data?.Message ||
          err?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  const handleCaptchaChange = (value: string) => {
    setShowCaptchaError(false);
    setCaptchaVerify(value);
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:max-w-[860px]"
        header={FORGOT_PASSWORD}
      >
        {isLoading && <Loader className="mx-auto mb-4" />}
        <div className="flex flex-col gap-4 p-4">
          {showError && <CustomAlert type="error" description={errorMessage} />}

          <div className="flex justify-end">
            <b className="!text-[14px]">
              <span className="px-1 text-[var(--text-error)]">*</span>
              {REQUIRED_FIELDS}
            </b>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data: any) => handleValidate(data))}
          >
            <Card className="customCard flex w-full flex-col gap-4 sm:flex-row md:p-6 lg:px-6">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="User ID"
                  mandantory
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^A-Za-z0-9\s]/g,
                      '',
                    );
                  }}
                  {...register('UserName')}
                  onFocus={() => {
                    setFieldError(false);
                    clearErrors('UserName');
                  }}
                  apiError={fieldError}
                  error={errors.UserName?.message}
                  name="UserName"
                  maxLength={30}
                  pattern="[A-Za-z0-9]{1,30}"
                  className={
                    showCredentialError
                      ? 'w-full text-[var(--text-error)]'
                      : 'w-full'
                  }
                  iconRight={
                    errors.UserName?.message || fieldError ? NotSecure : ''
                  }
                />
              </div>

              <div className="w-full sm:w-1/2">
                <InputField
                  label="Last 5 Digits of SSN"
                  className="w-full"
                  mandantory
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      '',
                    );
                  }}
                  {...register('SSNLast5', {
                    onChange: () => {
                      setFieldError(false);
                    },
                  })}
                  onFocus={() => {
                    clearErrors('SSNLast5');
                    setFieldError(false);
                  }}
                  apiError={fieldError}
                  error={errors.SSNLast5?.message}
                  name="SSNLast5"
                  type="password"
                  maxLength={5}
                  iconRight={
                    errors.SSNLast5?.message || fieldError ? NotSecure : ''
                  }
                />
              </div>
            </Card>

            <Card className="customCard flex w-full gap-4 md:p-6 lg:px-6">
              <div className="w-full pr-[6px] sm:w-1/2">
                <Controller
                  name="dob"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      value={field.value}
                      {...register(field.name)}
                      onChange={(date) => {
                        setFieldError(false);
                        handleDOBChange(date ? format(date, 'MM/dd/yyyy') : '');
                        field.onChange(date ? format(date, 'MM/dd/yyyy') : '');
                      }}
                      onBlur={field.onBlur}
                      onFocus={() => {
                        setFieldError(false);
                        clearErrors('dob');
                      }}
                      name={field.name}
                      label="Date of Birth"
                      apiError={fieldError}
                      error={fieldState.error?.message}
                      iconRight={
                        fieldState.error?.message || fieldError ? NotSecure : ''
                      }
                    />
                  )}
                />
              </div>
            </Card>

            <Card className="customCard flex flex-col md:p-6 lg:px-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="bg-[#000f73] px-[12px] py-1 text-xl text-white">
                    {captchaText || !isFetching ? captchaText : 'Loading...'}
                  </div>

                  <Button
                    onClick={() => fetchCaptcha()}
                    className="!bg-transparent !p-1"
                  >
                    <Image src={Relode} alt="reload-img" />
                  </Button>
                </div>

                <div className="responsive-captcha w-2/3 pr-[6px] sm:w-2/3 md:w-1/2 lg:w-1/2">
                  <InputField
                    mandantory
                    placeholder="Enter Captcha Code"
                    {...register('captchaInput', {
                      onChange: (e: any) => {
                        const value = e.target.value;
                        setShowCaptchaError(false);
                        setCaptchaVerify(value);
                      },
                    })}
                    onFocus={() => {
                      setFieldError(false);
                      clearErrors('captchaInput');
                    }}
                    apiError={showCaptchaError}
                    error={errors.captchaInput?.message}
                    name="captchaInput"
                    className={
                      showCaptchaError
                        ? 'w-full text-[var(--text-error)]'
                        : 'w-full'
                    }
                    iconRight={
                      showCaptchaError || errors.captchaInput?.message
                        ? NotSecure
                        : ''
                    }
                  />
                </div>
              </div>

              <p
                className={`mt-1 w-full text-sm sm:w-1/2 ${
                  showCaptchaError ? 'text-[var(--text-error)]' : ''
                }`}
              >
                {PLEASE_ENTER_THE_STRING_AS_SHOWN_ABOVE}
              </p>
            </Card>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => route.back()}>
                {CANCEL}
              </Button>

              <Button
                variant={isFormValid ? 'primary' : 'disable'}
                type="submit"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Validating...' : 'Validate'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
