/**
 * Renders a JSON-LD <script> tag. Server component — never hydrates.
 * Pass any schema.org object (Organization, Person, FAQPage, etc).
 *
 * GEO/AEO note: structured data is one of the strongest signals for
 * generative-engine and answer-engine indexing. Don't skip this.
 */
type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

export function JsonLd({ data, id }: Props) {
  // Strip undefined values from the payload — JSON.stringify handles it,
  // but explicit graphs read cleaner.
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      id={id}
      // JSON.stringify on plain objects is safe; we don't accept user content here.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
