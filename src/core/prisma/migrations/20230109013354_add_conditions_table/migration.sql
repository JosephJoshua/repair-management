-- CreateTable
CREATE TABLE "conditions" (
    "condition_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "conditions_pkey" PRIMARY KEY ("condition_id")
);

-- CreateIndex
CREATE INDEX "conditions_name_idx" ON "conditions" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "conditions_store_id_created_at_idx" ON "conditions"("store_id", "created_at");

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
