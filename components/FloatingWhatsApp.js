import FloatingButton from './FloatingButton';
import { PERSONAL_INFO } from '../utils/constants';

export default function FloatingWhatsApp() {
  const message = 'Hi Suleman, I visited your portfolio and would like to connect.';
  const whatsappUrl = `https://wa.me/${PERSONAL_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;

  return (
    <FloatingButton
      position="left"
      href={whatsappUrl}
      icon="fab fa-whatsapp"
      ariaLabel="Chat on WhatsApp"
      tooltipIcon="fab fa-whatsapp text-green-500"
      tooltipText="Chat with me"
      gradientClasses="from-green-400 to-green-600"
      pulseColor="bg-green-500"
      shadowClasses="shadow-green-500/30 hover:shadow-green-500/50"
      ringClasses="focus:ring-green-400/50"
    />
  );
}
