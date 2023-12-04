"use client";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    // Perform login logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label>Email</label>
      <input type="email" {...register("email", { required: true })} />
      {formState.errors.email && (
        <span>This field is required and must be a valid email address</span>
      )}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
