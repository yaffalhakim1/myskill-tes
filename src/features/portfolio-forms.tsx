import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Dropzone } from "@/components/ui/dropzone";
import { CalendarIcon, FileCheck2Icon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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
      backgroundImage: initialProductData?.data.backgroundImage,
      avatar: initialProductData?.data.avatar,
      title: initialProductData?.data.title,
      portfolio: initialProductData?.data.portfolio,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "portfolio",
    control: form.control,
  });

  const onSubmit = async (data: PortfolioInputs) => {
    const { success, message } = await updatePost(
      mode,
      data,
      initialProductData?.data.id
    );

    success ? toast.success(message) : toast.error(message);

    // router.push("/dashboard/products");
  };

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        {
          types: ["image/jpeg", "image/png"],
          message: "Only image files are allowed",
        },
      ];
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );
      if (!fileType) {
        form.setValue("backgroundImage", null);
        form.setError("backgroundImage", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        form.setValue("backgroundImage", acceptedFiles[0]);
        form.clearErrors("backgroundImage");
      }
    } else {
      form.setValue("backgroundImage", null);
      form.setError("backgroundImage", {
        message: "File is required",
        type: "typeError",
      });
    }
  }
  function handleOnDropTwo(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        {
          types: ["image/jpeg", "image/png"],
          message: "Only image files are allowed",
        },
      ];
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );
      if (!fileType) {
        form.setValue("avatar", null);
        form.setError("avatar", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        form.setValue("avatar", acceptedFiles[0]);
        form.clearErrors("avatar");
      }
    } else {
      form.setValue("avatar", null);
      form.setError("avatar", {
        message: "File is required",
        type: "typeError",
      });
    }
  }

  //   React.useEffect(() => {
  //     form.setFocus("username");
  //   }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="backgroundImage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Dropzone
                  {...field}
                  dropMessage="Drop files or click here"
                  handleOnDrop={handleOnDrop}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("backgroundImage") && (
          <div className="relative flex items-center justify-center gap-3 p-4">
            <FileCheck2Icon className="w-4 h-4" />
            <p className="text-sm font-medium">
              {form.watch("backgroundImage")?.name}
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Dropzone
                  {...field}
                  dropMessage="Drop files or click here"
                  handleOnDrop={handleOnDropTwo}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("avatar") && (
          <div className="relative flex items-center justify-center gap-3 p-4">
            <FileCheck2Icon className="w-4 h-4" />
            <p className="text-sm font-medium">{form.watch("avatar")?.name}</p>
          </div>
        )}
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
              <FormLabel>Description</FormLabel>
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
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`portfolio.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
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
                name={`portfolio.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
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
                name={`portfolio.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
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
                name={`portfolio.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="absolute w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`portfolio.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`portfolio.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          );
        })}
        <Button
          type="button"
          onClick={() =>
            append({
              name: "",
              position: "",
              company: "",
              startDate: new Date(),
              endDate: new Date(),
              description: "",
            })
          }
        >
          APPEND
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
