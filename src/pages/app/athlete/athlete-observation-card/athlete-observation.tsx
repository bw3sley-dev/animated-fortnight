import { removeAthleteObservation } from "@/api/remove-athlete-observation";
import { updateAthleteObservation } from "@/api/update-athlete-observation";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { errorHandler } from "@/error-handler";

import { queryClient } from "@/lib/react-query";

import { getMemberId } from "@/utils/auth/get-member-id";

import { getNameInitials } from "@/utils/get-name-initials";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import { format, formatDistanceToNow } from "date-fns";

import { ptBR } from "date-fns/locale";

import { ChevronDown, Pencil, Trash } from "lucide-react";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";

import { z } from "zod";

interface AthleteObservationProps {
    threads: {
        thread: {
            id: number,

            observations: [
                {
                    id: number,
                    content: string,
                    edited: boolean,
                    createdAt: string,

                    member: {
                        id: string,
                        name: string
                    }
                }
            ],

            createdAt: string
        } | null
    },

    athleteId: string,

    area: string
}

const AthleteObservationSchema = z.object({
    content: z.string().min(1, "O campo de observação não pode estar vazio")
})

type AthleteObservation = z.infer<typeof AthleteObservationSchema>;

export function AthleteObservation({ threads, athleteId, area }: AthleteObservationProps) {
    const [observationId, setObservationId] = useState<number | null>(null);

    const userId = getMemberId();

    const { handleSubmit, control, setValue } = useForm<AthleteObservation>({
        resolver: zodResolver(AthleteObservationSchema),

        defaultValues: { content: "" }
    })

    const { mutateAsync: updateAthleteObservationFn } = useMutation({
        mutationFn: updateAthleteObservation,

        onSuccess: () => {
            toast.success("Observação atualizada com sucesso!");

            queryClient.invalidateQueries({
                queryKey: ["threads", area]
            })

            setObservationId(null);
        }
    })

    const { mutateAsync: removeAthleteObservationFn } = useMutation({
        mutationFn: removeAthleteObservation,

        onSuccess: () => {
            toast.success("Observação removida com sucesso!");

            queryClient.invalidateQueries({
                queryKey: ["threads", area]
            })
        }
    })

    function onEditClick(observationId: number, content: string) {
        setObservationId(observationId);

        setValue("content", content);
    }

    async function onRemoveClick(observationId: number) {
        try {
            await removeAthleteObservationFn({
                athleteId,
                observationId,
                areaName: area
            })        
        }

        catch (error) { errorHandler(error) }
    }

    async function handleUpdateObservation(data: AthleteObservation) {
        try {
            await updateAthleteObservationFn({
                athleteId,
                observationId,

                content: data.content,

                areaName: area
            })
        }

        catch (error) { errorHandler(error) }
    }

    return (
        <details className="border-t border-slate-700 p-4" open>
            <summary className="flex items-center justify-between">
                <strong className="text-md text-slate-200">Observações cadastradas</strong>

                <div className="size-8 cursor-pointer hover:bg-slate-700 flex items-center justify-center transition-colors rounded-md">
                    <ChevronDown className="size-5 text-slate-400" />
                </div>
            </summary>

            <div className="flex flex-col gap-4 py-3 px-1">
                {threads?.thread?.observations.map(observation => (
                    <div key={observation.id} className="group flex gap-4">
                        <div className="size-8 bg-slate-600 border border-slate-700 flex items-center justify-center rounded-full">
                            <span className="text-xs font-semibold">{getNameInitials(observation.member.name)}</span>
                        </div>

                        <div className="bg-slate-800 flex flex-col gap-1 w-full rounded-md px-4 py-3 border border-slate-700">
                            <div className="flex items-center justify-between gap-2 min-h-6">
                                <div className="flex items-center gap-2">
                                    <strong className="text-sm">{observation.member.name}</strong>

                                    <time
                                        title={format(new Date(observation.createdAt), "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })}
                                        dateTime={observation.createdAt}
                                        className="text-xs text-slate-400"
                                    >
                                        {formatDistanceToNow(new Date(observation.createdAt), {
                                            locale: ptBR,
                                            addSuffix: true
                                        })}
                                    </time>

                                    {observation.edited && <span className="text-xs text-slate-400">(editado)</span>}
                                </div>

                                {observation.member.id === userId && (
                                    <div className="hidden group-hover:flex">
                                        <Button type="button" size="icon" className="size-6 rounded-sm" onClick={() => onEditClick(observation.id, observation.content)}>
                                            <Pencil className="size-3.5 text-slate-400" />
                                        </Button>

                                        <Button type="button" size="icon" className="size-6 rounded-sm" onClick={() => onRemoveClick(observation.id)}>
                                            <Trash className="size-3.5 text-red-500" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {observationId === observation.id ? (
                                <form method="POST" onSubmit={handleSubmit(handleUpdateObservation)}>
                                    <Controller
                                        name="content"
                                        control={control}
                                        render={({ field }) => (
                                            <Textarea {...field} className="min-h-fit" />
                                        )}
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button
                                            type="button"
                                            size="xs"
                                            variant="ghost"

                                            onClick={() => setObservationId(null)}
                                        >
                                            Cancelar
                                        </Button>

                                        <Button type="submit" size="xs" variant="primary">
                                            Salvar
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <p className="text-sm text-justify text-slate-300">
                                    {observation.content}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </details>
    )
}