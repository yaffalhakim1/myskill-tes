/* eslint-disable @next/next/no-img-element */
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
import {
  CalendarIcon,
  FileCheck2Icon,
  Loader2,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioCard from "@/components/portfolio-card";

interface PortfolioFormProps {
  mode: "add" | "edit";
  initialProductData?: ProfileSchema;
}

export function ProfileForm({ mode, initialProductData }: PortfolioFormProps) {
  const router = useRouter();

  const form = useForm<PortfolioInputs>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      username: initialProductData?.username,
      description: initialProductData?.description,
      backgroundImage: initialProductData?.backgroundImage,
      avatar: initialProductData?.avatar,
      title: initialProductData?.title,
      portfolios: initialProductData?.portfolios,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "portfolios",
    control: form.control,
  });

  const onSubmit = async (data: PortfolioInputs) => {
    const { success, message } = await updatePortfolio(
      mode,
      data,
      initialProductData?.id
    );

    success ? toast.success(message) : toast.error(message);
    if (!success) return;
    router.push("/");
  };

  return (
    <Form {...form}>
      <Tabs defaultValue="form">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField
              control={form.control}
              name="backgroundImage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <>
                      <Input
                        className="hidden"
                        id="backgroundImage"
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files) return;

                          const file = files[0];
                          if (!file) return;

                          form.setValue(
                            "backgroundImage",
                            URL.createObjectURL(file),
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                        }}
                        accept="image/*"
                        ref={field.ref}
                        disabled={field.disabled}
                      />
                      <label htmlFor="backgroundImage" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full font-medium cursor-pointer"
                          asChild
                        >
                          <div>
                            <UploadCloudIcon className="mr-1.5 h-3.5 w-3.5 translate-y-[-1px] stroke-foreground stroke-[0.6px]" />
                            Upload Background Image here
                          </div>
                        </Button>
                      </label>
                    </>
                  </FormControl>

                  {mode === "add" &&
                    form.getFieldState("backgroundImage").isDirty && (
                      <Image
                        width={250}
                        height={250}
                        src={field.value}
                        alt={"Image preview"}
                      />
                    )}
                  {mode === "edit" && initialProductData && (
                    <Image
                      width={250}
                      height={250}
                      src={
                        form.getFieldState("backgroundImage").isDirty
                          ? field.value
                          : initialProductData.backgroundImage
                      }
                      alt={initialProductData.title}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <>
                      <Input
                        className="hidden"
                        id="avatar"
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files) return;

                          const file = files[0];
                          if (!file) return;

                          form.setValue("avatar", URL.createObjectURL(file), {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                        accept="image/*"
                        ref={field.ref}
                        disabled={field.disabled}
                      />
                      <label htmlFor="avatar" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full font-medium cursor-pointer"
                          asChild
                        >
                          <div>
                            <UploadCloudIcon className="mr-1.5 h-3.5 w-3.5 translate-y-[-1px] stroke-foreground stroke-[0.6px]" />
                            Upload avatar here
                          </div>
                        </Button>
                      </label>
                    </>
                  </FormControl>
                  {mode === "add" && form.getFieldState("avatar").isDirty && (
                    <Image
                      width={250}
                      height={250}
                      src={field.value}
                      alt={"Image preview"}
                    />
                  )}
                  {mode === "edit" && initialProductData && (
                    <Image
                      width={250}
                      height={250}
                      src={
                        form.getFieldState("avatar").isDirty
                          ? field.value
                          : initialProductData.avatar
                      }
                      alt={initialProductData.title}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                    <Input placeholder="Your position" {...field} />
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
                    <h1 className="text-2xl font-bold">
                      Portfolio {index + 1}
                    </h1>
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
                    name={`portfolios.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`portfolios.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your position at current company"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`portfolios.${index}.company`}
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
                      name={`portfolios.${index}.startDate`}
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
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
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
                      name={`portfolios.${index}.endDate`}
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
                            <PopoverContent
                              className="w-auto p-0 "
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
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
                    name={`portfolios.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What is your achievement here?"
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
                  Add Portfolios
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          {fields.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <FileCheck2Icon className="w-24 h-24 text-muted-foreground" />
              <h6 className="text-2xl font-bold text-muted-foreground">
                Your portfolio preview will be shown here
              </h6>
            </div>
          )}
          {fields.map((field, index) => (
            <PortfolioCard
              key={field.id}
              title={field.name}
              position={field.position}
              company={field.company}
              startDate={field.startDate}
              endDate={field.endDate || new Date()}
              description={field.description}
              id={index}
              onDeleteClick={() => {}}
            />
          ))}
        </TabsContent>
      </Tabs>
    </Form>
  );
}
