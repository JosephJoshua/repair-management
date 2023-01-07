-- CreateTable
CREATE TABLE "damages" (
    "damage_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "damages_pkey" PRIMARY KEY ("damage_id")
);

-- CreateIndex
CREATE INDEX "damages_name_idx" ON "damages" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "damages_store_id_created_at_idx" ON "damages"("store_id", "created_at");

-- AddForeignKey
ALTER TABLE "damages" ADD CONSTRAINT "damages_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
