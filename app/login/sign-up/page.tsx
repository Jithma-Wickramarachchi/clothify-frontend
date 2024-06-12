import React from "react";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import SignUpForm from "./sign-up-form";

export default function Signup() {
  return (
    <section className="h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <BackgroundGradient className="rounded-[22px] max-w-lg p-4 bg-white dark:bg-zinc-900">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your new account
              </h1>
              <SignUpForm/>
            </div>
          </div>
        </BackgroundGradient>
      </div>
      <BackgroundBeams />
    </section>
  );
}