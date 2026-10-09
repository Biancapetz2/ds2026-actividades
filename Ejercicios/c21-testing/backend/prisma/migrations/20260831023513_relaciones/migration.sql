/*
  Warnings:

  - You are about to drop the column `autor` on the `Libro` table. All the data in the column will be lost.
  - Added the required column `autorId` to the `Libro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Libro" DROP COLUMN "autor",
ADD COLUMN     "autorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Categoría" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoría_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoríaToLibro" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoríaToLibro_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoría_nombre_key" ON "Categoría"("nombre");

-- CreateIndex
CREATE INDEX "_CategoríaToLibro_B_index" ON "_CategoríaToLibro"("B");

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoríaToLibro" ADD CONSTRAINT "_CategoríaToLibro_A_fkey" FOREIGN KEY ("A") REFERENCES "Categoría"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoríaToLibro" ADD CONSTRAINT "_CategoríaToLibro_B_fkey" FOREIGN KEY ("B") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
