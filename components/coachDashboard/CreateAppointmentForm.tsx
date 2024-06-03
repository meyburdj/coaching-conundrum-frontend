"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

const appointmentSchema = z.object({
    appointmentDate: z.date({
        message: "Please select a date.",
    }),
    appointmentHour: z.number().int().min(1).max(12, {
        message: "Hour must be between 1 and 12.",
    }),
    appointmentMinute: z.number().int().min(0).max(59, {
        message: "Minute must be between 0 and 59.",
    }),
    appointmentPeriod: z.enum(["AM", "PM"], {
        message: "Please select AM or PM.",
    }),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface CreateAppointmentFormProps {
    coach_id: number;
    onSubmit: SubmitHandler<AppointmentFormValues>;
}

export function CreateAppointmentForm({ onSubmit }: CreateAppointmentFormProps) {
    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            appointmentDate: new Date(),
            appointmentHour: 10,
            appointmentMinute: 0,
            appointmentPeriod: "AM",
        },
    });

    return (
        <Card className="h-full max-h-[70vh] overflow-y-auto shadow-md">
            <CardHeader>
                <CardTitle>Create Appointment</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="appointmentDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                                >
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex space-x-4">
                            <Controller
                                control={form.control}
                                name="appointmentHour"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Hour</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                max="12"
                                                placeholder="HH"
                                                value={field.value}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="appointmentMinute"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Minute</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                max="59"
                                                placeholder="MM"
                                                value={field.value}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="appointmentPeriod"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>AM/PM</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select AM/PM" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="AM">AM</SelectItem>
                                                    <SelectItem value="PM">PM</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
