import React, { Component, useEffect } from 'react';
import { Avatar, Button, Menu, MenuItem, Text } from "@mantine/core"
import { IconCaretDown } from '@tabler/icons-react';

const handleLogout = () => {
  console.log("Logout");
};


function ButtonLogout() {

  return (
    <div className="bg-system-menu-blue flex items-center top-0 gap-6 px-2 rounded-3xl">
      <Avatar size={50} />
      <IconCaretDown color="whixte" fill="white" size={25} />
    </div>
  );

}



function Layout() {

  return (
    <div className='w-full h-32 top-0 left-0 px-16 bg-system-layout-green flex justify-between items-center z-0'>
      <h1 className='mb-7 text-white text-3xl' >Snaches Orcas</h1>
      <Menu width={200} shadow="md">
        <Menu.Target className >
          <Button variant="transparent" size='xl'>
            <ButtonLogout />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={handleLogout}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default Layout;