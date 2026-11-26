"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import type { GalleryBlock, GalleryImage } from "@/data/cv-data";
import { getUiCopy } from "@/data/ui-copy";

interface ImageFrameButtonProps {
  image: GalleryImage;
  onSelect: (image: GalleryImage) => void;
  variant: "desktop" | "mobile-showcase" | "mobile-strip";
  showCaption?: boolean;
  sizes: string;
}

function ImageFrameButton({
  image,
  onSelect,
  variant,
  showCaption = true,
  sizes,
}: ImageFrameButtonProps) {
  const frameClassName =
    variant === "desktop"
      ? "relative aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-hairline bg-paper"
      : variant === "mobile-showcase"
        ? "relative mx-auto aspect-[393/852] w-full max-w-[220px] overflow-hidden rounded-[12px] border border-hairline bg-paper"
        : "relative aspect-[393/852] w-full overflow-hidden rounded-[12px] border border-hairline bg-paper";

  const { locale } = useAppPreferences();
  const copy = getUiCopy(locale).gallery;

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => onSelect(image)}
        className={`group block w-full cursor-zoom-in text-left ${frameClassName}`}
        aria-label={copy.expandAria(image.title)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 inline-flex h-7 w-7 items-center justify-center rounded-[2px] border border-hairline bg-paper/90 text-ink opacity-75 shadow-sm backdrop-blur-sm transition-all duration-200 [@media(hover:hover)]:translate-y-0.5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:bg-paper [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100"
        >
          <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </button>
      {showCaption && (
        <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
          <span className="font-medium text-ink">{image.title}</span> — {image.caption}
        </p>
      )}
    </div>
  );
}

interface GalleryRendererProps {
  blocks: GalleryBlock[];
  onOpenLightbox: (image: GalleryImage) => void;
}

export function GalleryRenderer({ blocks, onOpenLightbox }: GalleryRendererProps) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        if (block.type === "hero") {
          return (
            <ImageFrameButton
              key={block.image.id}
              image={block.image}
              onSelect={onOpenLightbox}
              variant="desktop"
              sizes="(max-width: 768px) 100vw, 1088px"
            />
          );
        }

        if (block.type === "pair") {
          return (
            <div key={`pair-${index}`} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {block.images.map((img) => (
                <ImageFrameButton
                  key={img.id}
                  image={img}
                  onSelect={onOpenLightbox}
                  variant="desktop"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              ))}
            </div>
          );
        }

        if (block.type === "responsive-showcase") {
          return (
            <div key={`showcase-${index}`} className="flex flex-col">
              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
                <div className="md:col-span-9">
                  <ImageFrameButton
                    image={block.desktop}
                    onSelect={onOpenLightbox}
                    variant="desktop"
                    showCaption={false}
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                <div className="md:col-span-3">
                  <ImageFrameButton
                    image={block.mobile}
                    onSelect={onOpenLightbox}
                    variant="mobile-showcase"
                    showCaption={false}
                    sizes="(max-width: 768px) 220px, 220px"
                  />
                </div>
              </div>
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted">{block.caption}</p>
            </div>
          );
        }

        if (block.type === "mobile-strip") {
          return (
            <div
              key={`strip-${index}`}
              className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {block.images.map((img) => (
                <ImageFrameButton
                  key={img.id}
                  image={img}
                  onSelect={onOpenLightbox}
                  variant="mobile-strip"
                  sizes="(max-width: 1024px) 45vw, 260px"
                />
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
