import { Metadata } from "next"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlbumArtwork } from "./dashboard/components/album-artwork"
import { Menu } from "./dashboard/components/menu"
import { PodcastEmptyPlaceholder } from "./dashboard/components/podcast-empty-placeholder"
import { Sidebar } from "./dashboard/components/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "./dashboard/data/albums"
import { playlists } from "./dashboard/data/playlists";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { PropsWithChildren } from 'react';
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
export const metadata: Metadata = {
    title: "MonJob - Dashboard",
    description: "Votre espace de travail",
}

export default async function DashboardLayout(props: PropsWithChildren) {
    const  { children } = props;
    const supabase = createServerComponentClient<Database>({ cookies });

    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/music-light.png"
                    width={1280}
                    height={1114}
                    alt="Music"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/music-dark.png"
                    width={1280}
                    height={1114}
                    alt="Music"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden md:block h-screen">
                {/*<Menu />*/}
                <div className="h-full">
                    <div className="bg-background h-full">
                        <div className="grid lg:grid-cols-5 h-full overflow-hidden">
                            <Sidebar playlists={playlists} className="hidden lg:block bg-gradient-to-b from-green-500 to-green-600 text-green-50" />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                    <nav className="bg-white w-full p-3 flex items-center justify-between">
                                        <p>Page Title</p>
                                        <Button variant="ghost" size="lg" className="gap-x-2 px-2">
                                            <div className="text-left">
                                                <p className="text-xs">johndoe@mail.com</p>
                                                <small className="text-muted-foreground font-normal">Responsable</small>
                                            </div>
                                            <div className="h-10 rounded-md bg-green-100 flex items-center justify-center text-green-700 aspect-square">
                                                <p>AL</p>
                                            </div>
                                        </Button>
                                    </nav>
                                <div className="h-full px-4 py-6 lg:px-8 bg-gray-100">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}