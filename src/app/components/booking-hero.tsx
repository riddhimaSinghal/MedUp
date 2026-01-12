import { Calendar, Users, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { format } from "date-fns";
import { useState } from "react";

interface BookingHeroProps {
  onSearch: (searchParams: SearchParams) => void;
}

export interface SearchParams {
  specialty: string;
  location: string;
  appointmentDate: Date | undefined;
  timeSlot: string;
}

export function BookingHero({ onSearch }: BookingHeroProps) {
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [appointmentDate, setAppointmentDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");

  const handleSearch = () => {
    onSearch({ specialty, location, appointmentDate, timeSlot });
  };

  return (
    <div className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl mb-4">Book Your Healthcare Appointment</h1>
        <p className="text-xl mb-8 text-teal-100">
          Find and book appointments with top healthcare providers
        </p>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Specialty */}
            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-gray-700">
                <Search className="inline-block w-4 h-4 mr-1" />
                Specialty
              </Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Practice</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="dentistry">Dentistry</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">
                <MapPin className="inline-block w-4 h-4 mr-1" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="City or ZIP code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-gray-900"
              />
            </div>

            {/* Appointment Date */}
            <div className="space-y-2">
              <Label className="text-gray-700">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal text-gray-900"
                  >
                    {appointmentDate ? format(appointmentDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slot */}
            <div className="space-y-2">
              <Label className="text-gray-700">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Preferred Time
              </Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSearch}
              className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8"
              size="lg"
            >
              Search Doctors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}