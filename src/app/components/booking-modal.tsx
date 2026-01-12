import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Doctor } from "./property-card";
import { SearchParams } from "./booking-hero";
import { format } from "date-fns";

interface BookingModalProps {
  doctor: Doctor | null;
  searchParams: SearchParams;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (appointmentDetails: AppointmentDetails) => void;
}

export interface AppointmentDetails {
  doctor: Doctor;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  reasonForVisit: string;
  appointmentDate: Date | undefined;
  timeSlot: string;
  insuranceProvider: string;
}

export function BookingModal({
  doctor,
  searchParams,
  isOpen,
  onClose,
  onConfirm,
}: BookingModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctor) {
      onConfirm({
        doctor,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        reasonForVisit,
        appointmentDate: searchParams.appointmentDate,
        timeSlot,
        insuranceProvider,
      });
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDateOfBirth("");
      setReasonForVisit("");
      setTimeSlot("");
      setInsuranceProvider("");
    }
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule your appointment with Dr. {doctor.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Appointment Summary */}
            <div className="bg-teal-50 rounded-lg p-4 space-y-2">
              <h3 className="text-lg">Appointment Details</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-gray-600">Doctor:</span> Dr. {doctor.name}
                </p>
                <p>
                  <span className="text-gray-600">Specialty:</span> {doctor.specialty}
                </p>
                <p>
                  <span className="text-gray-600">Location:</span> {doctor.location}
                </p>
                {searchParams.appointmentDate && (
                  <p>
                    <span className="text-gray-600">Date:</span>{" "}
                    {format(searchParams.appointmentDate, "PPP")}
                  </p>
                )}
              </div>
            </div>

            {/* Patient Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Time Slot *</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {doctor.availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance Provider</Label>
              <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                  <SelectItem value="aetna">Aetna</SelectItem>
                  <SelectItem value="cigna">Cigna</SelectItem>
                  <SelectItem value="united">UnitedHealthcare</SelectItem>
                  <SelectItem value="kaiser">Kaiser Permanente</SelectItem>
                  <SelectItem value="self-pay">Self Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit *</Label>
              <Textarea
                id="reason"
                value={reasonForVisit}
                onChange={(e) => setReasonForVisit(e.target.value)}
                placeholder="Please describe your symptoms or reason for visit..."
                rows={3}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Confirm Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}