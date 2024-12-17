import { useState, useEffect, ChangeEvent } from 'react';
import { validators } from '../utils/validationUtils';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface FormErrors {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

const initialErrors: FormErrors = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export default function useSignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState(initialErrors);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case 'confirmPassword':
        return validators.confirmPassword(formData.password, value);
      default:
        return validators[name](value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  useEffect(() => {
    const formErrors = {
      username: validators.username(formData.username),
      email: validators.email(formData.email),
      password: validators.password(formData.password),
      confirmPassword: validators.confirmPassword(
        formData.password,
        formData.confirmPassword,
      ),
    };
    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === null));
  }, [formData]);

  return { formData, errors, isFormValid, handleChange };
}
