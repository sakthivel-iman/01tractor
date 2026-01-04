
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Header } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TractorIcon } from '@/components/icons';
import { User as UserIcon, Mail, LogOut, Phone, Home, Edit, Save, Hash, Calendar, ShieldAlert } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleSave = () => {
    // TODO: Implement save logic to Firestore
    console.log("Saving data...");
    setIsEditing(false);
  }

  const tractorImage = PlaceHolderImages.find((p) => p.id === 'tafe-7515-tractor');

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto space-y-8">
              {/* Profile Card Skeleton */}
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>

              {/* Tractor Card Skeleton */}
               <Card className="shadow-lg">
                <CardHeader>
                  <Skeleton className="h-8 w-64" />
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full md:col-span-2" />
                    </div>
                    <Skeleton className="aspect-video w-full rounded-lg" />
                </CardContent>
              </Card>
              
              <Skeleton className="h-24 w-full" />
            </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto py-8">
            <div className="w-full max-w-4xl mx-auto space-y-8">

              {/* User Profile Card */}
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                            <AvatarFallback>
                                <UserIcon className="h-10 w-10" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-headline">User Profile</CardTitle>
                            <CardDescription>View and manage your personal information.</CardDescription>
                        </div>
                    </div>
                     <Button onClick={() => setIsEditing(!isEditing)} size="icon" variant={isEditing ? 'ghost' : 'default'} disabled>
                        <Edit className="h-5 w-5" />
                        <span className="sr-only">{'Edit'}</span>
                    </Button>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="userName"><UserIcon className="inline-block mr-2 h-4 w-4" />User Name</Label>
                    <Input id="userName" defaultValue={user.displayName || ''} readOnly={!isEditing} disabled />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="email"><Mail className="inline-block mr-2 h-4 w-4" />Mail ID</Label>
                    <Input id="email" type="email" defaultValue={user.email || ''} readOnly disabled/>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="phone"><Phone className="inline-block mr-2 h-4 w-4" />Phone No</Label>
                    <Input id="phone" defaultValue="" readOnly={!isEditing} disabled={!isEditing} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="emergencyContact"><ShieldAlert className="inline-block mr-2 h-4 w-4 text-red-500" />Emergency Contact No</Label>
                    <Input id="emergencyContact" defaultValue="" readOnly={!isEditing} disabled={!isEditing} />
                  </div>
                </CardContent>
              </Card>

              {/* Tractor Information Card */}
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                        <TractorIcon className="h-10 w-10 text-primary" />
                        <div>
                            <CardTitle className="text-2xl font-headline">My Tractor Information</CardTitle>
                            <CardDescription>Details about your registered tractor.</CardDescription>
                        </div>
                    </div>
                     {isEditing ? (
                        <Button onClick={handleSave} size="icon">
                            <Save className="h-5 w-5" />
                            <span className="sr-only">Save</span>
                        </Button>
                     ) : (
                        <Button onClick={() => setIsEditing(true)} size="icon" variant="default">
                            <Edit className="h-5 w-5" />
                            <span className="sr-only">Edit</span>
                        </Button>
                     )}
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tractorName">Tractor Name</Label>
                            <Input id="tractorName" defaultValue="TAFE 7515" readOnly={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="engineNo"><Hash className="inline-block mr-2 h-4 w-4" />Engine No</Label>
                            <Input id="engineNo" defaultValue="ENG987654321" readOnly={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="chassisNo"><Hash className="inline-block mr-2 h-4 w-4" />Chassis No</Label>
                            <Input id="chassisNo" defaultValue="CHAS123456789" readOnly={!isEditing} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="yom"><Calendar className="inline-block mr-2 h-4 w-4" />Year of Registration</Label>
                            <Input id="yom" defaultValue="2023" type="number" readOnly={!isEditing} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address"><Home className="inline-block mr-2 h-4 w-4" />Address</Label>
                            <Input id="address" defaultValue="123 Tractor Lane, Farmville, AG 54321" readOnly={!isEditing} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Tractor Image</Label>
                        {tractorImage && (
                            <div className="aspect-video w-full overflow-hidden rounded-lg border">
                                <img
                                    src={tractorImage.imageUrl}
                                    alt={tractorImage.description}
                                    className="h-full w-full object-cover"
                                    data-ai-hint={tractorImage.imageHint}
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Account Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleLogout} variant="destructive" className="w-full md:w-auto">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </CardContent>
              </Card>

            </div>
        </div>
      </main>
    </div>
  );
}
