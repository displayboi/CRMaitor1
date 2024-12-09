-- CreateTable
CREATE TABLE "citas" (
    "fecha" DATE NOT NULL,
    "texto" VARCHAR(500) NOT NULL,
    "userId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id")
);
