import { Bell, Calendar, Pill, Clock, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export interface Reminder {
  id: string;
  type: "appointment" | "medication";
  title: string;
  description: string;
  time: string;
  priority: "high" | "medium" | "low";
}

interface RemindersPanelProps {
  reminders: Reminder[];
  onDismiss: (id: string) => void;
}

export function RemindersPanel({ reminders, onDismiss }: RemindersPanelProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIcon = (type: string) => {
    return type === "appointment" ? (
      <Calendar className="w-5 h-5 text-teal-600" />
    ) : (
      <Pill className="w-5 h-5 text-teal-600" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reminders.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">No reminders at this time</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-white rounded-full p-2">
                    {getIcon(reminder.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm truncate">{reminder.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => onDismiss(reminder.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {reminder.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {reminder.time}
                      </div>
                      <Badge
                        className={`${getPriorityColor(reminder.priority)} text-xs`}
                      >
                        {reminder.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
