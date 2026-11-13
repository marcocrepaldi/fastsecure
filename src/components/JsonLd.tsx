export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escapa "<" para não fechar a tag <script> se algum texto contiver HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
