import { Bell, Calendar, Pill, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import logo from "./assets/logo.png";


interface DashboardHeaderProps {
  userName: string;
  notificationCount: number;
  onNotificationsClick: () => void;
}

export function DashboardHeader({
  userName,
  notificationCount,
  onNotificationsClick,
}: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="MedUp Logo"
              className="w-14 h-14 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-2xl">HealthCare Manager</h1>
              <p className="text-sm text-gray-600">
                Book, track, and manage your healthcare
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={onNotificationsClick}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {notificationCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-sm">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
