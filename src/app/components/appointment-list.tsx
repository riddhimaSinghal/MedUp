import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { format } from "date-fns";

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  location: string;
  phone: string;
  status: "upcoming" | "completed" | "cancelled";
  reason: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
  onReschedule: (id: string) => void;
}

export function AppointmentList({
  appointments,
  onCancel,
  onReschedule,
}: AppointmentListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No appointments scheduled</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg">Dr. {appointment.doctorName}</h3>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {appointment.specialty}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{format(appointment.date, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{appointment.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{appointment.phone}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3 p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Reason:</span>{" "}
                  {appointment.reason}
                </p>
              </div>
              {appointment.status === "upcoming" && (
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule(appointment.id)}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancel(appointment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
