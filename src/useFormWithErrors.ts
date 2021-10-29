import {useState} from "react";
import {FormGenericType, useForm} from "./useForm";
import {ModelFieldError} from "./types/ModelFieldError";

export const useFormWithErrors = <T extends FormGenericType<T>>(initialState: T = {} as T) => {
  const {inputProps: baseInputProps, ...rest} = useForm<T>(initialState);
  const [errors, setErrors] = useState<ModelFieldError[]>([]);

  const inputProps = (name: keyof T) => {
    const valProps: {error?: string} = {error: undefined};
    const error = errors.find(x => x.field === name);
    if (error)
      valProps.error = (error.messages || []).join(", ");

    const props = baseInputProps(name);
    return {...props, ...valProps};
  };

  const handleError400 = (fieldErrors: ModelFieldError[] | null | undefined) => {
    setErrors(fieldErrors || []);
  };

  return {
    ...rest,
    inputProps,
    handleError400,
  };
};
