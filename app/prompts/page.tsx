import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { PROMPT_PACKS } from "@/lib/prompt-data";

export default function PromptsPage() {
  return (
    <main className="min-h-screen p-8">
      <nav className="mb-8">
        <Link href="/" className="text-2xl font-bold">
          Forge<span className="text-gold">AI</span>
        </Link>
      </nav>
      <h1 className="text-4xl font-bold mb-8">Prompt Store</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {PROMPT_PACKS.map((pack) => (
          <Card key={pack._id}>
            <CardHeader>
              <CardTitle>{pack.name}</CardTitle>
              <CardDescription>{pack.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{formatPrice(pack.price)}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {pack.promptCount} prompts
              </p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Link href={`/prompts/${pack.productId}`} className="w-full">
                <Button variant="gold" className="w-full">View Details</Button>
              </Link>
              <Link href={`/api/checkout?productId=${pack.productId}&type=prompt`} className="w-full">
                <Button variant="outline" className="w-full">Buy Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
