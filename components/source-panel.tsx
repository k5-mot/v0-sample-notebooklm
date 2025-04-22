"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, File, Trash2, Search } from "lucide-react"

type Document = {
  id: string
  title: string
  type: string
  content: string
  date: string
}

export default function SourcePanel() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Project Requirements",
      type: "pdf",
      content: "This document outlines the requirements for the project...",
      date: "2023-04-15",
    },
    {
      id: "2",
      title: "Meeting Notes",
      type: "doc",
      content: "Notes from the team meeting on April 10th...",
      date: "2023-04-10",
    },
    {
      id: "3",
      title: "Research Paper",
      type: "pdf",
      content: "Abstract: This research explores the impact of...",
      date: "2023-03-22",
    },
  ])

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle file uploads
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const newDoc: Document = {
        id: Date.now().toString(),
        title: file.name,
        type: file.name.split(".").pop() || "unknown",
        content: "Content would be extracted from the file...",
        date: new Date().toISOString().split("T")[0],
      }

      setDocuments([...documents, newDoc])
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 bg-background border-b p-4">
        <h2 className="text-lg font-semibold">Sources</h2>
        <p className="text-sm text-muted-foreground">Manage your document sources</p>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <Button className="w-full" onClick={() => document.getElementById("file-upload")?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
          />
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1">
        <div className="px-4 sticky top-[105px] z-10 bg-background">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="pdfs" className="flex-1">
              PDFs
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex-1">
              Docs
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 p-0 m-0">
          <div className="p-4 grid gap-2">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedDocument?.id === doc.id ? "border-primary" : ""}`}
                onClick={() => handleDocumentSelect(doc)}
              >
                <CardHeader className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm">{doc.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardDescription className="text-xs">{doc.date}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pdfs" className="flex-1 p-0 m-0">
          <div className="p-4 grid gap-2">
            {filteredDocuments
              .filter((doc) => doc.type === "pdf")
              .map((doc) => (
                <Card
                  key={doc.id}
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedDocument?.id === doc.id ? "border-primary" : ""}`}
                  onClick={() => handleDocumentSelect(doc)}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <CardTitle className="text-sm">{doc.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">{doc.date}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="docs" className="flex-1 p-0 m-0">
          <div className="p-4 grid gap-2">
            {filteredDocuments
              .filter((doc) => doc.type === "doc")
              .map((doc) => (
                <Card
                  key={doc.id}
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedDocument?.id === doc.id ? "border-primary" : ""}`}
                  onClick={() => handleDocumentSelect(doc)}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <CardTitle className="text-sm">{doc.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs">{doc.date}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedDocument && (
        <Card className="m-4 mt-0">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Document Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-3 text-xs">
            <p>{selectedDocument.content.substring(0, 100)}...</p>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <Button variant="outline" size="sm" className="w-full">
              <File className="mr-2 h-3 w-3" />
              View Full Document
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
