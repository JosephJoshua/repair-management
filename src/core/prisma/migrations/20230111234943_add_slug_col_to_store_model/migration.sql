/*
  Warnings:

  - Added the required column `slug` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "slug" TEXT NOT NULL;
