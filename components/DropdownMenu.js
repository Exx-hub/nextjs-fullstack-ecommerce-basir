import { Menu } from "@headlessui/react";
import Link from "next/link";

function DropdownMenu({ userName, handleLogout }) {
  return (
    <Menu as="div" className="inline-block relative">
      <Menu.Button className="text-blue-600">{userName}</Menu.Button>
      <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg ">
        <Menu.Item>
          <Link href="/profile" className="dropdown-link">
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/order-history" className="dropdown-link">
            Order History
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="#" className="dropdown-link" onClick={handleLogout}>
            Sign Out
          </Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default DropdownMenu;
