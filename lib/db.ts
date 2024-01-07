// Importing the PrismaClient class from the Prisma library
import { PrismaClient } from "@prisma/client";

// Declaration of the global variable 'prisma', which can hold a PrismaClient object or be undefined
declare global {
    var prisma: PrismaClient | undefined;
}

// Initializing the database: db takes an existing prisma object or creates a new PrismaClient object
export const db = globalThis.prisma || new PrismaClient();

// If not in production mode, set the global prisma object to the db object 
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// In development mode, setting the global prisma object to db for reusing the connection.
// In production mode, db will be used on a per-request basis.

//globalThis is excluded from hot reloading, so the global prisma object will be preserved between reloads