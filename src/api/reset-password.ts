import { api } from "@/lib/axios";

export type ResetPasswordBody = {
    code: string,
    password: string
}

export async function resetPassword({ code, password }: ResetPasswordBody) {
    await api.patch("/password/reset", {
        code,
        password
    })
}