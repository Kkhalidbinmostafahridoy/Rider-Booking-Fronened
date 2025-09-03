import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userSidebarItems } from "@/routes/userSidebarItems";
import Logo from "@/assets/icons/Logo";
import { adminSidebarItems } from "@/routes/adminSIdebarItems";

export function AppSidebar() {
  const [sidebarItems, setSidebarItems] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user)?.role : null;
    if (role === "ADMIN") setSidebarItems(adminSidebarItems);
    else if (role === "USER") setSidebarItems(userSidebarItems);
    else setSidebarItems([]);
  }, []);

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-md flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Link to="/">
          <Logo className="w-8 h-8" />
        </Link>

        <h1 className="text-xl font-bold text-gray-800">AFM Ride </h1>
      </div>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sidebarItems.map((item) => (
          <div key={item.title}>
            <h4 className="text-gray-500 uppercase text-xs font-semibold mb-2 px-2">
              {item.title}
            </h4>
            <div className="flex flex-col">
              {item.items.map((section) => {
                const isActive = location.pathname.includes(section.url);
                return (
                  <Link
                    key={section.title}
                    to={`${item.url}/${section.url}`}
                    className={`block px-3 py-2 rounded-md mb-1 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors ${
                      isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
                    }`}
                  >
                    {section.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t text-sm text-gray-500">
        &copy; 2025 AFM Ride
      </div>
    </aside>
  );
}
