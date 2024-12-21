import { useState, useEffect } from 'react';
import { validators } from '../utils/validationUtils';

interface LoginFormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string | null;
  password: string | null;
}

export default function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: null,
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

  // 예러 동적 처리
  useEffect(() => {
    const formErrors: FormErrors = {
      username: validators.username(formData.username),
      password: validators.password(formData.password),
    };
    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === null));
  }, [formData]);

  return { formData, errors, isFormValid, handleChange };
}
