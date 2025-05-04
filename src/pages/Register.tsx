import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicSchema, TRegisterForm } from "@/validations/registerForm";
import InputField from "@/components/common/inputField";
import useEmailAvailability from "@/Hooks/checkEmailAvailabilty";
import { addNewUser, resetUI } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/Hooks";
import { Navigate, useNavigate } from "react-router-dom";
export const Register = () => {
  const Nav = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((store) => store.auth);
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(basicSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TRegisterForm> = (data) => {
    const { first_name, last_name, password, email } = data;
    dispatch(addNewUser({ first_name, last_name, password, email }))
      .unwrap()
      .then(() =>
        Nav("/login?message=New account has been created successfully"),
      );
  };
  const {
    checkEmailStatus,
    checkEmailvalidity,
    enteredEmail,
    resetEnteredEmail,
  } = useEmailAvailability();
  const onBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    const value = e.target.value;
    if (isDirty && !invalid && value !== enteredEmail) {
      checkEmailvalidity(value);
      if (isDirty && invalid && enteredEmail) {
        resetEnteredEmail();
      }
    }
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
      <h1 className="mb-5 flex items-center text-xl font-bold text-main">
        <i className="fa-regular fa-circle-user fa-3x mr-4"></i> Register:
      </h1>
      <div className="container mx-auto xs:w-full md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <InputField
            label="First Name"
            error={errors.first_name?.message}
            name="first_name"
            register={register}
          />
          <InputField
            label="Last Name"
            error={errors.last_name?.message}
            name="last_name"
            register={register}
          />
          <InputField
            label="Email"
            error={errors.email?.message}
            name="email"
            register={register}
            onBlur={onBlurHandler}
            checking={
              checkEmailStatus === "loading" ? "we are checking your email" : ""
            }
            invalidEmail={
              checkEmailStatus === "notAvailable"
                ? "Email is already in used"
                : ""
            }
          />
          <InputField
            type="password"
            label="Password"
            error={errors.password?.message}
            name="password"
            register={register}
          />
          <InputField
            type="password"
            label="Confirm Password"
            error={errors.confirm_password?.message}
            name="confirm_password"
            register={register}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn mt-4"
            disabled={
              checkEmailStatus === "notAvailable" || loading === "pending"
            }
          >
            {loading === "pending" ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};
