import { useRouter } from "next/router";

function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <>
      <section>
        <h1 className="text-xl">Access Denied</h1>
        {message && <div className="mb-4 text-red-500">{message}</div>}
      </section>
    </>
  );
}

export default Unauthorized;
