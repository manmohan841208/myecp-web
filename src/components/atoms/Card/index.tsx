import React from 'react';
import Image from '@/components/atoms/Image';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  headerClassName?: string;
  closeIcon?: boolean;
  onClick?: (e: any) => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  header,
  headerClassName,
  closeIcon,
  onClick,
}) => {
  return (
    <div
      className={`card rounded bg-[var(--card-background)] ${className || ''}`}
    >
      {header && (
        <div
          className={`flex w-full justify-between rounded-t-[8px] border-b-[1.5px] border-[var(--secondary-border)] bg-[var(--color-blue)] py-[5.5px] pl-3 text-[var(--text-white)] ${headerClassName || ''}`}
        >
          <h2 className="text-base font-semibold">{header}</h2>
          <span className="pr-[10px]">
            {typeof closeIcon === 'string' ? (
              <Image
                src={closeIcon}
                width={24}
                height={24}
                alt="icon"
                className="cursor-pointer"
                onClick={onClick}
              />
            ) : React.isValidElement(closeIcon) ? (
              closeIcon
            ) : typeof closeIcon === 'object' &&
              closeIcon !== null &&
              'src' in closeIcon ? (
              <Image
                src={(closeIcon as { src: string }).src}
                width={24}
                height={24}
                alt="icon"
                className="cursor-pointer"
                onClick={onClick}
              />
            ) : null}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
