
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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

type AuthAction = "signin" | "signup";

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

  const handleAuthAction = async (
    action: AuthAction,
    values: z.infer<typeof formSchema>
  ) => {
    setIsLoading(true);
    try {
      if (action === "signup") {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      }
      // The onAuthStateChanged listener in the provider will handle the redirect.
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.error(`${action} failed`, firebaseError);
      
      let description = "An unexpected error occurred.";
      if (firebaseError.code === 'auth/wrong-password') {
        description = 'Incorrect password. Please try again.';
      } else if (firebaseError.code === 'auth/user-not-found') {
        description = 'No account found with this email. Please sign up.';
      } else if (firebaseError.code === 'auth/email-already-in-use') {
        description = 'This email is already in use. Please sign in.';
      } else if (firebaseError.message) {
        description = firebaseError.message;
      }

      toast({
        variant: "destructive",
        title: `${action === "signup" ? "Sign Up" : "Sign In"} Failed`,
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const tractorImage = PlaceHolderImages.find(
    (p) => p.id === "tafe-7515-tractor"
  );

  if (isUserLoading || user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-background">
        <TractorIcon className="w-24 h-24 animate-pulse text-primary" />
      </div>
    );
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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <div className="relative z-10 flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-lg">
          <CardHeader className="text-center items-center pt-8">
            <TractorIcon className="w-16 h-16 mb-4 text-primary" />
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
                onSubmit={(e) => e.preventDefault()}
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
                          placeholder="admin@tractor.com"
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
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button
                      onClick={form.handleSubmit((values) => handleAuthAction("signin", values))}
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                    </Button>
                    <Button
                      onClick={form.handleSubmit((values) => handleAuthAction("signup", values))}
                      variant="secondary"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-xs text-muted-foreground w-full">
              Use your credentials or create a new account.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
