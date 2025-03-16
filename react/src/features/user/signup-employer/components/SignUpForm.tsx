import { Button, Card, PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSignupForm } from "../hooks/useSignupForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import _ from "lodash";

const SignUpForm: React.FC = () => {
  const location = useLocation();
  const isUserSignUp = _.includes(location.pathname, "/sign-up/user");
  const isEmployerSignUp = _.includes(location.pathname, "/sign-up/employer");

  const userRoleSignup = () => {
    if (_.includes(location.pathname, "/sign-up/user")) {
      return { role: "job_seeker" };
    } else if (_.includes(location.pathname, "/sign-up/employer")) {
      return { role: "employeer" };
    }
    return {};
  };
  const { isPending, form, submitFn } = useSignupForm();

  return (
    <>
      <Card
        className="max-w-[87rem] md:mt-24"
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
      >
        <div className="grid grid-cols gap-y-6">
          <div className="grid grid-cols gap-y-3">
            <h1 className="text-textBlack font-bold text-center text-lg max-w-sm mx-auto">
              {isUserSignUp && "Create your account"}
              {isEmployerSignUp && "Create your employer account"}
            </h1>
            <p className="text-textGray text-center max-w-sm mx-auto text-sm md:text-xs">
              {isUserSignUp &&
                "Find your next career opportunity by creating a account today. It’s quick and easy!"}
              {isEmployerSignUp &&
                "Join us and simplify your hiring process. Manage job postings and candidates effortlessly."}
            </p>
          </div>
          <form
            onSubmit={form.onSubmit((values) =>
              submitFn({
                ...values,
                ...userRoleSignup(),
              })
            )}
            className="grid grid-cols gap-y-5"
          >
            <TextInput
              size="sm"
              label="Full name"
              description="This name will be used as the account holder's name."
              placeholder="Enter your full name"
              {...form.getInputProps("name")}
            />
            <TextInput
              size="sm"
              label="Email address"
              description="We'll send an email verification to this address."
              placeholder="Enter your email address"
              {...form.getInputProps("email")}
              rightSection={
                <Icon icon="mdi:alternate-email" width="18" height="18" />
              }
            />
            <TextInput
              size="sm"
              label="Phone number"
              placeholder="Enter your phone number"
              rightSection={<span className="text-xs">+63</span>}
              {...form.getInputProps("phone_number")}
            />
            <PasswordInput
              size="sm"
              label="Password"
              description="Use at least 8 characters, including a number and a special character."
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              size="sm"
              label="Confirm password"
              description="Make sure your passwords match."
              placeholder="Enter your confirm password"
              {...form.getInputProps("password_confirmation")}
            />
            <Button w="100%" size="sm" type="submit" disabled={isPending}>
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
              {!isPending && "Sign up account"}
            </Button>
            <h1 className="text-neutral-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/sign-in/employer"
                className="text-textBlack font-semibold underline text-sm"
              >
                Sign in here
              </Link>
            </h1>
          </form>
        </div>
      </Card>
    </>
  );
};

export default SignUpForm;
