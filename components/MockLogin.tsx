"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/types";
import { useState } from "react";

const createUserSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone_number: z.string().min(4, { message: "Phone number must be at least 4 characters." }),
    role: z.enum(["student", "coach"], { message: "Role must be student or coach." }),
});

// Infer the type of the form data from the Zod schema
type UserForm = z.infer<typeof createUserSchema>;

interface MockLoginProps {
    students: User[],
    coaches: User[]
}

export default function MockLogin({ students, coaches }: MockLoginProps) {
    const [userIdState, setUserIdState] = useState<string>('');
    const router = useRouter();

    const form = useForm<UserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            phone_number: "",
            role: "student",
        },
    });

    const handleSelectUser = () => {
        router.push(`/users/${userIdState}/dashboard`);
    };

    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        console.log('data', data);
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const newUser = await response.json();
        router.push(`/users/${newUser.id}/dashboard`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10">
            <div className="md:col-span-1">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Login as a Student</CardTitle>
                        <CardDescription>Select a student user to explore the student dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <Label htmlFor="students">Students</Label>
                            <Select onValueChange={(value) => setUserIdState(value)}>
                                <SelectTrigger id="students">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {students.map((student) => (
                                        <SelectItem
                                            key={student.id}
                                            value={String(student.id)}
                                        >
                                            {student.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={handleSelectUser}>Continue</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="md:col-span-1">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Login as a Coach</CardTitle>
                        <CardDescription>Select a coach user to explore the coach dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <Label htmlFor="coaches">Coaches</Label>
                            <Select onValueChange={(value) => setUserIdState(value)}>
                                <SelectTrigger id="coaches">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {coaches.map((coach) => (
                                        <SelectItem
                                            key={String(coach.id)}
                                            value={String(coach.id)}
                                        >
                                            {coach.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={handleSelectUser}>Continue</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="md:col-span-1">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create New User</CardTitle>
                        <CardDescription>Create a new student or coach user.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1-234-567-7658" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger id="role">
                                                        <SelectValue placeholder="Select Student or Coach" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="student">Student</SelectItem>
                                                        <SelectItem value="coach">Coach</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Continue</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
