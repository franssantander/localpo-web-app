import React from "react";
import { TextInput, Card, Button, PasswordInput } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useSignInForm } from "../hooks/useSignInForm";
import { Icon } from "@iconify/react/dist/iconify.js";

const SignInForm: React.FC = () => {
  const { form, isPending, loginFn } = useSignInForm();
  const location = useLocation();
  const isUser = location.pathname;

  return (
    <>
      <Card
        className="max-w-96 md:mt-24"
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
      >
        <div className="grid grid-cols gap-y-6">
          <div className="grid grid-cols gap-y-3">
            <h1 className="text-textBlack font-bold text-center text-2xl max-w-sm mx-auto">
              Welcome Back
            </h1>
            <p className="text-textGray text-center max-w-sm mx-auto text-sm md:text-xs">
              Log in to explore job listings, manage applications, and find your
              next career opportunity.
            </p>
          </div>
          <form
            onSubmit={form.onSubmit((values) => loginFn(values))}
            className="grid grid-cols gap-y-5"
          >
            <TextInput
              size="sm"
              label="Email"
              placeholder="Enter your email address"
              {...form.getInputProps("email")}
            />
            <div className="grid grid-cols gap-y-1">
              <PasswordInput
                size="sm"
                label="Password"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
              />
              <span className="text-textGray flex justify-end underline text-sm">
                <Link to="/forgot-password">Forgot your password?</Link>
              </span>
            </div>
            <Button type="submit" w="100%" size="sm" disabled={isPending}>
              {isPending && (
                <h1 className="flex items-center gap-x-2 text-sm">
                  <Icon
                    className="animate-spin"
                    icon="radix-icons:reload"
                    width="15"
                    height="15"
                  />
                  Loading...
                </h1>
              )}
              {!isPending && "Login"}
            </Button>
            <h1 className="text-neutral-500 text-sm">
              Don't have an account?{" "}
              <Link
                to={`${
                  isUser === "/sign-in" ? "/sign-up/user" : "/sign-up/employer"
                }`}
                className="text-textBlack font-semibold underline text-sm"
              >
                Create account
              </Link>
            </h1>
          </form>
        </div>
      </Card>
    </>
  );
};

export default SignInForm;
