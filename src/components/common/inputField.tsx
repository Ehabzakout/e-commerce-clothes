import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type TInputField<T extends FieldValues> = {
  label: string;
  error?: string;
  type?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  checking?: string;
  invalidEmail?: string;
};
const InputField = <T extends FieldValues>({
  label,
  error,
  type = "text",
  name,
  register,
  onBlur,
  checking,
  invalidEmail,
}: TInputField<T>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <div className="mb-2">
      <label htmlFor="first_name">{label}</label>
      <input
        className={`input ${error && "border-red-500"}`}
        type={type}
        placeholder="First Name"
        {...register(name)}
        onBlur={onBlurHandler}
      />
      {invalidEmail && <p className="text-red-500">{invalidEmail}</p>}
      {checking && <p className="text-gray-500">{checking}</p>}
      {error && <p className="text-red-500">* {error}</p>}
    </div>
  );
};

export default InputField;
