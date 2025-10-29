import React from 'react';

type PasswordRequirementsProps = {
  password: string;
};

export default function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  const validations = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[&@#%$^*!]/.test(password),
  };

  const getClass = (condition: boolean) =>
    condition ? 'text-[#318B29] font-medium' : 'text-black-600';

  const getIcon = (condition: boolean) => (condition ? '✓' : '•');

  return (
    <div className="border-none p-2">
      <p className="font-semibold">The password must have:</p>
      <ul className="text-[12px]">
        <li className={getClass(validations.length)}>
          {getIcon(validations.length)} At least 8 characters
        </li>
        <li className={getClass(validations.number)}>
          {getIcon(validations.number)} At least one number
        </li>
        <li className={getClass(validations.uppercase)}>
          {getIcon(validations.uppercase)} At least one uppercase letter
        </li>
        <li className={getClass(validations.lowercase)}>
          {getIcon(validations.lowercase)} At least one lowercase letter
        </li>
        <li className={getClass(validations.special)}>
          {getIcon(validations.special)} At least one special character (&, @,
          #, %, $, ^, !, *)
        </li>
      </ul>
    </div>
  );
}
