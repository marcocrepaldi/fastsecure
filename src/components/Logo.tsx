import Image from 'next/image';
import logoDark from '../../public/brand/logo-fastsecure-dark.png';
import logoLight from '../../public/brand/logo-fastsecure-light.png';

/**
 * Logo oficial da Fast Secure.
 * - variante padrão: "Fast" em branco, para fundos escuros (header, menu, rodapé);
 * - `dark`: "Fast" em preto, para fundos claros.
 * Arquivos gerados a partir dos originais em public/images (margem removida).
 */
export default function Logo({ dark = false, priority = false, className = 'h-9' }: { dark?: boolean; priority?: boolean; className?: string }) {
  return (
    <Image
      src={dark ? logoLight : logoDark}
      alt="Fast Secure"
      priority={priority}
      className={`${className} w-auto`}
      sizes="180px"
    />
  );
}
