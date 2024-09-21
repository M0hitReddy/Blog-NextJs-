/*
  Warnings:

  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Section` DROP FOREIGN KEY `Section_postId_fkey`;

-- DropTable
DROP TABLE `Section`;
