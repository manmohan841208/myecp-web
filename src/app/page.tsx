import React from 'react';
import NotAvailable from './notAvailable';
import LoginTemplate from '@/templates/login/loginTemplate';
import Login from '@/components/organisms/Login/page';

export default function HomePage() {
  return (
    <div className="flex w-full justify-center gap-8 px-4 py-3 md:px-16">
      <LoginTemplate>
        <Login />
      </LoginTemplate>
    </div>
  );
}
