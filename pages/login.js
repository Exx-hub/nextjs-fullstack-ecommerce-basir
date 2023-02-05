import CustomHeadTag from "@/components/CustomHeadTag";
import { getError } from "@/utils/error";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session, status } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const submitHandler = async ({ email, password }) => {
    console.log({ email, password });

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <CustomHeadTag title="Login" description="Login page" />
      <form
        className="max-w-screen-md mx-auto flex flex-col"
        onSubmit={handleSubmit(submitHandler)}
      >
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
        <button className="primary-button mb-4">
          {status === "loading" ? "Please wait..." : "Login"}
        </button>
        <div>
          Not yet registered? <Link href={"/register"}>Sign up!</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
