import apiClient from "./client";
import type {
  FlashcardDeck,
  Flashcard,
  CreateFlashcardDeckPayload,
  CreateFlashcardPayload,
} from "@/types";

export const flashcardsApi = {
  getDecks: async (): Promise<FlashcardDeck[]> => {
    const { data } = await apiClient.get<FlashcardDeck[]>("/flashcards/decks");
    return data;
  },

  getDeckById: async (id: string): Promise<FlashcardDeck> => {
    const { data } = await apiClient.get<FlashcardDeck>(
      `/flashcards/decks/${id}`
    );
    return data;
  },

  createDeck: async (
    payload: CreateFlashcardDeckPayload
  ): Promise<FlashcardDeck> => {
    const { data } = await apiClient.post<FlashcardDeck>(
      "/flashcards/decks",
      payload
    );
    return data;
  },

  deleteDeck: async (id: string): Promise<void> => {
    await apiClient.delete(`/flashcards/decks/${id}`);
  },

  getCards: async (deckId: string): Promise<Flashcard[]> => {
    const { data } = await apiClient.get<Flashcard[]>(
      `/flashcards/decks/${deckId}/cards`
    );
    return data;
  },

  createCard: async (
    payload: CreateFlashcardPayload
  ): Promise<Flashcard> => {
    const { data } = await apiClient.post<Flashcard>(
      `/flashcards/decks/${payload.deckId}/cards`,
      payload
    );
    return data;
  },

  deleteCard: async (deckId: string, cardId: string): Promise<void> => {
    await apiClient.delete(
      `/flashcards/decks/${deckId}/cards/${cardId}`
    );
  },
};
