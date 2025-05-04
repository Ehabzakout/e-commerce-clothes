import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }
  return (
    <>
      <div className="mt-[10%] flex flex-col items-center font-bold">
        <h1 className="text-9xl">{errorStatus}</h1>
        <h1 className="mb-3 text-xl">{errorStatusText}</h1>
        <Link to="/">
          <h1>Click here to back Home</h1>
        </Link>
      </div>
    </>
  );
};

export default Error;
