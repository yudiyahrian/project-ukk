"use client";

import SettingsInput from "@components/SettingsInput";
import { Input } from "@components/ui/Input";
import { formValues } from "./page";
import { Textarea } from "@components/ui";

interface Props {
  formValues: formValues;
  onChange: (value: string, name: string) => void;
}

export default function ProfileForm({ ...props }: Props) {
  return (
    <section className="flex flex-col gap-3 w">
      <p className="uppercase text-[10px] font-bold text-[#8a8a8c]">
        Profile Information
      </p>
      <div className="flex flex-col gap-6">
        <SettingsInput
          label="Display name"
          description="Set a display name, This does change your name"
          input={
            <Input
              value={props.formValues.name}
              onChange={(e) => props.onChange(e.target.value, "name")}
              placeholder="Your username"
            />
          }
        />
        <SettingsInput
          label="About"
          description="A brief description of yourself display on profile"
          optional
          input={
            <Textarea
              value={props.formValues.description}
              onChange={(e) => props.onChange(e.target.value, "description")}
              placeholder="Your information"
            />
          }
        />
      </div>
    </section>
  );
}
