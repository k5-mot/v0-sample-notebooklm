"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Mic, Play, Pause, Save, Plus, Edit, Trash2, Volume2 } from "lucide-react"

type Note = {
  id: string
  title: string
  content: string
  date: string
}

type AudioClip = {
  id: string
  title: string
  duration: string
  date: string
}

export default function StudioPanel() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Meeting Notes",
      content: "Discussed project timeline and resource allocation...",
      date: "2023-04-15",
    },
    {
      id: "2",
      title: "Research Ideas",
      content: "Potential research directions for the next quarter...",
      date: "2023-04-10",
    },
  ])

  const [audioClips, setAudioClips] = useState<AudioClip[]>([
    {
      id: "1",
      title: "Project Summary",
      duration: "1:24",
      date: "2023-04-15",
    },
    {
      id: "2",
      title: "Meeting Recap",
      duration: "2:37",
      date: "2023-04-10",
    },
  ])

  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<AudioClip | null>(null)

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      date: new Date().toISOString().split("T")[0],
    }

    setNotes([...notes, newNote])
    setActiveNote(newNote)
  }

  const handleSaveNote = () => {
    if (activeNote) {
      setNotes(notes.map((note) => (note.id === activeNote.id ? activeNote : note)))
    }
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (activeNote?.id === id) {
      setActiveNote(null)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Start recording simulation
      setTimeout(() => {
        const newAudio: AudioClip = {
          id: Date.now().toString(),
          title: "New Recording",
          duration: "0:00",
          date: new Date().toISOString().split("T")[0],
        }

        setAudioClips([...audioClips, newAudio])
        setCurrentAudio(newAudio)
      }, 500)
    }
  }

  const togglePlayback = (audio: AudioClip) => {
    setIsPlaying(!isPlaying)
    setCurrentAudio(audio)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 bg-background border-b p-4">
        <h2 className="text-lg font-semibold">Studio</h2>
        <p className="text-sm text-muted-foreground">Create notes and audio clips</p>
      </div>

      <Tabs defaultValue="notes" className="flex-1">
        <div className="px-4 pt-2 sticky top-[105px] z-10 bg-background">
          <TabsList className="w-full">
            <TabsTrigger value="notes" className="flex-1">
              Notes
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex-1">
              Audio
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="notes" className="flex-1 p-0 m-0 flex flex-col">
          <div className="p-4">
            <Button className="w-full" onClick={handleNewNote}>
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </div>

          <div className="flex-1 p-4 pt-0">
            <div className="grid gap-2">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${activeNote?.id === note.id ? "border-primary" : ""}`}
                  onClick={() => setActiveNote(note)}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm">{note.title}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteNote(note.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{note.date}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {activeNote && (
            <Card className="m-4 mt-0">
              <CardHeader className="p-3">
                <Input
                  value={activeNote.title}
                  onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
                  className="font-medium"
                />
              </CardHeader>
              <CardContent className="p-3">
                <Textarea
                  value={activeNote.content}
                  onChange={(e) => setActiveNote({ ...activeNote, content: e.target.value })}
                  className="min-h-[100px] resize-none"
                  placeholder="Write your notes here..."
                />
                <Button className="w-full mt-3" onClick={handleSaveNote}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="audio" className="flex-1 p-0 m-0 flex flex-col">
          <div className="p-4">
            <Button className={`w-full ${isRecording ? "bg-red-500 hover:bg-red-600" : ""}`} onClick={toggleRecording}>
              <Mic className="mr-2 h-4 w-4" />
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>

            {isRecording && (
              <div className="mt-2 p-2 bg-red-100 rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-red-700">Recording in progress...</span>
              </div>
            )}
          </div>

          <div className="flex-1 p-4 pt-0">
            <div className="grid gap-2">
              {audioClips.map((audio) => (
                <Card
                  key={audio.id}
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${currentAudio?.id === audio.id ? "border-primary" : ""}`}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm">{audio.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {audio.duration} • {audio.date}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => togglePlayback(audio)}>
                          {isPlaying && currentAudio?.id === audio.id ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {currentAudio && (
            <Card className="m-4 mt-0">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => togglePlayback(currentAudio)}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: isPlaying ? "45%" : "0%", transition: "width 1s linear" }}
                      ></div>
                    </div>
                  </div>

                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>{isPlaying ? "0:45" : "0:00"}</span>
                  <span>{currentAudio.duration}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
