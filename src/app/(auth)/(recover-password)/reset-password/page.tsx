'use client';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import { InputField } from '@/components/atoms/InputField';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/atoms/AlertMessage';
import { useResetPasswordMutation } from '@/store/services/resetPasswordApi';
import { useDispatch } from 'react-redux';
import { setResetPasswordMessage } from '@/store/slices/resetPasswordSlice';
import { CANCEL, REQUIRED_FIELDS } from '@/constants/commonConstants';
import { LOGIN, SUBMIT } from '@/constants/forgotPwdSQConstants';
import { Loader } from '@/components/atoms/Loader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/schemas/resetPasswordSchema';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    NewPassword: '',
    ConfirmPassword: '',
    UserName: localStorage.getItem('forgotPwdUserName') || '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pwdNotSame, setPwdNotSame] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorMessage('');
    setShowAlert(false);
    setPwdNotSame('');
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    if (isValid) {
      const payload: any = {
        ...data,
        UserName: localStorage.getItem('forgotPwdUserName') || '',
      };

      try {
        const response = await resetPassword(payload).unwrap();
        dispatch(setResetPasswordMessage(response));
        setSuccessMessage(response);
        setShowSuccessAlert(true);
        localStorage.removeItem('forgotPwdUserName');
      } catch (err: any) {
        setShowAlert(true);
        setErrorMessage(
          err?.data?.Message ||
            err?.data?.message ||
            'Something went wrong! Please try again.',
        );
      }
    }
  };

  return (
    <div className="mx-auto max-w-[1152px] p-4 !text-base">
      <Card
        className="w-full bg-[var(--color-white)] !p-0 md:w-[74.65%]"
        header={showSuccessAlert ? 'MyECP Password Reset' : 'For Your Security'}
      >
        <div className="flex flex-col p-4 !pb-0 gap-4">
          {showAlert ? (
            <CustomAlert
              type="error"
              description={errorMessage}
            />
          ) : (
            ''
          )}

          {showSuccessAlert ? (
            <CustomAlert
              type="success"
              description={successMessage}
              className="mb-2"
            />
          ) : (
            ''
          )}

          {isLoading && <Loader className="mx-auto mb-4" />}

          {showSuccessAlert ? null : (
            <div className="flex justify-end">
              <b>
                <span className="px-1 text-[var(--text-error)] !text-sm">*</span>
                {REQUIRED_FIELDS}
              </b>
            </div>
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data: any) => resetPasswordSubmit(data))}
          >
            {showSuccessAlert ? null : (
              <Card className="customCard flex flex-col gap-3 py-3 sm:flex-row md:p-6 lg:px-6">
                <div className="w-full sm:w-1/2">
                  <InputField
                    label="New Password"
                    mandantory={true}
                    {...register('NewPassword')}
                    error={errors.NewPassword?.message}
                    name="NewPassword"
                    className="w-full"
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <InputField
                    label="Confirm Password"
                    mandantory={true}
                    {...register('ConfirmPassword')}
                    error={errors.ConfirmPassword?.message}
                    name="ConfirmPassword"
                    type="password"
                    className="w-full"
                  />
                </div>
              </Card>
            )}

            <div className="flex items-center justify-end gap-2 pb-4">
              {!showSuccessAlert ? (
                <>
                  <Button variant="outline" onClick={() => router.back()}>
                    {CANCEL}
                  </Button>

                  <Button
                    variant={isValid ? 'primary' : 'disable'}
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    // onClick={() => resetPasswordSubmit()}
                    type="submit"
                    disabled={!isValid}
                  >
                    {SUBMIT}
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => router.push('/login')}>
                  {LOGIN}
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
