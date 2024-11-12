import { api } from "@/lib/axios";

export type CreateAthleteThreadBody = {
    athleteId: string,
    content: string,
    area: string
}

export async function createAthleteThread({ athleteId, content, area }: CreateAthleteThreadBody) {
    await api.post(`/athletes/${athleteId}/areas/${area}/thread/observations`, { content });
}