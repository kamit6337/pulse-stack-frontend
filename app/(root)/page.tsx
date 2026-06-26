import { MonitoringItems } from "@/data/mintoringSets";
import Link from "next/link";

export default async function HomePage() {
  return (
    <article className="grid auto-rows-min gap-4 md:grid-cols-3">
      {MonitoringItems.map((item, i) => {
        return (
          <Link href={item.url} key={item.title}>
            <div className="aspect-video rounded-xl bg-muted/50 flex flex-col gap-4 items-center justify-center p-4">
              <p className="-mt-10 font-semibold">{item.title}</p>
              <p className="text-sm">{item.content}</p>
            </div>
          </Link>
        );
      })}
    </article>
  );
}
