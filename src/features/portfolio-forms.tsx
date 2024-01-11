import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { portfolioSchema } from "@/types/portfolio-schema";
import React from "react";
import { PortfolioInputs, ProfileSchema } from "@/types/api";
import { updatePost } from "@/lib/fetchers";
import { toast } from "sonner";

interface PortfolioFormProps {
  mode: "add" | "edit";
  initialProductData?: ProfileSchema;
}

export function ProfileForm({ mode, initialProductData }: PortfolioFormProps) {
  const router = useRouter();

  const form = useForm<PortfolioInputs>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      username: initialProductData?.data.username,
      description: initialProductData?.data.description,
    },
  });
  // ...

  const onSubmit = async (data: PortfolioInputs) => {
    const { success, message } = await updatePost(
      mode,
      data,
      initialProductData?.data.id
    );

    success ? toast.success(message) : toast.error(message);

    // router.push("/dashboard/products");
  };

  React.useEffect(() => {
    form.setFocus("username");
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
