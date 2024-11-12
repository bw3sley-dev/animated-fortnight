import { api } from '@/lib/axios'

export type RequestPasswordResetBody = {
  email: string
}

export async function requestPasswordReset({
  email,
}: RequestPasswordResetBody) {
  await api.patch('/password/reset', { email });
}