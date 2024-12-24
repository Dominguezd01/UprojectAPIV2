-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "userUuid" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "boards" (
    "boardId" SERIAL NOT NULL,
    "boardUuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("boardId")
);

-- CreateTable
CREATE TABLE "lists" (
    "listId" SERIAL NOT NULL,
    "listUuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("listId")
);

-- CreateTable
CREATE TABLE "cards" (
    "cardId" SERIAL NOT NULL,
    "cardUuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "startDate" TEXT,
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "cards_pkey" PRIMARY KEY ("cardId")
);

-- CreateTable
CREATE TABLE "listcard" (
    "listCardId" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listcard_pkey" PRIMARY KEY ("listCardId")
);

-- CreateTable
CREATE TABLE "boardlist" (
    "boardListId" SERIAL NOT NULL,
    "boardId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,

    CONSTRAINT "boardlist_pkey" PRIMARY KEY ("boardListId")
);

-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "roleDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "boardsuser" (
    "boardUserId" SERIAL NOT NULL,
    "boardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boardsuser_pkey" PRIMARY KEY ("boardUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userUuid_key" ON "users"("userUuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "boards_boardUuid_key" ON "boards"("boardUuid");

-- CreateIndex
CREATE UNIQUE INDEX "lists_listUuid_key" ON "lists"("listUuid");

-- CreateIndex
CREATE UNIQUE INDEX "cards_cardUuid_key" ON "cards"("cardUuid");

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listcard" ADD CONSTRAINT "listcard_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("listId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listcard" ADD CONSTRAINT "listcard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("cardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardlist" ADD CONSTRAINT "boardlist_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardlist" ADD CONSTRAINT "boardlist_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("listId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardsuser" ADD CONSTRAINT "boardsuser_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardsuser" ADD CONSTRAINT "boardsuser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardsuser" ADD CONSTRAINT "boardsuser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
