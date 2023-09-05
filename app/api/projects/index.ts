import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { createZipFolder } from "@/app/core/utils/assets";
import s3Client from "@/app/core/clients/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import replicateClient from "@/app/core/clients/replicate";
import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const db = globalThis.db || new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await new PrismaClient({  });

  if (!session?.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.method === "POST") {
    const urls = req.body.urls as string[];
    const studioName = req.body.studioName as string;
    const instanceClass = req.body.instanceClass as string;

    const project = await prismadb.project.create({
      data: {
        imageUrls: urls,
        name: studioName,
        user: session.user,
        modelStatus: "not_created",
        instanceClass: instanceClass || "person",
        instanceName: process.env.NEXT_PUBLIC_REPLICATE_INSTANCE_TOKEN!,
        credits: Number(process.env.NEXT_PUBLIC_STUDIO_SHOT_AMOUNT) || 50,
      },
    });

    const buffer = await createZipFolder(urls, project);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_UPLOAD_BUCKET!,
        Key: `${project.id}.zip`,
        Body: buffer,
      })
    );

    return res.json({ project });
  }

  if (req.method === "GET") {
    const projects = await prismadb.project.findMany({
      where: { userId: session.user },
      include: { shots: { take: 10, orderBy: { createdAt: "desc" } } },
      orderBy: { createdAt: "desc" },
    });

    for (const project of projects) {
      if (project?.replicateModelId && project?.modelStatus !== "succeeded") {
        const { data } = await replicateClient.get(
          `/v1/trainings/${project.replicateModelId}`
        );

        await prismadb.project.update({
          where: { id: project.id },
          data: { modelVersionId: data.version, modelStatus: data?.status },
        });
      }
    }

    return res.json(projects);
  }
};

export default handler;
