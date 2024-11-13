export type Role = keyof typeof ROLES;

export type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    ADMIN: [
        "view:members",
    ],
    VOLUNTEER: [
        "create:observation"
    ]
} as const

export function hasPermission(user: { id: string, role: Role }, permission: Permission) {
    return (ROLES[user.role] as readonly Permission[]).includes(permission);
}