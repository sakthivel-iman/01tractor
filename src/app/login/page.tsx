
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { TractorIcon } from "@/components/icons";
import { useAuth, useUser } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@tractor.com",
      password: "password123",
    },
  });

  React.useEffect(() => {
    if (!isUserLoading && user) {
      router.replace("/");
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/user-not-found") {
        try {
          await createUserWithEmailAndPassword(auth, values.email, values.password);
          toast({
            title: "Account Created",
            description: "New account created successfully. Logging you in...",
          });
          router.push("/");
        } catch (creationError) {
          console.error("Account creation failed", creationError);
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description:
              creationError instanceof FirebaseError
                ? creationError.message
                : "An unexpected error occurred.",
          });
        }
      } else {
        console.error("Login failed", error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description:
            error instanceof FirebaseError
              ? error.message
              : "Invalid credentials. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const tractorImage = PlaceHolderImages.find(
    (p) => p.id === "tafe-7515-tractor"
  );
  
  if (isUserLoading || user) {
    return (
       <div className="h-screen w-screen flex justify-center items-center">
         <TractorIcon className="w-24 h-24 animate-pulse text-primary" />
       </div>
    )
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {tractorImage && (
        <Image
          src={tractorImage.imageUrl}
          alt={tractorImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={tractorImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
      <div className="relative z-10 flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <TractorIcon className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl">
              Tractor Status
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
           <CardFooter>
             <p className="text-center text-xs text-muted-foreground w-full">
              If you don't have an account, one will be created for you.
             </p>
           </CardFooter>
        </Card>
      </div>
    </main>
  );
}
