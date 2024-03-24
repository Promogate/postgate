import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { S3_ACCESS_KEY, S3_BUCKET_NAME, S3_SECRET_KEY } from "@/config";

const s3Client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  }
})

async function uploadFileToS3(file: any, filename: string) {
  const fileBuffer = file;
  const [user, id, originalFileName] = filename.split("_");
  const key = `${user}_${id}/${Date.now()}_${originalFileName}`;
  const params: PutObjectCommandInput = {
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: "image/*"
  }
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  
  return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const userId = formData.get("userId") as string;
    if (!file) {
      return new NextResponse(JSON.stringify({ error: "File is required!" }), { status: 400 });
    }
    const blob = file.slice();
    const arrayBuffer = await new Response(blob).arrayBuffer();
    const url = await uploadFileToS3(arrayBuffer, userId + "_" + file.name);

    return new NextResponse(JSON.stringify({ success: true, url }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}