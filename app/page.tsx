"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { convertToOrdinal } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { toast } from "sonner";
import { createMakeup } from "@/lib/actions/makeup.action";

export default function Home() {
  const schema = z.object({
    name: z.string().min(3).max(30),
    contact: z.string().min(10).max(10),
    readyTime: z.string().min(1).max(30),
    occasion: z.string(),
    skinAllergy: z.string(),
    alternateContact: z.string(),
    makeups: z.array(
      z.object({
        location: z.string().min(3).max(100),
        date: z.date().min(new Date()),
      })
    ),
  });

  type Schema = z.infer<typeof schema>;
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      contact: "",
      readyTime: "",
      occasion: "",
      skinAllergy: "",
      alternateContact: "",
      makeups: [
        {
          location: "",
          date: new Date(),
        },
      ],
    },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "makeups",
  });

  const onSubmit = (data: Schema) => {
    return new Promise((resolve) => {
      toast.promise(createMakeup(data), {
        loading: "Submitting form...",
        success: () => {
          resolve("");
          form.reset();
          return "Form submitted successfully";
        },
        error: () => {
          resolve("");
          return "Something went wrong";
        },
      });
    });
  };
  return (
    <main className="grow">
      <div className="relative w-[min(600px,100%)] mx-auto mt-5 px-5">
        <h1 className="text-center text-4xl font-bold">
          Thank you for choosing
        </h1>
        <Image
          src={"/logo.png"}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full"
          priority
        />
        <p className="text-gray-400 text-center">
          Please fill up the below details to proceed further with your
          makeup booking with us
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[1000px] mx-auto px-5"
        >
          <div className="grid grid-cols-2 gap-4 mt-10 max-sm:grid-cols-1">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl {...field}>
                    <Input placeholder="Name..." id="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contact"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact">Contact Number</FormLabel>
                  <FormControl {...field}>
                    <Input placeholder="Contact Number..." id="contact" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="alternateContact"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="alternateContact">
                    Alternate Contact Number
                  </FormLabel>
                  <FormControl {...field}>
                    <Input
                      placeholder="Alternate Contact Number..."
                      id="alternateContact"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="readyTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="ready">Ready Time</FormLabel>
                  <FormControl {...field}>
                    <Input placeholder="Ready Time..." id="ready" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="occasion"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="occasion">Occasion</FormLabel>
                  <FormControl {...field}>
                    <Input placeholder="Occasion..." id="occasion" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="skinAllergy"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="allergies">Skin Allergies</FormLabel>
                  <FormControl {...field}>
                    <Input
                      placeholder="Skin Allergies (if any)..."
                      id="allergies"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="font-bold text-3xl mb-5">Makeups</h1>{" "}
              <Button
                className="!p-5"
                type="button"
                onClick={() => append({ location: "", date: new Date() })}
              >
                <Plus width={20} height={20} />
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="my-5 flex flex-col gap-3.5">
                <FormField
                  control={form.control}
                  name={`makeups.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="location">
                        Location for {convertToOrdinal(index + 1)} makeup
                      </FormLabel>
                      <FormControl {...field}>
                        <Input placeholder="Location..." id="location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`makeups.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="date">
                        Date for {convertToOrdinal(index + 1)} makeup
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              className="block"
                              variant={"outline"}
                            >
                              {form.getFieldState(`makeups.${index}.date`)
                                .isDirty
                                ? field.value.toDateString()
                                : "Select Date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="max-w-none w-fit p-0">
                            <Calendar onSelect={field.onChange} mode="single" />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"ghost"}
                  className="w-max"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash color="red" />
                </Button>
                {index !== fields.length - 1 && <Separator className="mt-5" />}
              </div>
            ))}
          </div>
          <div className="my-10">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
