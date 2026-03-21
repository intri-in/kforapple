import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
const statement = { 
    ...defaultStatements, 
    quiz: ["get", "create", "share", "update", "delete"], 
    manager: ["get", "create", "share", "update", "delete", "set-password"], 
} as const; 

export const ac = createAccessControl(statement); 

export const admin = ac.newRole({ 
    quiz: ["create", "share", "update", "delete"], 
    manager: ["get", "create", "share", "update", "delete", "set-password"], 
    ...adminAc.statements
}); 
export const manager = ac.newRole({ 
    quiz: ["create", "share", "update", "delete"], 
    user: ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"]
}); 

export const user = ac.newRole({ 
    quiz: ["create", "share", "update", "delete"], 
}); 
