"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import VStack from "./VStack";
import { sendContact } from "@/app/(website)/contact/actions/sendContact";
import { Input } from "./ui/animated-input";
import { Textarea } from "./ui/animated-textarea";
import { BottomGradient } from "./ui/animated-bottom-gradient";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getAnimationDelay } from "./Section";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type ValuesType = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [sending, setSending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ValuesType) {
    // ✅ This will be type-safe and validated.
    setSending(true);
    toast.promise(sendContact(values), {
      loading: "Sending...",
      success: () => {
        form.reset();
        setSending(false);
        return {
          message: "Your message has been sent.",
          description: "I will answer as soon as possible.",
        };
      },
      error: () => {
        setSending(false);
        return {
          message: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Try again later.",
        };
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VStack className="items-stretch">
          <div
            className="flex animate-enter flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0"
            style={{ animationDelay: getAnimationDelay(2) }}
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Joel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Miller" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className="animate-enter"
            style={{ animationDelay: getAnimationDelay(2) }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="joel@miller.com" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                  I need your email to answer to your message.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className="animate-enter"
            style={{ animationDelay: getAnimationDelay(2) }}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className="w-full animate-enter"
            style={{ animationDelay: getAnimationDelay(2) }}
          >
            <Button
              type="submit"
              variant="secondary"
              disabled={sending}
              className="w-full"
            >
              Send <ArrowRight />
              <BottomGradient />
            </Button>
          </div>
        </VStack>
      </form>
    </Form>
  );
};

export default ContactForm;
