// utils/generatePromotionImages.ts
import Image from 'next/image';
import { ReactElement } from 'react';

type Promotion = {
  IsDefault: boolean;
  PromotionDisplayOrder: number;
  PromotionImageId: number;
  PromotionLink: string;
  Expires: string;
};

export const generatePromotionImages = (
  promotions: Promotion[],
  baseUrl: string | undefined,
): ReactElement[] => {
  console.log('Promotions:', promotions, baseUrl);
  return [...promotions]
    .sort((a, b) => a.PromotionDisplayOrder - b.PromotionDisplayOrder)
    .map((promo, index) => (
      <Image
        src={`${baseUrl}${promo.PromotionImageId}`}
        alt={`Banner ${index + 1}`}
        className="rounded-[8px]"
        key={promo.PromotionImageId}
        width={800}
        height={400}
        unoptimized
      />
    ));
};
