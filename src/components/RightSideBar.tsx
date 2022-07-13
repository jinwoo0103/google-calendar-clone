import React from 'react';
import { IMGIcon, MSIcon } from './Icon';

const icons = [
  {
    src: 'https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png',
    alt: 'icon_keep',
  },
  {
    src: 'https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png',
    alt: 'icon_tasks',
  },
  {
    src: 'https://www.gstatic.com/companion/icon_assets/maps_v2_2x.png',
    alt: 'icon_maps',
  },
];

function RightSideBar() {
  return (
    <div className="flex flex-col basis-14 h-full items-center">
      {icons.map((icon) => {
        return <IMGIcon icon={icon} key={icon.alt} />;
      })}

      <div className="h-5 w-5 border-b-[1px]"></div>

      <MSIcon icon={{ alt: 'add' }} />

      <div className="grow flex items-end">
        <MSIcon icon={{ alt: 'chevron_right' }} />
      </div>
    </div>
  );
}

export default RightSideBar;
