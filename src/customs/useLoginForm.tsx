import { useState, useEffect } from 'react';
import { validators } from '../utils/validationUtils';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string | null;
  password: string | null;
}

export default function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (
    name: keyof LoginFormData,
    value: string,
  ): string | null => {
    return validators[name](value);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: keyof LoginFormData; value: string } },
  ) => {
    let { name, value } = e.target as {
      name: keyof LoginFormData;
      value: string;
    };
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  useEffect(() => {
    const formErrors: FormErrors = {
      email: validators.email(formData.email),
      password: validators.password(formData.password),
    };
    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === null));
  }, [formData]);

  return { formData, errors, isFormValid, handleChange };
}
