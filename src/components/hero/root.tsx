import { Montserrat } from "next/font/google"
import Link from "next/link"
import { Button } from "../ui/button"

const font = Montserrat({ subsets: ["latin"], preload: true })

export function Root() {
  return (
    <section className="flex flex-col text-center place-items-center xl:h-[calc(100vh-224px)] 2xl:h-[calc(100vh-352px)] 2xl:max-w-screen-2xl 2xl:mx-auto my-16 2xl:my-32">
      <div className="lg:max-w-screen-lg grid gap-y-8">
        <h1 className="text-5xl font-extrabold leading-tight" style={{ fontFamily: font.style.fontFamily }}>
          Acelere o seu crescimento desbloqueando todo o potencional do seu aplicativo de mensagens!
        </h1>
        <p className="mx-32 text-muted-foreground">
          Seu aplicativo de mensagem não é mais apenas uma forma de comunicação, é uma ferramenta com grande potencial para aumentar as suas vendas!
        </p>
      </div>
      <Link href={"/sign-up"} className="2xl:mt-20">
        <Button className="bg-[#5528ff] hover:bg-[#4822D9] transition-all ease-in-out" size={"lg"}>
          Começar grátis
        </Button>
      </Link>
    </section>
  )
}