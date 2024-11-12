// import { api } from "@/lib/axios";

export type GetAthleteAnamnesisParams = {
    athleteId: string
}

export type GetAthleteAnamnesisResponse = {
    anamnesis: {
        sections: {
            id: string,
            
            name: string,
            description: string,
            icon: string,

            questions: {
                id: string,

                name: string,

                options?: {
                    id: string,

                    label: string,
                    value: string
                }[]
            }[]
        }[]
    },
    
    athlete: {
        name: string
    }
}

export async function getAthleteAnamnesis({ athleteId }: GetAthleteAnamnesisParams) {
    // const response = await api.get<GetAthleteAnamnesisResponse>(`/athletes/${athleteId}/anamnesis`);

    const response: GetAthleteAnamnesisResponse = {
        anamnesis: {
            sections: [{
                id: crypto.randomUUID(),
                
                name: "Utilizou o nome corretamente",
                description: "Esse utilizou legal",
                icon: "MapPin",
    
                questions: [{
                    id: crypto.randomUUID(),
    
                    name: "sabe de nada",
    
                    options: [{
                        id: crypto.randomUUID(),
                        label: "Não",
                        value: "no"
                    }]
                }]
            }]
        },
        
        athlete: {
            name: "Wesley Bernardes"
        }
    }

    return response;
}