import {ComponentProps} from "react"

import {cn} from "@/lib/utils"
import {Badge} from "@/components/ui/badge"
import {ScrollArea} from "@/components/ui/scroll-area"
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";
import {Chat} from "@/lib/features/inbox/inboxApiSlice";
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";


interface MailListProps {
  chats?: Chat[] | undefined;
}

export function MailList({chats}: MailListProps) {
  const router = useRouter()
  const {room_id} = useAppSelector(state => state.inbox)

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {chats?.map((chat) => (
          <button
            key={chat.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              room_id === chat.room_id && "bg-muted"
            )}
            onClick={() => router.push(`/inbox/${chat.room_id}`)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {chat.feedback.vacancy.title.slice(0, 30) +
                      ((chat.feedback.vacancy.title.length - 30) > 1 ? '...' : '')}
                  </div>
                  {!chat.is_read && (
                    <span className="flex h-2 w-2 mr-3 rounded-full bg-blue-600"/>
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    room_id === chat.room_id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(chat.updated_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{chat.feedback.vacancy.company}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {chat.last_message.substring(0, 300)}
            </div>
            {chat.feedback.vacancy.employ_options.length ? (
              <div className="flex items-center gap-2">
                {chat.feedback.vacancy.employ_options.slice(0, 3).map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

export function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["remote work"].includes(label.toLowerCase())) {
    return "secondary"
  }

  if (["office"].includes(label.toLowerCase())) {
    return "default"
  }

  return "outline"
}