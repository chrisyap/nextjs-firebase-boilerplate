import { CogIcon, LayoutDashboard } from "lucide-react";

const adminNav = [
  {
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Settings",
    link: "/admin/settings",
    icon: <CogIcon />,
  },
];

export { adminNav };
