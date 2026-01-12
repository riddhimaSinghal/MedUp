import { Pill, Clock, AlertCircle, Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: Date;
  endDate?: Date;
  instructions: string;
  takenToday: boolean[];
}

interface MedicationTrackerProps {
  medications: Medication[];
  onMarkTaken: (medicationId: string, timeIndex: number) => void;
  onAddMedication: () => void;
}

export function MedicationTracker({
  medications,
  onMarkTaken,
  onAddMedication,
}: MedicationTrackerProps) {
  if (medications.length === 0) {
    return (
      <div className="text-center py-12">
        <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No medications to track</p>
        <Button onClick={onAddMedication}>Add Medication</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Today's Medications</h3>
        <Button onClick={onAddMedication} size="sm">
          Add Medication
        </Button>
      </div>
      {medications.map((medication) => (
        <Card key={medication.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 rounded-full p-2">
                  <Pill className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">{medication.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {medication.dosage} • {medication.frequency}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {medication.instructions}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-2">Today's Schedule:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {medication.times.map((time, index) => {
                  const isTaken = medication.takenToday[index];
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        isTaken
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <Checkbox
                        checked={isTaken}
                        onCheckedChange={() => onMarkTaken(medication.id, index)}
                        id={`${medication.id}-${index}`}
                      />
                      <label
                        htmlFor={`${medication.id}-${index}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{time}</span>
                        {isTaken && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
