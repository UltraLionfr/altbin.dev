-- CreateTable
CREATE TABLE "Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "password" TEXT,
    "maxViews" INTEGER,
    "views" INTEGER NOT NULL DEFAULT 0,
    "size" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT
);
