-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "id" STRING NOT NULL,
    "credentialID" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "credentialPublicKey" STRING NOT NULL,
    "counter" INT4 NOT NULL,
    "credentialDeviceType" STRING NOT NULL,
    "credentialBackedUp" BOOL NOT NULL,
    "transports" STRING,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserApiLimit" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "count" INT4 NOT NULL DEFAULT 0,
    "accountLevel" STRING DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserApiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "stripe_customer_id" STRING,
    "stripe_subscription_id" STRING,
    "stripe_price_id" STRING,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirector" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "userId" STRING,
    "redirectorLink" STRING,
    "timesClicked" INT4 NOT NULL DEFAULT 0,
    "type" STRING NOT NULL DEFAULT 'sequential',
    "currentGroup" INT4 NOT NULL DEFAULT 0,
    "redirectorStatus" STRING NOT NULL DEFAULT 'started',

    CONSTRAINT "Redirector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" STRING NOT NULL,
    "title" STRING,
    "destinationLink" STRING NOT NULL,
    "members" INT4 NOT NULL,
    "limit" INT4 NOT NULL DEFAULT 1024,
    "redirectorId" STRING NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatstappSession" (
    "id" STRING NOT NULL,
    "hash" STRING,
    "userId" STRING,
    "ownerJid" STRING,
    "profilePicUrl" STRING,
    "instanceName" STRING,
    "description" STRING,
    "instance" STRING NOT NULL,
    "isConnected" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatstappSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "isPublished" BOOL NOT NULL DEFAULT false,
    "scheduleDate" STRING,
    "userId" STRING NOT NULL,
    "nodes" STRING,
    "edges" STRING,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappChat" (
    "id" STRING NOT NULL,
    "remoteJid" STRING NOT NULL,
    "instanceId" STRING NOT NULL,
    "subject" STRING,
    "description" STRING,
    "isRestrict" BOOL,
    "isCommunity" BOOL,
    "isCommunityAnnounce" BOOL,
    "owner" STRING,
    "isRaw" BOOL DEFAULT true,

    CONSTRAINT "WhatsappChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendingList" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "name" STRING,
    "instanceId" STRING,
    "list" STRING,
    "groupsInfo" STRING,

    CONSTRAINT "SendingList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

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
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_redirectorId_fkey" FOREIGN KEY ("redirectorId") REFERENCES "Redirector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
