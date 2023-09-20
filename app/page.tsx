import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-start">
      <div className="text-3xl font-bold text-indigo-500">Hello World</div>
      <Button variant="destructive">Click Me!</Button>
    </div>
  )
}
