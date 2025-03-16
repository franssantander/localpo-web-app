import React from "react";
import { useEmailVerificationHooks } from "../hooks/useEmailVerificationHooks";
import { Button, Card, PinInput } from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router-dom";
import _ from "lodash";

const CardVerification: React.FC = () => {
  const location = useLocation();
  const isUser = _.includes(location.pathname, "/sign-up/user");

  const {
    email,
    form,
    verifyError,
    isVerifyPending,
    verifyEmailFn,
    countdown,
    handleResendCodeClick,
  } = useEmailVerificationHooks();

  return (
    <Card shadow="sm" radius="md" p={32}>
      <form
        onSubmit={form.onSubmit((values) =>
          verifyEmailFn({ ...values, ...(isUser && { role: "user" })})
        )}
        className="grid grid-cols gap-y-8"
      >
        <div className="grid grid-cols gap-y-3">
          <h1 className="font-bold text-textBlack text-lg text-center">
            Verify Your Email Address
          </h1>
          <p className="text-textGray text-sm max-w-xs text-center">
            We’ve sent a 6-digit verification code to your email at{" "}
            <span className="font-medium text-textBlack">{email}</span>. Please
            enter it below to verify your account.
          </p>
        </div>
        <div className="grid grid-cols gap-y-2">
          <h1 className="text-xs text-textBlack font-semibold">
            Please enter the verification code.
          </h1>
          <PinInput
            aria-label="One time code"
            size="md"
            className="flex mx-auto"
            type="number"
            length={6}
            {...form.getInputProps("verification_code")}
          />
          <h1 className="text-xs text-red-500">{verifyError}</h1>
        </div>
        <div className="w-full grid grid-cols gap-y-4">
          <Button type="submit" disabled={isVerifyPending}>
            {isVerifyPending && (
              <h1 className="flex items-center gap-x-2 text-sm">
                <Icon
                  className="animate-spin"
                  icon="radix-icons:reload"
                  width="15"
                  height="15"
                />
                Verifying...
              </h1>
            )}
            {!isVerifyPending && "Verify email"}
          </Button>
          <p className="text-textGray text-xs max-w-xs">
            Didn’t receive the code? Check your spam folder or request a new one
            below.
          </p>
          <div className="mx-auto">
            <Button
              onClick={() => handleResendCodeClick()}
              className="mx-auto"
              size="xs"
              variant="transparent"
              disabled={countdown.code > 0}
            >
              {countdown.code > 0
                ? `Resend Code in (${countdown.code}s)`
                : "Resend Code"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CardVerification;
