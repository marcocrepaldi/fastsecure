import Image from 'next/image';

export default function HeroBackdrop({ src, preload = true }: { src: string; preload?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        preload={preload}
        loading={preload ? undefined : 'eager'}
        sizes="100vw"
        className="object-cover object-[79%_center] md:object-[center_42%]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/85 via-38% to-transparent to-80% md:bg-linear-to-r md:from-ink-950/95 md:via-ink-950/70 md:via-52% md:to-ink-950/15 md:to-100%" />
      <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-ink-950/90 to-transparent" />
    </div>
  );
}
