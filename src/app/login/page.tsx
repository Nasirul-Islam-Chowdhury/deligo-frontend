"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from "@/services/auth.services";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const onSubmit = async (values: FieldValues) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        toast.success(res?.message || "Login successful!");
        storeUserInfo({ accessToken: res?.data?.accessToken });
        reset();
        router.push("/dashboard");
      } else {
        toast.error(res?.message || "Login failed");
        setErrorMsg(res?.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      setErrorMsg(err?.message || "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "#181818",
          padding: "2.5rem 2rem",
          borderRadius: "12px",
          minWidth: "340px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.7)",
          color: "#fff",
          position: "relative",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontWeight: 700, letterSpacing: 1 }}>
          Login to Deligo
        </h2>
        <div style={{ marginBottom: "1.25rem" }}>
          <label htmlFor="email" style={{ fontWeight: 500 }}>Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            {...register("email", { required: "Email is required" })}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "5px",
              border: "1px solid #444",
              marginTop: "0.3rem",
              background: "#222",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          {errors.email && (
            <span style={{ color: "#ff4d4f", fontSize: "0.95rem" }}>
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div style={{ marginBottom: "1.25rem", position: "relative" }}>
          <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              style={{
                width: "100%",
                padding: "0.6rem 2.5rem 0.6rem 0.6rem",
                borderRadius: "5px",
                border: "1px solid #444",
                marginTop: "0.3rem",
                background: "#222",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
                transition: "border 0.2s",
              }}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#aaa",
                cursor: "pointer",
                fontSize: "1.1rem",
                padding: 0,
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <span style={{ color: "#ff4d4f", fontSize: "0.95rem" }}>
              {errors.password.message as string}
            </span>
          )}
        </div>
        {errorMsg && (
          <div style={{ color: "#ff4d4f", marginBottom: "1.2rem", textAlign: "center", fontWeight: 500 }}>
            {errorMsg}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.85rem",
            borderRadius: "5px",
            border: "none",
            background: loading ? "#bbb" : "#fff",
            color: "#181818",
            fontWeight: "bold",
            fontSize: "1.08rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginBottom: "1rem",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#aaa", fontSize: "0.98rem" }}>
            Don't have an account?
          </span>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            style={{
              marginLeft: "0.5rem",
              background: "none",
              border: "none",
              color: "#4f8cff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
