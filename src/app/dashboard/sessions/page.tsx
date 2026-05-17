"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { studySessionsApi } from "@/lib/api/study-sessions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { StudySession } from "@/types";

export default function SessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studySessionsApi.getAll()
      .then(setSessions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await studySessionsApi.delete(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch {
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Sessions</h1>
          <p className="text-muted-foreground">
            Manage your study sessions and track your progress.
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/sessions/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <p className="text-muted-foreground">No study sessions yet.</p>
            <Button onClick={() => router.push("/dashboard/sessions/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Create your first session
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.id} className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {session.subject}
                    </p>
                  </div>
                  <Badge variant={session.completed ? "default" : "secondary"}>
                    {session.completed ? "Done" : "Active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {Math.floor(session.duration / 60)}h {session.duration % 60}m
                  </span>
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                {session.notes && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {session.notes}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/dashboard/sessions/${session.id}`)
                    }
                  >
                    <Pencil className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete session</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this study session?
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(session.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
