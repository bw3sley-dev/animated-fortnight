import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { TableCell, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { getNameInitials } from "@/utils/get-name-initials";

import { Pencil, Trash2 } from "lucide-react";

import { UpdateMemberDialog } from "./update-member-dialog";

import { Badge } from "@/components/ui/badge";

import { mapRole } from "@/utils/mappings/map-role";
import { mapArea } from "@/utils/mappings/map-area-name";

import { useMutation } from "@tanstack/react-query";

import { removeMember } from "@/api/remove-member";

import { toast } from "sonner";

import { queryClient } from "@/lib/react-query";

interface MemberTableRowsProps {
    member: {
        id: string,
        name: string,
        email: string,
        role: "ADMIN" | "MEMBER",
        phone: string | null,
        areas: ("UNSPECIFIED" | "PSYCHOLOGY" | "PHYSIOTHERAPY" | "NUTRITION" | "NURSING" | "PSYCHOPEDAGOGY" | "PHYSICAL_EDUCATION")[]
    }
}

export function MemberTableRow({ member }: MemberTableRowsProps) {
    const { mutateAsync: removeMemberFn } = useMutation({
        mutationFn: removeMember,

        onSuccess: () => {
            toast.success("Voluntário removido com sucesso!");

            queryClient.invalidateQueries({
                queryKey: ["members"]
            })
        }
    })

    return (
        <TableRow className="group border-b border-slate-700">
            <TableCell>
                <div className="flex gap-4">
                    <div className="size-10 self-center rounded-full flex items-center justify-center border border-slate-700 bg-slate-600">
                        <span className="font-medium">{getNameInitials(member.name)}</span>
                    </div>

                    <div className="flex flex-col gap-.5">
                        <span className="text-slate-200 font-semibold text-md">{member.name}</span>

                        <span className="text-slate-500 text-md">{member.email}</span>
                    </div>

                    <div className="self-center">
                        <Badge className="border-slate-700 bg-slate-800/80 text-slate-300 text-[10px] font-medium">{mapRole(member.role)}</Badge>
                    </div>
                </div>
            </TableCell>

            <TableCell>
                {member.phone}
            </TableCell>

            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="group-hover:flex hidden items-center justify-center">
                            <Button type="button" size="md" variant="link" className="gap-3 p-0">
                                <Pencil className="size-4" />

                                <span>Editar</span>
                            </Button>
                        </div>
                    </DialogTrigger>

                    <UpdateMemberDialog member={member} />
                </Dialog>
            </TableCell>

            <TableCell>
                {mapArea(member.areas)}
            </TableCell>

            <TableCell className="flex justify-center">
                <button 
                    type="button"
                    title="Delete o usuário"
                    onClick={() => removeMemberFn({ memberId: member.id })} 
                    className="border gap-2 size-9 border-slate-800 rounded-md flex items-center justify-center hover:bg-slate-700/60"
                >
                    <Trash2 className="size-4" />
                </button>
            </TableCell>
        </TableRow>
    )
}