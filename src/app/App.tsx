import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { DashboardHeader } from "./components/dashboard-header";
import { QuickStats } from "./components/quick-stats";
import { AppointmentList, Appointment } from "./components/appointment-list";
import { MedicationTracker, Medication } from "./components/medication-tracker";
import { RemindersPanel, Reminder } from "./components/reminders-panel";
import { BookAppointmentForm, NewAppointment } from "./components/book-appointment-form";
import { AddMedicationDialog, NewMedication } from "./components/add-medication-dialog";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { format } from "date-fns";
import { LayoutDashboard, Calendar, Pill } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddMedication, setShowAddMedication] = useState(false);

  // Mock data for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Sarah Johnson",
      specialty: "General Practice",
      date: new Date(2026, 0, 15, 10, 0),
      time: "10:00 AM",
      location: "123 Medical Center, New York, NY",
      phone: "(555) 123-4567",
      status: "upcoming",
      reason: "Annual checkup and blood work",
    },
    {
      id: "2",
      doctorName: "Michael Chen",
      specialty: "Cardiology",
      date: new Date(2026, 0, 20, 14, 0),
      time: "2:00 PM",
      location: "456 Heart Institute, New York, NY",
      phone: "(555) 234-5678",
      status: "upcoming",
      reason: "Follow-up consultation for high blood pressure",
    },
  ]);

  // Mock data for medications
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      times: ["9:00 AM"],
      startDate: new Date(2025, 11, 1),
      instructions: "Take with water, preferably in the morning",
      takenToday: [false],
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      times: ["9:00 AM", "9:00 PM"],
      startDate: new Date(2025, 10, 15),
      instructions: "Take with meals",
      takenToday: [true, false],
    },
  ]);

  // Mock data for reminders
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      type: "appointment",
      title: "Appointment with Dr. Johnson",
      description: "Annual checkup - Don't forget to bring insurance card",
      time: "Tomorrow at 10:00 AM",
      priority: "high",
    },
    {
      id: "2",
      type: "medication",
      title: "Evening Medication",
      description: "Metformin 500mg",
      time: "Today at 9:00 PM",
      priority: "medium",
    },
    {
      id: "3",
      type: "appointment",
      title: "Cardiology Follow-up",
      description: "Dr. Chen - Bring recent blood pressure readings",
      time: "Jan 20 at 2:00 PM",
      priority: "medium",
    },
  ]);

  const handleBookAppointment = (appointment: NewAppointment) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorName: appointment.doctorName,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      phone: appointment.phone,
      status: "upcoming",
      reason: appointment.reason,
    };

    setAppointments([...appointments, newAppointment]);
    toast.success("Appointment booked successfully!");
    setActiveTab("appointments");
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
    toast.success("Appointment cancelled");
  };

  const handleRescheduleAppointment = (id: string) => {
    toast.info("Reschedule feature coming soon");
  };

  const handleAddMedication = (medication: NewMedication) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
      times: medication.times,
      startDate: new Date(),
      instructions: medication.instructions,
      takenToday: new Array(medication.times.length).fill(false),
    };

    setMedications([...medications, newMedication]);
    setShowAddMedication(false);
    toast.success("Medication added successfully!");
  };

  const handleMarkMedicationTaken = (medicationId: string, timeIndex: number) => {
    setMedications(
      medications.map((med) => {
        if (med.id === medicationId) {
          const newTakenToday = [...med.takenToday];
          newTakenToday[timeIndex] = !newTakenToday[timeIndex];
          return { ...med, takenToday: newTakenToday };
        }
        return med;
      })
    );
  };

  const handleDismissReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
    toast.info("Reminder dismissed");
  };

  // Calculate stats
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  ).length;
  const medicationsToday = medications.reduce(
    (acc, med) => acc + med.times.length,
    0
  );
  const medicationsTaken = medications.reduce(
    (acc, med) => acc + med.takenToday.filter(Boolean).length,
    0
  );

  const nextAppointment = appointments
    .filter((apt) => apt.status === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  const nextAppointmentText = nextAppointment
    ? `${format(nextAppointment.date, "EEEE, MMMM d")} at ${nextAppointment.time} - Dr. ${nextAppointment.doctorName}`
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <DashboardHeader
        userName="John Doe"
        notificationCount={reminders.length}
        onNotificationsClick={() => setActiveTab("dashboard")}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Medications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <QuickStats
              upcomingAppointments={upcomingAppointments}
              medicationsToday={medicationsToday}
              medicationsTaken={medicationsTaken}
              nextAppointment={nextAppointmentText}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BookAppointmentForm onBook={handleBookAppointment} />
              </div>
              <div>
                <RemindersPanel
                  reminders={reminders}
                  onDismiss={handleDismissReminder}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">My Appointments</h2>
              <p className="text-gray-600 mb-6">
                View and manage your healthcare appointments
              </p>
              <AppointmentList
                appointments={appointments}
                onCancel={handleCancelAppointment}
                onReschedule={handleRescheduleAppointment}
              />
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">My Medications</h2>
              <p className="text-gray-600 mb-6">
                Track your daily medication schedule
              </p>
              <MedicationTracker
                medications={medications}
                onMarkTaken={handleMarkMedicationTaken}
                onAddMedication={() => setShowAddMedication(true)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AddMedicationDialog
        isOpen={showAddMedication}
        onClose={() => setShowAddMedication(false)}
        onAdd={handleAddMedication}
      />
    </div>
  );
}
