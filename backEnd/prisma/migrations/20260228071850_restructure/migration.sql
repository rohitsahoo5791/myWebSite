/*
  Warnings:

  - You are about to drop the column `demoUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `sprintId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Sprint` table. All the data in the column will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `curriculumId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Sprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_sprintId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_sprintId_fkey";

-- DropForeignKey
ALTER TABLE "Sprint" DROP CONSTRAINT "Sprint_curriculumId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "demoUrl",
DROP COLUMN "githubUrl",
DROP COLUMN "sprintId",
ADD COLUMN     "curriculumId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sprint" DROP COLUMN "curriculumId",
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "sprintNumber" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- DropTable
DROP TABLE "Blog";

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT,
    "sprintId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
