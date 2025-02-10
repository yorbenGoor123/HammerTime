import {FormHTMLAttributes, JSX} from "react";
import {DefaultValues, FieldValues, FormProvider, useForm} from "react-hook-form";

type NativeProps = FormHTMLAttributes<HTMLFormElement>;
interface Props<T> extends Omit<NativeProps, "onSubmit"> {
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  formId?: string;
}

const Form = <T extends FieldValues = any>({onSubmit, defaultValues, formId, ...otherProps}: Props<T>): JSX.Element => {
  const methods = useForm<T>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        onSubmit={methods.handleSubmit(data => {
          console.log(data)
          onSubmit(data);
        })}
        {...otherProps}
      />
    </FormProvider>
  );
};

export default Form;
