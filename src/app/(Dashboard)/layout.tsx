import { Metadata } from "next"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AlbumArtwork } from "./dashboard/components/album-artwork"
import { Menu } from "./dashboard/components/menu"
import { PodcastEmptyPlaceholder } from "./dashboard/components/podcast-empty-placeholder"
import { Sidebar } from "./dashboard/components/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "./dashboard/data/albums"
import { playlists } from "./dashboard/data/playlists"
import Image from "next/image"
import { PlusCircle } from "lucide-react"
import { PropsWithChildren } from 'react';

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "MonJob - Dashboard",
    description: "Example music app using the components.",
}

export default function DashboardLayout(props: PropsWithChildren) {
    const  { children } = props;
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
            <div className="hidden md:block">
                {/*<Menu />*/}
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar playlists={playlists} className="hidden lg:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8">
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