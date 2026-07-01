import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Sidebar({ menuItems, userRole, userName }) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 transition-colors md:hidden"
      >
        {collapsed ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col transition-transform duration-300 z-40 ${
          collapsed ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <Link to="/dashboard" className="text-[#2563EB] font-bold text-xl">
            Clínica SaludTotal
          </Link>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2563EB&color=fff&bold=true`}
              alt={userName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#EEF2FF] text-[#2563EB] capitalize">
                {userRole}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setCollapsed(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#2563EB]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {collapsed && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
