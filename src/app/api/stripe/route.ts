import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import prismaClient from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/configuracoes");

export async function GET(req: NextRequest) {
  const planType = req.nextUrl.searchParams.get("plan_type");
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userSubscription = await prismaClient.userSubscription.findUnique({
      where: { userId: userId }
    })
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    if (planType === "beginner") {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "BRL",
              product_data: {
                name: "Zapgate Iniciante",
                description: "Pacote nível iniciante de mensagens e ferramentas para whastapp"
              },
              unit_amount: 4900,
              recurring: {
                interval: "month"
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          userId,
          level: "BEGINNER"
        }
      })
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    if (planType === "professional") {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "BRL",
              product_data: {
                name: "Zapgate Profissional",
                description: "Pacote nível profissional de mensagens e ferramentas para whastapp"
              },
              unit_amount: 9900,
              recurring: {
                interval: "month"
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          userId,
          level: "PROFESSIONAL"
        }
      })
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    if (planType === "business") {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "BRL",
              product_data: {
                name: "Zapgate Empresa",
                description: "Pacote nível empresa de mensagens e ferramentas para whastapp"
              },
              unit_amount: 14900,
              recurring: {
                interval: "month"
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          userId,
          level: "BUSINESS"
        }
      })
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
  } catch (error: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}