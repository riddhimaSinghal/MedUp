import { Calendar, Pill, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface QuickStatsProps {
  upcomingAppointments: number;
  medicationsToday: number;
  medicationsTaken: number;
  nextAppointment?: string;
}

export function QuickStats({
  upcomingAppointments,
  medicationsToday,
  medicationsTaken,
  nextAppointment,
}: QuickStatsProps) {
  const stats = [
    {
      label: "Upcoming Appointments",
      value: upcomingAppointments,
      icon: Calendar,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      label: "Medications Today",
      value: medicationsToday,
      icon: Pill,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Medications Taken",
      value: medicationsTaken,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} rounded-full p-3`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {nextAppointment && (
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 rounded-full p-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Appointment</p>
                <p className="text-teal-900">{nextAppointment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
