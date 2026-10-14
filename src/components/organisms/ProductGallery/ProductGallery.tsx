import React, { useState } from 'react';

type Props = {
  images: string[];
  name: string;
};

export const ProductGallery: React.FC<Props> = ({ images, name }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 tablet:flex-row-reverse">
      <img
        src={images[selectedIndex]}
        alt={name}
        className="aspect-square w-full object-contain tablet:min-w-0 tablet:flex-1"
      />

      <div className="flex flex-row gap-2 tablet:flex-col desktop:gap-4">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelectedIndex(index)}
            className={`aspect-square flex-1 border transition-colors hover:border-text-primary tablet:size-[35px] tablet:flex-none desktop:size-20 ${
              index === selectedIndex ?
                'border-text-primary'
              : 'border-elements'
            }`}
          >
            <img
              src={image}
              alt={`${name}, photo ${index + 1}`}
              className="size-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
