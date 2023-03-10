import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getError } from "@/utils/error";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [router, session]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setLoading(false);

      if (result.error) {
        return toast.error(result.error);
      }

      toast.success("Registration success.");

      router.push("/login");
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
      <h1 className="mb-4 text-xl">Create Account</h1>
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="w-full"
          id="name"
          autoFocus
          {...register("name", {
            required: "Please enter name",
          })}
        />
        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please enter email",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter valid email",
            },
          })}
          className="w-full"
          id="email"
        ></input>
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: { value: 6, message: "password is more than 5 chars" },
          })}
          className="w-full"
          id="password"
          autoFocus
        ></input>
        {errors.password && <div className="text-red-500 ">{errors.password.message}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="w-full"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please enter confirm password",
            validate: (value) => value === getValues("password"),
            minLength: {
              value: 6,
              message: "confirm password is more than 5 chars",
            },
          })}
        />
        {errors.confirmPassword && (
          <div className="text-red-500 ">{errors.confirmPassword.message}</div>
        )}
        {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
          <div className="text-red-500 ">Password do not match</div>
        )}
      </div>

      <div className="mb-4 ">
        <button className="primary-button mb-4">{loading ? "Please wait..." : "Register"}</button>
      </div>
      <div className="mb-4 ">
        Already have an account? &nbsp;
        <Link href={"/login"}>Login</Link>
      </div>
    </form>
  );
}

export default RegisterScreen;
