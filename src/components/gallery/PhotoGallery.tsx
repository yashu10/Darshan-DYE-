"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { LabPhoto } from "@/data/lab-photos";

interface PhotoGalleryProps {
  photos: readonly LabPhoto[];
  /** "grid": home page preview (first photo wide). "collage": About page, placed by position. */
  layout: "grid" | "collage";
}

const photoSrc = (photo: LabPhoto) => `/assets/img/lab/${photo.file}`;

/** Photo grid whose pictures open in a full-screen viewer (previous / next, keyboard, Esc to close). */
export function PhotoGallery({ photos, layout }: PhotoGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? undefined : photos[index];

  const show = (next: number) => {
    const wrapped = (next + photos.length) % photos.length;
    setIndex(wrapped);
    // Warm the cache for the picture after this one.
    const upcoming = photos[(wrapped + 1) % photos.length];
    if (upcoming) new window.Image().src = photoSrc(upcoming);
  };

  const open = (event: React.MouseEvent, next: number) => {
    event.preventDefault();
    show(next);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (index === null) return;
    if (event.key === "ArrowRight") show(index + 1);
    if (event.key === "ArrowLeft") show(index - 1);
  };

  return (
    <>
      <div className={layout === "grid" ? "lab-grid reveal" : "lab-collage reveal"}>
        {photos.map((photo, position) => (
          <a
            key={photo.file}
            href={photoSrc(photo)}
            className={layout === "grid" && position === 0 ? "wide" : undefined}
            onClick={(event) => open(event, position)}
          >
            <Image src={photoSrc(photo)} alt={photo.alt} width={photo.width} height={photo.height} />
            <span className="cap">{photo.caption}</span>
          </a>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lb2"
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        onKeyDown={onKeyDown}
      >
        <button type="button" className="lb2-x" aria-label="Close" onClick={() => dialogRef.current?.close()}>
          &times;
        </button>
        <button type="button" className="lb2-n lb2-prev" aria-label="Previous photo" onClick={() => index !== null && show(index - 1)}>
          &#8592;
        </button>
        <figure>
          {current ? <Image src={photoSrc(current)} alt={current.alt} width={current.width} height={current.height} /> : null}
          <figcaption>{current && index !== null ? `${current.caption}  ·  ${index + 1} / ${photos.length}` : ""}</figcaption>
        </figure>
        <button type="button" className="lb2-n lb2-next" aria-label="Next photo" onClick={() => index !== null && show(index + 1)}>
          &#8594;
        </button>
      </dialog>
    </>
  );
}
