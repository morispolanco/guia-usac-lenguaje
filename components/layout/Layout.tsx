
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { EDUCATIONAL_CONTENT } from '../../constants';
import { BookOpenIcon, HomeIcon, UserIcon, LogOutIcon, MenuIcon } from '../ui/Icons';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent: React.FC = () => (
    <div className="flex flex-col h-full bg-primary-dark text-white">
      <div className="p-4 mb-4">
        <h1 className="text-2xl font-bold text-center text-secondary">Guía USAC</h1>
        <p className="text-sm text-center text-gray-300">Lenguaje</p>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive ? 'bg-primary-light text-white' : 'text-gray-300 hover:bg-primary hover:text-white'
            }`
          }
        >
          <HomeIcon className="w-6 h-6 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
              isActive ? 'bg-primary-light text-white' : 'text-gray-300 hover:bg-primary hover:text-white'
            }`
          }
        >
          <UserIcon className="w-6 h-6 mr-3" />
          Mi Progreso
        </NavLink>
        
        <div className="pt-4 mt-4 border-t border-primary">
            <h3 className="px-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">Módulos</h3>
            <div className="mt-2 space-y-1">
                {EDUCATIONAL_CONTENT.map((module) => (
                    <div key={module.id}>
                        <p className="flex items-center w-full px-2 py-2 text-sm font-medium text-left text-gray-300 rounded-md">
                            <BookOpenIcon className="w-6 h-6 mr-3"/>
                            {module.title}
                        </p>
                        <div className="pl-8 space-y-1">
                            {module.units.map(unit => (
                                <NavLink
                                    key={unit.id}
                                    to={`/module/${module.id}/unit/${unit.id}`}
                                    className={({ isActive }) =>
                                    `block px-3 py-2 text-sm font-medium rounded-md ${
                                        isActive ? 'bg-secondary text-primary-dark' : 'text-gray-300 hover:bg-primary hover:text-white'
                                    }`
                                    }
                                >
                                    {unit.title}
                                </NavLink>
                            ))}
                            {module.units.length === 0 && <p className="px-3 py-2 text-xs text-gray-400">Próximamente...</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </nav>
      <div className="p-4 mt-auto">
        <button onClick={handleLogout} className="flex items-center w-full px-2 py-2 text-sm font-medium text-left text-gray-300 rounded-md group hover:bg-primary hover:text-white">
          <LogOutIcon className="w-6 h-6 mr-3" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col flex-1 w-full max-w-xs bg-primary-dark">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <SidebarContent />
      </div>

      <div className="flex flex-col flex-1 md:pl-64">
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 bg-white border-b border-gray-200 md:hidden">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="px-4 font-bold text-primary-dark">Guía USAC</div>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
