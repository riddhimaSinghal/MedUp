import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { AppointmentDetails } from "./booking-modal";
import { format } from "date-fns";

interface ConfirmationDialogProps {
  appointment: AppointmentDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmationDialog({
  appointment,
  isOpen,
  onClose,
}: ConfirmationDialogProps) {
  if (!appointment) return null;

  const appointmentId = `APT${Date.now().toString().slice(-8)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Appointment Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your appointment has been successfully scheduled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-teal-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Appointment ID:</span>
              <span>{appointmentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patient Name:</span>
              <span>
                {appointment.firstName} {appointment.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-sm">{appointment.email}</span>
            </div>
            <div className="border-t pt-3">
              <p className="text-sm mb-2">
                Dr. {appointment.doctor.name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {appointment.doctor.specialty}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {appointment.doctor.location}
              </p>
              {appointment.appointmentDate && (
                <p className="text-sm">
                  <span className="text-gray-600">Date:</span>{" "}
                  {format(appointment.appointmentDate, "PPP")}
                </p>
              )}
              <p className="text-sm">
                <span className="text-gray-600">Time:</span> {appointment.timeSlot}
              </p>
              {appointment.insuranceProvider && (
                <p className="text-sm">
                  <span className="text-gray-600">Insurance:</span>{" "}
                  {appointment.insuranceProvider === "blue-cross"
                    ? "Blue Cross Blue Shield"
                    : appointment.insuranceProvider === "self-pay"
                    ? "Self Pay"
                    : appointment.insuranceProvider.charAt(0).toUpperCase() +
                      appointment.insuranceProvider.slice(1)}
                </p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> Please arrive 15 minutes early and bring a valid ID and insurance card.
            </p>
          </div>

          <p className="text-sm text-gray-600 text-center">
            A confirmation email has been sent to {appointment.email}
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-teal-600 hover:bg-teal-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}