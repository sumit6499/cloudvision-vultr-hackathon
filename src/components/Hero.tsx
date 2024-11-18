import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, CloudCog, Github, Key, Zap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "./ui/card";

const cards = [
  {
    title: "Upload Infrastructure Image",
    description:
      "Simply upload an image of your desired cloud infrastructure setup.",
    icon: CloudCog,
  },
  {
    title: "Automatic Generation",
    description:
      "Our AI analyzes your image and creates the corresponding infrastructure on Vultr Cloud.",
    icon: Zap,
  },
  {
    title: "Secure Access",
    description:
      "Access your infrastructure securely using API keys or SSH keys.",
    icon: Key,
  },
];

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center py-20 md:py-32 flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Turn Your Vision into Cloud Reality
        </h1>
        <p className="text-lg text-gray-500">
          Upload an image of your cloud infrastructure and {"we'll"} bring it to
          life on Vultr Cloud.
        </p>
        <div className="flex justify-center flex-col md:flex-row gap-4 mt-5">
          <Button
            className="md:w-[200px] bg-white text-black hover:bg-gray-200 hover:text-black"
            asChild
            size="lg"
          >
            <Link href="/upload">
              Get Started <ArrowRight />
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className="md:w-[200px] bg-transparent text-white hover:bg-[#181818] hover:text-white border-[#222222]"
            asChild
            size="lg"
          >
            <Link
              target="_blank"
              href="https://github.com/sumit6499/cloudvision-vultr-hackathon"
            >
              GitHub <Github />
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Card
            className="bg-[#181818] text-white group border-[#222222] hover:border-blue-500 cursor-pointer transition-all duration-300 p-5"
            key={i}
          >
            <CardTitle className="flex items-center gap-2 pb-3">
              <card.icon className="w-6 h-6 group-hover:text-blue-500 transition-all duration-300" />
              <span className="text-lg font-semibold">{card.title}</span>
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Hero;
