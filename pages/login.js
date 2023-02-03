import Link from "next/link";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log({ email, password });
  };

  console.log(errors);

  return (
    <form className="max-w-screen-md mx-auto flex flex-col" onSubmit={handleSubmit(submitHandler)}>
      <h1 className="mb-4 text-xl">Login</h1>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="w-full"
          autoFocus
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter a valid email.",
            },
          })}
        />
        {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
      </div>

      <div className="mb-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="w-full"
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 6, message: "Password should be at least 5 characters long." },
          })}
        />
        {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
      </div>
      <button className="primary-button mb-4">Login</button>
      <div>
        Don't have an account? <Link href="/">Register here.</Link>
      </div>
    </form>
  );
}

export default Login;
