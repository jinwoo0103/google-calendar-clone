import Image from 'next/image';
import React from 'react';

type Icon_img = {
  src: string;
  alt: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type Icon_ms = {
  alt: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function IMGIcon({ icon }: { icon: Icon_img }) {
  return (
    <button
      className="m-2 h-10 w-10 p-[10px] bg-transparent text-sm rounded-full headerColor headerHoverColor"
      onClick={icon.onClick}
    >
      <Image src={icon.src} alt={icon.alt} height="25px" width="25px" />
    </button>
  );
}

export function MSIcon({ icon }: { icon: Icon_ms }) {
  return (
    <button
      className="mt-5 h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor"
      onClick={icon.onClick}
    >
      <span className="material-symbols-sharp pt-1.5">{icon.alt}</span>
    </button>
  );
}
