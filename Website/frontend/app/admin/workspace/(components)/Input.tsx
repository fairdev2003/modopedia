import { cn } from "@/lib/utils";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

interface WorkspaceInputProps {
  name: string;
  placeholder: string;
  className?: string;
  height?: string;
  width?: string;
  value?: string | number;
  required?: boolean;
  comment?: string;
  textarea?: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | DetailedHTMLProps<
          InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >,
  ) => void;
}

const WorkspaceInput = ({
  name,
  placeholder,
  height = "[40px]",
  width = "full",
  className,
  value,
  onChange,
  textarea,
  required,
  comment,
}: WorkspaceInputProps) => {
  return (
    <div className={cn(className, "text-white text-sm font-semibold")}>
      <p className="text-sm font-semibold mb-2">
        {name} {required && <span className="text-red-500">*</span>}{" "}
        {comment && (
          <span className="text-[10px] text-gray-500">{comment}</span>
        )}
      </p>

      {textarea ? (
        <textarea
          spellCheck={false}
          value={value}
          onChange={onChange}
          className={cn(
            `w-${width} h-${height} flex gap-7 items-center p-3 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg outline-none focus:bg-gray-600`,
          )}
          placeholder={placeholder}
        />
      ) : (
        <input
          spellCheck={false}
          value={value}
          onChange={onChange}
          className={cn(
            className,
            `w-${width} h-${height} flex gap-7 items-center p-3 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg outline-none focus:bg-gray-600`,
          )}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default WorkspaceInput;
