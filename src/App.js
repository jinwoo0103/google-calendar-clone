import React from 'react';

import 'react-day-picker/dist/style.css';

import Header from './components/Header';
import Week from './components/Week';

import './day-picker.css';
import LeftSideBar from './components/LeftSideBar';
import Table from './components/Table';
import RightSideBar from './components/RightSideBar';
import ModalAddEvent from './components/ModalAddEvent';
import ModalSelectDate from './components/ModalSelectDate';

import ko from 'date-fns/locale/ko';
import { format } from 'date-fns';

function App() {

  const calendarIconLink = () => {
    const todayDayNumber = format(new Date(), "d", { locale: ko });
    return `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${todayDayNumber}_2x.png`
  };

  const favicon = document.getElementById("favicon");

  favicon.href = calendarIconLink();

  return (
    <div className="flex flex-col h-screen">

      <Header />
      
      <main className="flex flex-row grow min-h-0">
        
        <div className="basis-64 h-full">
          <LeftSideBar />
        </div>
        
        <div className="flex flex-col grow h-full">
          <Week />
          <Table />
        </div>

        <RightSideBar />

        <ModalAddEvent />
        <ModalSelectDate />


		  </main>  
    </div>
  );
}

export default App;
