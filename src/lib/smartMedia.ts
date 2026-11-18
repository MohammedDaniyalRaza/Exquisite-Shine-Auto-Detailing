export type AspectRatioPreset = '16/9' | '4/3' | '3/2' | '1/1' | '16/10';

export function getAspectClass(ratio: AspectRatioPreset = '4/3'): string {
  switch (ratio) {
    case '16/9':
      return 'aspect-video';
    case '16/10':
      return 'aspect-[16/10]';
    case '3/2':
      return 'aspect-[3/2]';
    case '1/1':
      return 'aspect-square';
    case '4/3':
    default:
      return 'aspect-[4/3]';
  }
}

export function buildMailtoQuoteHref(params: {
  email: string;
  name?: string;
  phone?: string;
  vehicle?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
}): string {
  const subject = `Quote Request${params.vehicle ? ` — ${params.vehicle}` : ''} | Exquisite Shine Auto Detailing`;
  const lines = [
    'Hello Travi G,',
    '',
    'I would like to request a free detailing quote:',
    `Name: ${params.name || 'Not provided'}`,
    `Phone: ${params.phone || 'Not provided'}`,
    `Vehicle (Year / Make / Model): ${params.vehicle || 'Not provided'}`,
    `Service: ${params.service || 'Not sure yet'}`,
    `Preferred Date: ${params.preferredDate || 'Flexible'}`,
    '',
    'Notes:',
    params.message || 'No additional notes.',
  ];

  return `mailto:${params.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
