import { Armchair, Disc3, Droplets, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../../data/services';

export function ServiceIcon({
  name,
  className = 'w-4 h-4',
}: {
  name: ServiceItem['iconName'];
  className?: string;
}) {
  switch (name) {
    case 'droplets':
      return <Droplets className={className} />;
    case 'armchair':
      return <Armchair className={className} />;
    case 'disc':
      return <Disc3 className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
  }
}
