import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { portfolioSchema } from "@/types/portfolio-schema";
import React from "react";
import { PortfolioInputs, ProfileSchema } from "@/types/api";
import { updatePortfolio } from "@/lib/fetchers";
import { toast } from "sonner";
import { Dropzone } from "@/components/ui/dropzone";
import { CalendarIcon, FileCheck2Icon, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

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
      //   portfolio: [
      //     {
      //       name: initialProductData?.data.portfolio[0],
      //     }
      //   ]
      // },

      portfolio: initialProductData?.data.portfolio.map((item) => ({
        name: item.name,
        position: item.position,
        company: item.company,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "portfolio",
    control: form.control,
  });

  const onSubmit = async (data: PortfolioInputs) => {
    const { success, message } = await updatePortfolio(
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
          types: ["image/jpeg", "image/png", "image/jpg"],
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
        form.getFieldState("backgroundImage").isDirty;
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
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

        {mode === "add" && form.watch("backgroundImage") && (
          <Image
            width={250}
            height={250}
            alt={"Image preview"}
            // className="w-full"
            src={
              form.watch("backgroundImage") &&
              URL.createObjectURL(form.watch("backgroundImage"))
            }
          />
        )}
        {mode === "edit" && initialProductData && (
          <Image
            width={100}
            height={100}
            src={initialProductData.data.backgroundImage}
            alt={initialProductData.data.title}
          />
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
        {mode === "add" && form.watch("avatar") && (
          <Image
            width={100}
            height={100}
            alt={"Image preview"}
            // className="w-full"
            src={
              form.watch("avatar") && URL.createObjectURL(form.watch("avatar"))
            }
          />
        )}
        {mode === "edit" && initialProductData && (
          <Image
            width={500}
            height={500}
            src={initialProductData.data.avatar}
            alt={initialProductData.data.title}
          />
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

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title/position</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

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
                <Textarea
                  placeholder="Describe yourself here"
                  {...field}
                  rows={5}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => {
          return (
            <div key={field.id} className="space-y-4">
              <div className="flex">
                <h1 className="text-2xl font-bold">Portfolio {index + 1}</h1>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-auto"
                >
                  <XIcon className="w-6 h-6 text-red-500" />
                </button>
              </div>
              <FormField
                control={form.control}
                name={`portfolio.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

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

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`portfolio.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Shopee" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-0 space-y-2 md:flex md:space-x-2 md:space-y-0">
                <FormField
                  control={form.control}
                  name={`portfolio.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel>Start Date</FormLabel>
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`portfolio.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
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
                        <PopoverContent className="w-auto p-0 " align="start">
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`portfolio.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="paracetamol, aaa"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
        <div className="space-x-2">
          <>
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
              Add Portfolio
            </Button>
            <Button type="submit">Save Changes</Button>
          </>
          {/* {form.watch() && (
            <pre className="text-black">
              {JSON.stringify(form.watch(), null, 2)}
            </pre>
          )} */}
        </div>
      </form>
    </Form>
  );
}
