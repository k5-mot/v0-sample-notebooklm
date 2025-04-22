"use client"
import SourcePanel from "./source-panel"
import ChatPanel from "./chat-panel"
import StudioPanel from "./studio-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"
import { FileText, MessageSquare, PenTool } from "lucide-react"

export default function NotebookLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Desktop layout with fixed columns
  const DesktopLayout = () => (
    <div className="grid h-[100vh] w-full grid-cols-[300px_1fr_300px] overflow-hidden">
      <div className="h-full overflow-y-auto border-r">
        <SourcePanel />
      </div>
      <div className="h-full overflow-y-auto">
        <ChatPanel />
      </div>
      <div className="h-full overflow-y-auto border-l">
        <StudioPanel />
      </div>
    </div>
  )

  // Mobile layout with tabs
  const MobileLayout = () => (
    <Tabs defaultValue="chat" className="h-[100vh]">
      <TabsList className="fixed top-0 z-10 grid h-14 w-full grid-cols-3 rounded-none border-b bg-background">
        <TabsTrigger
          value="source"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          <FileText className="h-4 w-4" />
          <span>Sources</span>
        </TabsTrigger>
        <TabsTrigger
          value="chat"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Chat</span>
        </TabsTrigger>
        <TabsTrigger
          value="studio"
          className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          <PenTool className="h-4 w-4" />
          <span>Studio</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="source" className="mt-14 h-[calc(100vh-3.5rem)] m-0 p-0 overflow-y-auto">
        <SourcePanel />
      </TabsContent>
      <TabsContent value="chat" className="mt-14 h-[calc(100vh-3.5rem)] m-0 p-0 overflow-y-auto">
        <ChatPanel />
      </TabsContent>
      <TabsContent value="studio" className="mt-14 h-[calc(100vh-3.5rem)] m-0 p-0 overflow-y-auto">
        <StudioPanel />
      </TabsContent>
    </Tabs>
  )

  return <div className="w-full bg-background">{isMobile ? <MobileLayout /> : <DesktopLayout />}</div>
}
