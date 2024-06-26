'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { convertToOrdinal } from '@/lib/utils';
import { Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { createMakeup } from '@/lib/actions/makeup.action';
import { useState } from 'react';

type Modal = Record<string, boolean>;

const schema = z.object({
  name: z.string().min(3).max(30),
  contact: z.string().min(10).max(10),
  occasion: z.string(),
  skinAllergy: z.string(),
  alternateContact: z.string(),
  makeups: z
    .array(
      z.object({
        location: z.string().min(3).max(100),
        date: z.date().min(new Date()),
        readyTime: z.string().min(1).max(30),
      }),
    )
    .min(1, 'Please add at least one makeup slot'),
});

export type Schema = z.infer<typeof schema>;
const BookingForm = () => {
  const [isOpen, setIsOpen] = useState<Modal>({});
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      contact: '',
      occasion: '',
      skinAllergy: '',
      alternateContact: '',
      makeups: [
        {
          location: '',
          date: new Date(),
          readyTime: '',
        },
      ],
    },
    mode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'makeups',
  });

  const onSubmit = (data: Schema) => {
    return new Promise((resolve) => {
      toast.promise(createMakeup(data), {
        loading: 'Submitting form...',
        success: () => {
          resolve('');
          form.reset();
          return 'Form submitted successfully';
        },
        error: () => {
          resolve('');
          return 'Something went wrong';
        },
      });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[1000px] px-5"
      >
        <div className="mt-10 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
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
            <h1 className="mb-5 text-3xl font-bold">Makeups</h1>{' '}
            <Button
              className="!p-5"
              type="button"
              onClick={() =>
                append({ location: '', date: new Date(), readyTime: '' })
              }
            >
              <Plus width={20} height={20} />
            </Button>
          </div>
          {form.formState.errors.makeups && (
            <p className="text-red-500">
              {form.formState.errors.makeups.message}
            </p>
          )}
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
                name={`makeups.${index}.readyTime`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="ready">
                      Ready Time for {convertToOrdinal(index + 1)} makeup
                    </FormLabel>
                    <FormControl {...field}>
                      <Input placeholder="Ready Time..." id="ready" />
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
                      <Popover
                        open={isOpen[`date-${index + 1}`]}
                        onOpenChange={(open) => {
                          setIsOpen((prev) => {
                            return { ...prev, [`date-${index + 1}`]: open };
                          });
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            className="block"
                            variant={'outline'}
                          >
                            {form.getFieldState(`makeups.${index}.date`).isDirty
                              ? field.value.toDateString()
                              : 'Select Date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit max-w-none p-0">
                          <Calendar
                            onSelect={(date) => {
                              setIsOpen((prev) => {
                                return {
                                  ...prev,
                                  [`date-${index + 1}`]: false,
                                };
                              });
                              field.onChange(date);
                            }}
                            mode="single"
                            selected={field.value}
                            fromDate={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={'ghost'}
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
  );
};

export default BookingForm;
