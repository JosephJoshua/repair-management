/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
