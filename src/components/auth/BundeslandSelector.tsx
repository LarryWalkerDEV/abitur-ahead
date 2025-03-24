
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type Bundesland } from "@/types/auth";

const bundeslaender: Bundesland[] = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen'
];

interface BundeslandSelectorProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const BundeslandSelector: React.FC<BundeslandSelectorProps> = ({
  control,
  name,
  label,
  placeholder = "Wähle dein Bundesland",
  required = true,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-abitur-pink">*</span>}
          </FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="bg-abitur-dark border-border text-foreground">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-abitur-dark border-border text-foreground">
                {bundeslaender.map((bundesland) => (
                  <SelectItem key={bundesland} value={bundesland}>
                    {bundesland}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BundeslandSelector;
