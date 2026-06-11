"use client"

import * as React from "react"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Search,
  Star,
} from "lucide-react"

import {
  Alert, AlertTitle, AlertDescription,
  Avatar, AvatarFallback, AvatarImage,
  Badge,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  CatTag,
  Chip,
  Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
  FileChip,
  Input,
  ProgressBar,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  SkeletonTableRow, SkeletonKpiCard,
  Spinner,
  Textarea,
  Toaster, toast,
} from "@/components/ui"
import { Stepper } from "@/components/shared/Stepper"
import type { Step } from "@/types/stepper"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-3 items-center">{children}</div>
    </section>
  )
}

export default function UIDevPage() {
  const [chipActive, setChipActive] = React.useState(false)
  const [catCategory, setCatCategory] = React.useState<"pre-class" | "post-class">("pre-class")

  const mockSteps: Step[] = [
    { id: 1, label: "Upload & Brief", route: "#", state: "completed" },
    { id: 2, label: "Review Outline", route: "#", state: "current" },
    { id: 3, label: "Edit & Publish", route: "#", state: "upcoming" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 bg-gray-50 min-h-screen">
      <Toaster />

      <div>
        <h1 className="text-4xl font-black text-gray-900">UI Component Library</h1>
        <p className="text-gray-500 mt-1">BIT Learning Platform — Design System</p>
      </div>

      {/* BUTTON */}
      <Section title="Button">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="save">Save</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Section>

      {/* BADGE */}
      <Section title="Badge">
        <Badge variant="success" icon={<CheckCircle />}>Delivered</Badge>
        <Badge variant="danger" icon={<XCircle />}>Failed</Badge>
        <Badge variant="warning" icon={<AlertTriangle />}>Pending</Badge>
        <Badge variant="info" icon={<Info />}>Sent</Badge>
        <Badge variant="purple" icon={<Star />}>Acknowledged</Badge>
        <Badge variant="gray">Cancelled</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="danger">Inactive</Badge>
      </Section>

      {/* AVATAR */}
      <Section title="Avatar">
        <div className="flex items-end gap-4">
          <div className="text-center space-y-1">
            <Avatar size="sm">
              <AvatarImage src="" alt="User" />
              <AvatarFallback name="Jean Dupont" />
            </Avatar>
            <p className="text-[10px] text-gray-400">sm (36px)</p>
          </div>
          <div className="text-center space-y-1">
            <Avatar size="md">
              <AvatarImage src="" alt="User" />
              <AvatarFallback name="Marie Claire" />
            </Avatar>
            <p className="text-[10px] text-gray-400">md (40px)</p>
          </div>
          <div className="text-center space-y-1">
            <Avatar size="lg">
              <AvatarImage src="" alt="User" />
              <AvatarFallback name="Robert Smith" />
            </Avatar>
            <p className="text-[10px] text-gray-400">lg (96px)</p>
          </div>
          <div className="text-center space-y-1">
            <Avatar size="md">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback name="With Photo" />
            </Avatar>
            <p className="text-[10px] text-gray-400">with photo</p>
          </div>
        </div>
      </Section>

      {/* INPUT */}
      <Section title="Input">
        <div className="w-full space-y-3 max-w-md">
          <Input placeholder="Standard input — bg-gray-50 at rest" />
          <Input
            leftIcon={<Search />}
            placeholder="With left icon (search)"
          />
          <Input placeholder="Disabled input" disabled />
        </div>
      </Section>

      {/* TEXTAREA */}
      <Section title="Textarea">
        <div className="w-full space-y-3 max-w-md">
          <Textarea placeholder="Auto-resize textarea — no char counter" rows={3} />
          <Textarea
            placeholder="With char counter (max 200)"
            maxCount={200}
            rows={3}
          />
        </div>
      </Section>

      {/* CHIP */}
      <Section title="Chip">
        <Chip
          label="Lecture"
          active={chipActive}
          onClick={() => setChipActive(!chipActive)}
        />
        <Chip
          label="Workshop"
          active={true}
          onRemove={() => alert("Removed!")}
        />
        <Chip label="Lab (inactive)" active={false} />
        <Chip label="Seminar" active={true} />
      </Section>

      {/* CAT TAG */}
      <Section title="CatTag">
        <CatTag
          category={catCategory}
          onClick={() =>
            setCatCategory(catCategory === "pre-class" ? "post-class" : "pre-class")
          }
        />
        <CatTag category="pre-class">Introduction</CatTag>
        <CatTag category="post-class">Exercises</CatTag>
        <p className="w-full text-xs text-gray-400">
          Click the first tag to toggle between Pre-class / Post-class
        </p>
      </Section>

      {/* FILE CHIP */}
      <Section title="FileChip">
        <FileChip type="pdf" filename="course-brief.pdf" size="2.4 MB" />
        <FileChip type="pptx" filename="week-3-slides.pptx" size="8.1 MB" />
        <FileChip type="pdf" filename="very-long-filename-that-gets-truncated.pdf" size="1.2 MB" />
        <FileChip type="pptx" filename="presentation.pptx" />
      </Section>

      {/* PROGRESS BAR */}
      <Section title="ProgressBar">
        <div className="w-full space-y-4 max-w-md">
          <ProgressBar value={0} showLabel label="Not started" />
          <ProgressBar value={40} showLabel label="In progress" />
          <ProgressBar value={100} showLabel label="Completed" />
          <ProgressBar value={65} height="lg" showLabel label="Large track" />
          <ProgressBar value={25} height="sm" label="Small track" showLabel />
        </div>
      </Section>

      {/* STEPPER */}
      <Section title="Stepper">
        <div className="w-full bg-white p-6 rounded-lg border border-gray-200">
          <Stepper steps={mockSteps} />
        </div>
      </Section>

      {/* SKELETON */}
      <Section title="Skeleton">
        <div className="w-full space-y-6">
          <div>
            <p className="text-xs text-gray-400 mb-2">Table rows</p>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              <SkeletonTableRow />
              <SkeletonTableRow columns={3} />
              <SkeletonTableRow />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">KPI cards</p>
            <div className="grid grid-cols-3 gap-4">
              <SkeletonKpiCard />
              <SkeletonKpiCard />
              <SkeletonKpiCard />
            </div>
          </div>
        </div>
      </Section>

      {/* TOAST */}
      <Section title="Toast (Sonner)">
        <Button variant="save" onClick={() => toast.success("Course saved!", "All changes have been persisted.")}>
          Success toast
        </Button>
        <Button variant="danger" onClick={() => toast.error("Upload failed", "The file exceeds the 200MB limit.")}>
          Error toast
        </Button>
        <Button variant="secondary" onClick={() => toast.warning("Unsaved changes", "You have unsaved changes.")}>
          Warning toast
        </Button>
        <Button variant="ghost" onClick={() => toast.info("Processing…", "The AI pipeline is running.")}>
          Info toast
        </Button>
      </Section>

      {/* DIALOG */}
      <Section title="Dialog">
        <Dialog>
          <DialogTrigger render={<Button variant="primary">Open dialog</Button>} />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm deletion</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The course and all its content will be permanently removed.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete <strong>Introduction to Algorithms</strong>?
              </p>
            </DialogBody>
            <DialogFooter showCloseButton>
              <Button variant="danger">Delete course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="secondary">Save dialog</Button>} />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save changes</DialogTitle>
              <DialogDescription>
                Your changes will be saved and published immediately.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This will publish the course to all enrolled students.
              </p>
            </DialogBody>
            <DialogFooter showCloseButton>
              <Button variant="save">Save & publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      {/* CARD */}
      <Section title="Card">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Introduction to Algorithms</CardTitle>
            <CardDescription>Week 3 — Pre-class material</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This module covers sorting algorithms and their time complexities.
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <Badge variant="info">In progress</Badge>
            <Button variant="primary" size="sm">Continue</Button>
          </CardFooter>
        </Card>
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Data Structures</CardTitle>
            <CardDescription>Week 5 — Post-class exercises</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressBar value={80} showLabel label="Completion" />
          </CardContent>
          <CardFooter>
            <Badge variant="success">Completed</Badge>
          </CardFooter>
        </Card>
      </Section>

      {/* ALERT */}
      <Section title="Alert">
        <div className="w-full space-y-3 max-w-lg">
          <Alert variant="success">
            <AlertTitle>Upload successful</AlertTitle>
            <AlertDescription>Your file has been uploaded and is being processed.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Unsaved changes</AlertTitle>
            <AlertDescription>You have unsaved changes. Save before leaving this page.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <AlertTitle>Upload failed</AlertTitle>
            <AlertDescription>The file exceeds the 200MB limit. Please compress and retry.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <AlertTitle>AI pipeline running</AlertTitle>
            <AlertDescription>Content generation takes 2–5 minutes. You will be notified when ready.</AlertDescription>
          </Alert>
        </div>
      </Section>

      {/* SELECT */}
      <Section title="Select">
        <div className="w-full space-y-3 max-w-sm">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="eng">Engineering</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger data-size="sm">
              <SelectValue placeholder="Semester (small)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s1">Semester 1</SelectItem>
              <SelectItem value="s2">Semester 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* SPINNER */}
      <Section title="Spinner">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Button variant="primary" disabled>
          <Spinner size="sm" />
          Processing…
        </Button>
      </Section>

      {/* DARK MODE NOTE */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Dark mode</h2>
        <p className="text-sm text-gray-500">
          Add the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">dark</code> class
          to the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">&lt;html&gt;</code>{" "}
          element to preview dark mode. All tokens and components use CSS custom properties that invert automatically.
        </p>
        <Button
          variant="ghost"
          className="mt-3"
          onClick={() => document.documentElement.classList.toggle("dark")}
        >
          Toggle dark mode
        </Button>
      </section>
    </div>
  )
}
