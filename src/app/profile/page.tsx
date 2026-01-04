
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Header } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TractorIcon } from '@/components/icons';
import { User as UserIcon, Mail, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="items-center text-center">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-48" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto py-8">
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
                <CardHeader className="items-center text-center bg-card p-8">
                    <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                        <AvatarFallback>
                            <UserIcon className="h-12 w-12" />
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-headline">{user.displayName || 'User Profile'}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {user.email}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="space-y-6">
                         <div>
                            <h3 className="font-semibold mb-2 text-lg">Your Tractor</h3>
                            <div className="p-4 flex items-center gap-4 rounded-lg border bg-muted/50">
                                <TractorIcon className="h-10 w-10 text-primary" />
                                <div>
                                    <p className="font-medium">TAFE 7515</p>
                                    <p className="text-sm text-muted-foreground">ID: {user.uid.substring(0, 8)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                             <h3 className="font-semibold mb-2 text-lg">Account Actions</h3>
                             <Button onClick={handleLogout} variant="destructive" className="w-full">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
