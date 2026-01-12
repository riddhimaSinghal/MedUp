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

interface AddMedicationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (medication: NewMedication) => void;
}

export interface NewMedication {
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  instructions: string;
}

export function AddMedicationDialog({
  isOpen,
  onClose,
  onAdd,
}: AddMedicationDialogProps) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [instructions, setInstructions] = useState("");
  const [customTimes, setCustomTimes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let times: string[] = [];
    if (frequency === "Once daily") {
      times = ["9:00 AM"];
    } else if (frequency === "Twice daily") {
      times = ["9:00 AM", "9:00 PM"];
    } else if (frequency === "Three times daily") {
      times = ["8:00 AM", "2:00 PM", "8:00 PM"];
    } else if (frequency === "Four times daily") {
      times = ["8:00 AM", "12:00 PM", "4:00 PM", "8:00 PM"];
    } else if (customTimes) {
      times = customTimes.split(",").map((t) => t.trim());
    }

    onAdd({
      name,
      dosage,
      frequency,
      times,
      instructions,
    });

    // Reset form
    setName("");
    setDosage("");
    setFrequency("");
    setInstructions("");
    setCustomTimes("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
          <DialogDescription>
            Add a new medication to your schedule
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="medName">Medication Name *</Label>
              <Input
                id="medName"
                placeholder="e.g., Aspirin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage *</Label>
              <Input
                id="dosage"
                placeholder="e.g., 100mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency *</Label>
              <Select value={frequency} onValueChange={setFrequency} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Once daily">Once daily</SelectItem>
                  <SelectItem value="Twice daily">Twice daily</SelectItem>
                  <SelectItem value="Three times daily">Three times daily</SelectItem>
                  <SelectItem value="Four times daily">Four times daily</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {frequency === "Custom" && (
              <div className="space-y-2">
                <Label htmlFor="times">Times (comma separated)</Label>
                <Input
                  id="times"
                  placeholder="e.g., 9:00 AM, 3:00 PM, 9:00 PM"
                  value={customTimes}
                  onChange={(e) => setCustomTimes(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="e.g., Take with food"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Add Medication
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
