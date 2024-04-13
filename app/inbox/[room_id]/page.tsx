"use client";

import {MailDisplay} from "@/components/inbox/mail-display";
import * as React from "react";
import {useRetrieveChatMessagesQuery, useRetrieveChatQuery} from "@/lib/features/inbox/inboxApiSlice";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Archive, Trash2} from "lucide-react";
import {useAppDispatch} from "@/lib/hooks";
import {setRoomId} from "@/lib/features/inbox/inboxSlice";
import Spinner from "@/components/general/Spinner";
import {useEffect} from "react";
import {useRetrieveUserQuery} from "@/lib/features/auth/authApiSlice";

export default function MessagesPage({params}: { params: { room_id: string } }) {
  const {data: messages, isLoading, isFetching} = useRetrieveChatMessagesQuery(params.room_id);
  const {data: chat, isLoading: isLoadingChat, isFetching: isFetchingChat} = useRetrieveChatQuery(params.room_id);
  const {data: user, isLoading: isLoadingUser, isFetching: isFetchingUser} = useRetrieveUserQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRoomId(params.room_id));
  }, [dispatch, params.room_id])

  if (isLoading || isFetching || isLoadingChat || isFetchingChat || isLoadingUser || isFetchingUser || !chat)
    return <Spinner size={150}/>;

  return (
    <div className="flex lg:flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="mx-1 h-6"/>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!chat}>
                <Archive className="h-4 w-4"/>
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6"/>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!chat}>
                <Trash2 className="h-4 w-4"/>
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6"/>
        </div>
      </div>
      <MailDisplay messages={messages} chat={chat} user={user}/>
    </div>
  )
}