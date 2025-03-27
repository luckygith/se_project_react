import { useState, useEffect } from "react";

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // DISABLE BUTTON when input value is empty!
  useEffect(() => {
    const emptyInputValue = Object.values(values).some((value) => !value);
    setIsDisabled(emptyInputValue);
  }, [values]);

  return { values, handleChange, setValues, isDisabled };
}
