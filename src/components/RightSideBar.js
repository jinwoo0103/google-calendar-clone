import React from 'react';

import 'react-day-picker/dist/style.css';

import '../day-picker.css';

function RightSideBar() {

  return (
    <div className="flex flex-col basis-14 h-full items-center">
      <button className="m-2 h-10 w-10 p-[10px] bg-transparent text-sm rounded-full headerColor headerHoverColor">
        <img src="https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png" />
      </button>
      <button className="m-2 h-10 w-10 p-[10px] bg-transparent text-sm rounded-full headerColor headerHoverColor">
        <img src="https://www.gstatic.com/companion/icon_assets/tasks_2021_2x.png" />
      </button>
      <button className="m-2 h-10 w-10 p-[10px] bg-transparent text-sm rounded-full headerColor headerHoverColor">
        <img src="https://www.gstatic.com/companion/icon_assets/contacts_2x.png" />
      </button>
      <button className="m-2 h-10 w-10 p-[10px] bg-transparent text-sm rounded-full headerColor headerHoverColor">
        <img src="https://www.gstatic.com/companion/icon_assets/maps_v2_2x.png" />
      </button>
      <div className="h-5 w-5 border-b-[1px]"></div>
      <button className="mt-5 h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor">
        <span className="material-symbols-sharp pt-1.5">
          add
        </span>
      </button>
      <div className="grow flex items-end">
        <button className="justify-self-end pl-[3px] m-2 h-10 w-10 bg-transparent text-sm rounded-full headerColor headerHoverColor">
          <span className="material-symbols-sharp pt-1.5">
            chevron_right
          </span>
        </button>
      </div>
      
    </div>
  );
}

export default RightSideBar;
