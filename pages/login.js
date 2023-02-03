import Link from "next/link";

function Login() {
  return (
    <section className="max-w-screen-md mx-auto">
      <form className="flex flex-col max-w-4xl ">
        <h1 className="mb-4 text-xl">Login</h1>
        <label htmlFor="email">Email</label>
        <input name="email" className="border border-gray-300" />
        <label htmlFor="password">Password</label>
        <input name="password" className="w-full" />
        <button className="primary-button ">Login</button>
      </form>
      <div>
        Don't have an account? <Link href="/">Register here.</Link>
      </div>
    </section>
  );
}

export default Login;
