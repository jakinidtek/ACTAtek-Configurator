import React from 'react';
import { Option } from './types';
import { 
  Users, 
  ScanFace, 
  Fingerprint, 
  CreditCard, 
  Wifi, 
  Globe, 
  Cpu, 
  Video, 
  Thermometer, 
  Phone,
  Layers,
  Zap,
  Radio,
  HardDrive,
  Ban,
  Smartphone
} from 'lucide-react';

export const USER_OPTIONS: Option[] = [
  { id: '1k', label: 'Under 1,000 Users', code: '1K', description: 'Suitable for small businesses', icon: <Users className="w-6 h-6" /> },
  { id: '3k', label: '3,000 Users', code: '3K', description: 'Medium size enterprise', icon: <Users className="w-6 h-6" /> },
  { id: '5k', label: '5,000 Users', code: '5K', description: 'Large capacity requirements', icon: <Users className="w-6 h-6" /> },
  { id: '10k', label: '10,000 Users', code: '10K', description: 'Major enterprise solution', icon: <Users className="w-6 h-6" /> },
  { id: '15k', label: '15,000 Users', code: '15K', description: 'High volume environments', icon: <Users className="w-6 h-6" /> },
  { id: '20k', label: '20,000 Users', code: '20K', description: 'Extended capacity needs', icon: <Users className="w-6 h-6" /> },
  { id: '30k', label: '30,000 Users', code: '30K', description: 'Extended capacity needs. 20K (maximum AutoMatch 1:N users); remaining users are 1:1 match.', icon: <Users className="w-6 h-6" /> },
  { id: '50k', label: '50,000 Users', code: '50K', description: 'Large scale deployment. 20K (maximum AutoMatch 1:N users); remaining users are 1:1 match.', icon: <Users className="w-6 h-6" /> },
  { id: '100k', label: '100,000 Users', code: '100K', description: 'Maximum capacity solution. 20K (maximum AutoMatch 1:N users); remaining users are 1:1 match.', icon: <Users className="w-6 h-6" /> },
];

export const BIOMETRIC_OPTIONS: Option[] = [
  { id: 'face', label: 'Face Recognition', code: 'FA', description: 'Touchless facial authentication', icon: <ScanFace className="w-6 h-6" /> },
  { id: 'finger', label: 'Fingerprint', code: 'FLI', description: 'Biometric fingerprint scanner', icon: <Fingerprint className="w-6 h-6" /> },
  { id: 'none', label: 'No Biometrics', code: '', description: 'Card / PIN Access', icon: <Ban className="w-6 h-6" /> },
];

export const CARD_OPTIONS: Option[] = [
  // Multi-Card Support
  { 
    id: 'sta', 
    label: 'High frequency 13.56 MHz cards', 
    code: 'STa', 
    category: 'multi',
    description: 'HID iClass (CSN only), MiFare Classic, MiFare DesFire EV1/EV2/EV3(Standard), Felica (IDm), CEPAS', 
    icon: <Layers className="w-6 h-6" /> 
  },
  { 
    id: 'su', 
    label: 'Low frequency 125KHz cards', 
    code: 'SU', 
    category: 'multi',
    description: 'HID Prox card, EM', 
    icon: <Layers className="w-6 h-6" /> 
  },
  { 
    id: 'sva', 
    label: 'Universal & Mobile', 
    code: 'SVa', 
    category: 'multi',
    description: 'HID iClass (CSN only), MiFare Classic, MiFare DesFire EV1/EV2/EV3(Standard), Felica (IDm), CEPAS, ISO15693, NFC Tag Type 2/Type 4 (Android), HID Prox card, EM card', 
    icon: <Smartphone className="w-6 h-6" /> 
  },
  { 
    id: 'sxa', 
    label: 'Low & High frequency cards', 
    code: 'SXa', 
    category: 'multi',
    description: 'HID iClass (CID), MiFare Classic, MiFare DesFire EV1/EV2/EV3(Standard), Felica (IDm), HID Prox card, EM card', 
    icon: <HardDrive className="w-6 h-6" /> 
  },

  // Single Technology
  { id: 'sm', label: 'MiFare with ACTAtek encryption Key', code: 'SM', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'sma', label: 'MiFare with Open-All-Key', code: 'SMa', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'sh2ma', label: 'MiFare DesFire EV1/EV2/EV3(Standard)', code: 'SH2Ma', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'se', label: 'EM', code: 'SE', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'shp', label: 'HID Proximity', code: 'SHp', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'shi', label: 'HID iClass with ACTAtek encryption key', code: 'SHi', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'shia', label: 'HID iClass with Open-All-Key', code: 'SHia', category: 'single', icon: <CreditCard className="w-6 h-6" /> },
  { id: 'sir', label: 'UHF / UHF Combo', code: 'SiR', category: 'single', icon: <Radio className="w-6 h-6" /> },
];

export const NETWORK_OPTIONS: Option[] = [
  { id: 'lan', label: 'LAN', code: '', description: 'Standard Ethernet connection', icon: <Cpu className="w-6 h-6" /> },
  { id: 'poe', label: 'PoE (Power over Ethernet)', code: 'P', description: 'Power and data over single cable', icon: <Zap className="w-6 h-6" /> },
  { id: 'wifi', label: 'Wi-Fi', code: 'W', description: 'Wireless connectivity', icon: <Wifi className="w-6 h-6" /> },
  { id: 'mobile', label: 'Mobile Network', code: 'W3', description: 'Cellular network support (3G/4G/5G)', icon: <Globe className="w-6 h-6" /> },
];

export const FEATURE_OPTIONS: Option[] = [
  { 
    id: 'intercom', 
    label: 'VoIP Intercom', 
    code: 'I', 
    description: 'SIP protocol for audio communication', 
    icon: <Phone className="w-6 h-6" /> 
  },
  { 
    id: 'camera', 
    label: 'Built-in CMOS Video Camera', 
    code: 'C', 
    description: 'QR-Code, Snapshot, Video Streaming for the integration with VMS (Video Surveillance)', 
    icon: <Video className="w-6 h-6" /> 
  },
  { 
    id: 'temp', 
    label: 'Body Temperature', 
    code: 'TEMSEN', 
    description: 'External body temperature sensor', 
    icon: <Thermometer className="w-6 h-6" /> 
  },
];

export const STEPS = [
  { id: 0, title: 'Users', subtitle: 'Select Capacity' },
  { id: 1, title: 'Biometrics', subtitle: 'Authentication Method' },
  { id: 2, title: 'Card', subtitle: 'Smart Card Type' },
  { id: 3, title: 'Network', subtitle: 'Connectivity' },
  { id: 4, title: 'Features', subtitle: 'Optional Add-ons' },
];