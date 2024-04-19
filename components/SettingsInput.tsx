import React, { SetStateAction } from 'react'

interface SettingsInputProps {
  label: string;
  description: string;
  optional?: boolean;
  input: React.ReactNode;
}

const SettingsInput: React.FC<SettingsInputProps> = ({ ...props }) => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-col gap-1'>
        <p className='font-bold text-base'>{props.label} {props.optional && '( optional )'}</p>
        <p className='font-medium text-[10px] text-[#8a8a8c]'>{props.description}</p>
      </div>
      {props.input}
    </div>
  )
}

export default SettingsInput