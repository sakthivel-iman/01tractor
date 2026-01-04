
"use client";

import { useRouter } from "next/navigation";
import { LogOut, User, Menu, AlertTriangle } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { TractorIcon } from "../icons";
import { useUser, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export function Header() {
  const router = useRouter();
  const { user } = useUser();
  const auth = getAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  const handleSos = async () => {
    if (!user) return;
    const sosData = {
      userId: user.uid,
      timestamp: serverTimestamp(),
      location: {
        lat: 0, // Replace with actual location if available
        lng: 0,
      }
    };

    try {
      const sosCollectionRef = collection(firestore, `users/${user.uid}/sosAlerts`);
      await addDoc(sosCollectionRef, sosData)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: sosCollectionRef.path,
                    operation: 'create',
                    requestResourceData: sosData,
                })
            )
        });

      toast({
        title: "SOS Alert Sent",
        description: "Your emergency alert has been sent to the ESP32 controller.",
      });
    } catch (error) {
      console.error("Error sending SOS:", error);
      toast({
        variant: "destructive",
        title: "SOS Failed",
        description: "Could not send the alert. Please try again.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
       <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
        <TractorIcon className="h-7 w-7 text-primary" />
        <h1 className="font-headline text-xl font-semibold tracking-tight">
          Tractor Status
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="gap-2 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">SOS</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm SOS Alert</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately send an emergency alert to your registered contacts via the ESP32 controller. Are you sure you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSos}>Confirm & Send</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuLabel>{user?.email ?? 'My Account'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={goToProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
