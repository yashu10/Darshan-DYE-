import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/data/site";

/** Logo mark plus "Darshan / Dye Chem" wordmark, linking to the home page. */
export function Brand({ ariaLabel }: { ariaLabel?: string }) {
  return (
    <Link className="brand" href={ROUTES.home} aria-label={ariaLabel}>
      <Image src="/assets/img/logo-mark.svg" alt="" width={38} height={38} />
      <span>
        Darshan<small>Dye Chem</small>
      </span>
    </Link>
  );
}
