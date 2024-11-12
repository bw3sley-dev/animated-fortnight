import { removeAthlete } from "@/api/remove-athlete";

import { TableCell, TableRow } from "@/components/ui/table";

import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from "@/components/ui/tooltip";

import { errorHandler } from "@/error-handler";

import { mapBloodType } from "@/utils/mappings/map-blood-type";
import { mapGender } from "@/utils/mappings/map-gender";
import { mapHandedness } from "@/utils/mappings/map-handedness";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Search, Trash2 } from "lucide-react";

import { Link } from "react-router-dom";

import { toast } from "sonner";

interface AthleteTableRowProps {
    athlete: {
        id: string,
        name: string,
        age: number,
        birthDate: string,
        handedness: "RIGHT" | "LEFT",
        gender: "MALE" | "FEMALE",
        bloodType:
            "A_POSITIVE" |
            "A_NEGATIVE" |
            "B_POSITIVE" |
            "B_NEGATIVE" |
            "AB_POSITIVE" |
            "AB_NEGATIVE" |
            "O_POSITIVE" |
            "O_NEGATIVE"
    }
}

export function AthleteTableRow({ athlete }: AthleteTableRowProps) {
    const queryClient = useQueryClient();
    
    const { mutateAsync: removeAthleteFn } = useMutation({
        mutationFn: removeAthlete,

        onSuccess: () => {
            toast.success("Atleta removido com sucesso!");

            queryClient.invalidateQueries({
                queryKey: ["athletes"]
            })
        }
    })

    async function handleAthleteRemotion(athleteId: string) {
        try {
            await removeAthleteFn({ athleteId });
        }

        catch (error) { errorHandler(error) }
    }

    return (
        <TableRow>
            <TableCell className="flex items-center justify-center">
                <Link 
                    to={`/athletes/${athlete.id}`}
                    className="size-9 border cursor-pointer border-slate-700 flex-shrink-0 rounded-md flex items-center justify-center hover:bg-slate-700/60"
                >
                    <Search className="size-4" /> 
                </Link>
            </TableCell>

            <TableCell>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-300">{athlete.name}</span>
                </div>
            </TableCell>

            <TableCell className="text-slate-300">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <time dateTime={athlete.birthDate}>
                                {athlete.age} anos
                            </time>
                        </TooltipTrigger>

                        <TooltipContent>Nascido em {athlete.birthDate}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
                
            </TableCell>

            <TableCell className="text-slate-300">{mapHandedness(athlete.handedness)}</TableCell>

            <TableCell className="text-slate-300">{mapGender(athlete.gender)}</TableCell>

            <TableCell className="text-slate-300">{mapBloodType(athlete.bloodType)}</TableCell>

            <TableCell className="">
                <button 
                    type="button"
                    title="Delete o usuário" 
                    className="border gap-2 size-9 border-slate-800 rounded-md flex items-center justify-center hover:bg-slate-700/60"

                    onClick={() => handleAthleteRemotion(athlete.id)}
                >
                    <Trash2 className="size-4" />
                </button>
            </TableCell>
        </TableRow>
    )
}