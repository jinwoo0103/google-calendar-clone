/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeShowOption } from '../features/selectedSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDown() {

  const selectedShowOption = useSelector((state) => state.selected.showOption);

  const dispatch = useDispatch();

  const onClickDay = () => {
    (selectedShowOption != '일')
    && dispatch(changeShowOption('일'));
  };

  const onClickWeek = () => {
    (selectedShowOption != '주')
    && dispatch(changeShowOption('주'));
  };

  const onClickMonth = () => {
    (selectedShowOption != '월')
    && dispatch(changeShowOption('월'));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center ml-[12px] h-[36px] w-[53px] rounded border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {selectedShowOption}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-3.5 mt-2 w-[165px] shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item onClick={onClickDay}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className="flex flex-row">
                    <div>일</div>
                    <div className="grow"></div>
                    <div>D</div>
                  </div>
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick={onClickWeek}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className="flex flex-row">
                    <div>주</div>
                    <div className="grow"></div>
                    <div>W</div>
                  </div>
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick={onClickMonth}>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <div className="flex flex-row">
                    <div>월</div>
                    <div className="grow"></div>
                    <div>M</div>
                  </div>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
