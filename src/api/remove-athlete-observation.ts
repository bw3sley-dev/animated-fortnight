import { api } from "@/lib/axios";

export type RemoveAthleteObservationParams = {
    athleteId: string,
    threadId: number | null,
    observationId: number
}

export async function removeAthleteObservation({ athleteId, threadId, observationId }: RemoveAthleteObservationParams) {
    await api.delete(`/athletes/${athleteId}/threads/${threadId}/observations/${observationId}`);
}