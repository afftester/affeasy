"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react"; // Import React
import { Button } from "@/components/ui/button";
import { addUserIfNull } from "@/lib/prisma";
import { MovingBorder } from "./ui/moving-border";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2Icon as Spinner } from "lucide-react";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isSaving, setIsSaving] = React.useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSaving(true);

    try {
      const result = await addUserIfNull(data.email);

      if (result.error) {
        toast.error(result.error);
      } else {
        if (result.message === "User is already subscribed.") {
          toast.info("You are already subscribed. We will be in touch soon.");
          form.reset();
        } else {
          toast.success("You have been successfully subscribed!");
          form.reset();
        }
      }
    } catch (error) {
      toast.error(
        "An error occurred while processing your request. Please try again later."
      );
      console.error(error);
    }

    setIsSaving(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center space-y-4 w-full"
      >
        <div className="flex flex-row space-x-2 w-full max-w-sm drop-shadow-md">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSaving} className="drop-shadow-md">
            {isSaving && <Spinner className="mr-2 animate-spin" />} Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
