-- CreateTable
CREATE TABLE "UserApiLimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "accountLevel" TEXT DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserApiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirector" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT,
    "redirectorLink" TEXT,
    "timesClicked" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'sequential',
    "currentGroup" INTEGER NOT NULL DEFAULT 0,
    "redirectorStatus" TEXT NOT NULL DEFAULT 'started',

    CONSTRAINT "Redirector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "destinationLink" TEXT NOT NULL,
    "members" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 1024,
    "redirectorId" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatstappSession" (
    "id" TEXT NOT NULL,
    "hash" TEXT,
    "userId" TEXT,
    "ownerJid" TEXT,
    "profilePicUrl" TEXT,
    "instance" TEXT NOT NULL,
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatstappSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "scheduleDate" TEXT,
    "userId" TEXT NOT NULL,
    "nodes" TEXT,
    "edges" TEXT,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappChat" (
    "id" TEXT NOT NULL,
    "remoteJid" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "subject" TEXT,
    "description" TEXT,
    "isRestrict" BOOLEAN,
    "isCommunity" BOOLEAN,
    "isCommunityAnnounce" BOOLEAN,
    "owner" TEXT,
    "isRaw" BOOLEAN DEFAULT true,

    CONSTRAINT "WhatsappChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendingList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "instanceId" TEXT,
    "list" TEXT,
    "groupsInfo" TEXT,

    CONSTRAINT "SendingList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApiLimit_userId_key" ON "UserApiLimit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_key" ON "UserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_customer_id_key" ON "UserSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_subscription_id_key" ON "UserSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "WhatstappSession_hash_key" ON "WhatstappSession"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "WhatstappSession_instance_key" ON "WhatstappSession"("instance");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsappChat_remoteJid_key" ON "WhatsappChat"("remoteJid");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_redirectorId_fkey" FOREIGN KEY ("redirectorId") REFERENCES "Redirector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
