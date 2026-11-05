import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { PRODUCT_CATEGORIES } from "@/data/home";

export function ProductRange() {
  return (
    <section>
      <div className="wrap">
        <SectionHead
          title="Our product range"
          description="Three core families, each available on request in the shade and strength your process needs."
        />
        <div className="cat-cards">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link key={category.title} className="cat reveal" href={category.href}>
              <Image src={category.image.src} alt="" width={category.image.width} height={category.image.height} />
              <div>
                <h3>{category.title}</h3>
                <span>{category.detail} &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
