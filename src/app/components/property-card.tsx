import { Star, MapPin, GraduationCap, Clock, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  acceptingNew: boolean;
  availableSlots: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
        {doctor.acceptingNew && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
            Accepting New Patients
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl">Dr. {doctor.name}</h3>
            <p className="text-sm text-teal-600">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{doctor.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{doctor.location}</span>
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <GraduationCap className="w-4 h-4" />
            <span>{doctor.experience} years experience</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Award className="w-4 h-4" />
            <span>{doctor.reviews} patient reviews</span>
          </div>
        </div>
        {doctor.availableSlots.length > 0 && (
          <div className="flex items-start gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-600 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {doctor.availableSlots.slice(0, 3).map((slot) => (
                <Badge key={slot} variant="outline" className="text-xs">
                  {slot}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onBook(doctor)} 
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}