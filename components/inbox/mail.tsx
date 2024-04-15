"use client"

import * as React from "react"
import {
  Search,
} from "lucide-react"
import {Input} from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {Separator} from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {TooltipProvider} from "@/components/ui/tooltip"
import {MailList} from "@/components/inbox/mail-list"
import {useListChatsQuery} from "@/lib/features/inbox/inboxApiSlice";
import {ReactNode} from "react";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";

interface MailProps {
  defaultLayout: number[] | undefined
  children: ReactNode;
}

export function Mail({defaultLayout = [440, 655], children}: MailProps) {
  const {data: chats, isLoading, isFetching} = useListChatsQuery();

  if (isLoading || isFetching) return <FullScreenSpinner/>

  console.log(chats)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator/>
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                  <Input placeholder="Search" className="pl-8"/>
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              {(chats?.count || 0) > 0 ? <MailList chats={chats?.results}/> :
                <div className="p-8 pt-20 h-screen text-center text-muted-foreground">
                  Chats not found.
                </div>
              }
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList chats={chats?.results.filter((chat) => !chat.is_read)}/>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}