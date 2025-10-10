"use client";
import React, { useState } from "react";
import {
  Menu,
  Store,
  X,
  MenuIcon,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { removeUser } from "@/services/auth.services";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { useRouter } from "next/navigation";

const App = ({ children }: { children: any }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("restaurants");
  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    {
      id: "restaurants",
      label: "Restaurants",
      icon: Store,
      href: "/dashboard/admin",
    },
    {
      id: "menus",
      label: "Menu Items",
      icon: Menu,
      href: "/dashboard/admin/menu",
    },
  ];


  const handleSignOut = async() => {
    removeUser();
    
    await deleteCookies(["accessToken", "refreshToken"]);
    
    router.push("/login");
    
    router.refresh();
  };
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-lg p-4 flex items-center justify-between lg:hidden">
        <h1 className="text-xl font-bold text-indigo-700 flex items-center">
          <LayoutDashboard className="w-5 h-5 mr-2" />
          Admin Panel
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </header>

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 
          w-64 bg-gray-800 text-white 
          flex flex-col flex-shrink-0 
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:w-64 
          pt-16 lg:pt-0 
        `}
      >
        <Link href={"/"}>
          <div className="hidden lg:block p-6 text-2xl font-extrabold text-center bg-gray-900 shadow-md">
            Deligo
          </div>
        </Link>

        <nav className="flex-grow p-4 space-y-2 bg-gray-900 ">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center p-3 rounded-xl transition duration-150
                  ${
                    isActive
                      ? " text-white font-semibold shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="p-4 border-t border-gray-700 flex flex-col gap-3">
            <div className="text-sm text-gray-400">Logged in as Admin</div>
            <button
              onClick={handleSignOut}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        ></div>
      )}

      <main
        id="main-content"
        className="flex-grow overflow-y-auto pt-16 lg:pt-0"
      >
        <div className="min-h-full">
          <div className="hidden lg:block px-8 py-6 bg-white border-b border-gray-200 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your delivery service data efficiently.
            </p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default App;
