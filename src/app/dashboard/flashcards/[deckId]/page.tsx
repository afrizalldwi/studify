"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { flashcardsApi } from "@/lib/api/flashcards";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ChevronLeft } from "lucide-react";
import type { FlashcardDeck, Flashcard } from "@/types";

export default function DeckDetailPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.deckId as string;

  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      flashcardsApi.getDeckById(deckId),
      flashcardsApi.getCards(deckId),
    ])
      .then(([deckData, cardsData]) => {
        setDeck(deckData);
        setCards(cardsData);
      })
      .catch(() => router.push("/dashboard/flashcards"))
      .finally(() => setLoading(false));
  }, [deckId, router]);

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const card = await flashcardsApi.createCard({
        deckId,
        question: newQuestion,
        answer: newAnswer,
        difficulty: newDifficulty,
      });
      setCards((prev) => [...prev, card]);
      setNewQuestion("");
      setNewAnswer("");
      setNewDifficulty("medium");
      setDialogOpen(false);
    } catch {
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      await flashcardsApi.deleteCard(deckId, cardId);
      setCards((prev) => prev.filter((c) => c.id !== cardId));
    } catch {
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!deck) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/flashcards")}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{deck.title}</h1>
          {deck.description && (
            <p className="text-muted-foreground">{deck.description}</p>
          )}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateCard}>
              <DialogHeader>
                <DialogTitle>Add Flashcard</DialogTitle>
                <DialogDescription>
                  Create a new card for this deck.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="What is the capital of France?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    placeholder="Paris"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={newDifficulty}
                    onValueChange={(v: "easy" | "medium" | "hard") =>
                      setNewDifficulty(v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating ? "Adding..." : "Add Card"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-sm text-muted-foreground">
        Click on a card to reveal the answer.
      </p>

      {cards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <p className="text-muted-foreground">No cards in this deck yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.id} className="relative">
              <button
                type="button"
                onClick={() =>
                  setFlippedId(flippedId === card.id ? null : card.id)
                }
                className="w-full text-left"
              >
                <Card
                  className={`min-h-[160px] cursor-pointer transition-all hover:shadow-md ${
                    flippedId === card.id ? "border-primary" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="capitalize">
                        {card.difficulty || "medium"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCard(card.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardTitle className="mt-2 text-base">
                      {flippedId === card.id ? card.answer : card.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      {flippedId === card.id
                        ? "Click to see question"
                        : "Click to reveal answer"}
                    </p>
                  </CardContent>
                </Card>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
