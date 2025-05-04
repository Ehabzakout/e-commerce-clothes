import InputField from "@/components/common/inputField";
import { getUserData, resetUI } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { basicSchema, TbasicSchema } from "@/validations/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const Nav = useNavigate();
  const { error, loading, user } = useAppSelector((store) => store.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TbasicSchema>({
    resolver: zodResolver(basicSchema),
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<TbasicSchema> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    const { email, password } = data;
    dispatch(getUserData({ email, password }))
      .unwrap()
      .then(() => Nav("/"));
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {searchParams.get("message") && (
        <p className="mx-auto mb-3 w-1/2 rounded-lg border-2 border-main bg-cyan-100 px-4 py-3 font-semibold">
          {searchParams.get("message")}
        </p>
      )}
      {searchParams.get("message2") && (
        <p className="mx-auto mb-3 w-1/2 rounded-lg border-2 border-main bg-cyan-100 px-4 py-3 font-semibold">
          {searchParams.get("message2")}
        </p>
      )}
      <h1 className="mb-5 flex items-center text-xl font-bold text-main">
        <i className="fa-regular fa-circle-user fa-3x mr-4"></i> Login:
      </h1>
      <div className="mx-auto xs:w-full md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            type="email"
            register={register}
            name="email"
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            register={register}
            name="password"
            error={errors.password?.message}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn mt-4"
            disabled={loading === "pending"}
          >
            {loading === "pending" ? (
              <h1>
                <i className="fa-solid fa-spinner fa-spin"></i> Loading
              </h1>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
};
