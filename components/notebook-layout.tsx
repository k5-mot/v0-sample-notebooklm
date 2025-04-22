"use client"

import { useState } from "react"
import SourcePanel from "./source-panel"
import ChatPanel from "./chat-panel"
import StudioPanel from "./studio-panel"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function NotebookLayout() {
  const [collapsedSource, setCollapsedSource] = useState(false)
  const [collapsedStudio, setCollapsedStudio] = useState(false)
  const [maximizedPanel, setMaximizedPanel] = useState<"source" | "chat" | "studio" | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // On mobile, we collapse both side panels by default
  const defaultLayout = isMobile ? [0, 100, 0] : [25, 50, 25]
  const collapsedLayout = isMobile
    ? [0, 100, 0]
    : maximizedPanel === "source"
      ? [100, 0, 0]
      : maximizedPanel === "chat"
        ? [0, 100, 0]
        : maximizedPanel === "studio"
          ? [0, 0, 100]
          : collapsedSource && collapsedStudio
            ? [0, 100, 0]
            : collapsedSource
              ? [0, 75, 25]
              : collapsedStudio
                ? [25, 75, 0]
                : [25, 50, 25]

  const toggleSourcePanel = () => {
    if (maximizedPanel) {
      setMaximizedPanel(null)
    } else {
      setCollapsedSource(!collapsedSource)
    }
  }

  const toggleStudioPanel = () => {
    if (maximizedPanel) {
      setMaximizedPanel(null)
    } else {
      setCollapsedStudio(!collapsedStudio)
    }
  }

  const toggleMaximize = (panel: "source" | "chat" | "studio") => {
    if (maximizedPanel === panel) {
      setMaximizedPanel(null)
    } else {
      setMaximizedPanel(panel)
    }
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsible={true}
          minSize={0}
          maxSize={100}
          collapsedSize={0}
          collapsed={collapsedSource || maximizedPanel === "chat" || maximizedPanel === "studio" ? true : undefined}
          className="relative"
        >
          <div className="absolute right-2 top-2 z-10 flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleMaximize("source")}>
              {maximizedPanel === "source" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleSourcePanel}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <SourcePanel />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={20} className="relative">
          <div className="absolute right-2 top-2 z-10">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleMaximize("chat")}>
              {maximizedPanel === "chat" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <ChatPanel />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={defaultLayout[2]}
          collapsible={true}
          minSize={0}
          maxSize={100}
          collapsedSize={0}
          collapsed={collapsedStudio || maximizedPanel === "source" || maximizedPanel === "chat" ? true : undefined}
          className="relative"
        >
          <div className="absolute left-2 top-2 z-10 flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleStudioPanel}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleMaximize("studio")}>
              {maximizedPanel === "studio" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <StudioPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
