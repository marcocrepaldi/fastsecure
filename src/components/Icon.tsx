import {
  Activity, Anchor, Bandage, Bike, Brain, Briefcase, Building, Building2, CalendarCheck, Camera, Car,
  ClipboardCheck, Coins, Construction, Factory, FileCheck, Gavel, GraduationCap, HandCoins, Handshake,
  HardHat, Heart, HeartPulse, House, KeyRound, Landmark, Laptop, Leaf, PawPrint, PiggyBank, Plane,
  Scale, Server, Shield, ShieldAlert, ShieldCheck, Ship, Smile, Sprout, Stethoscope, Ticket, Tractor,
  TrendingUp, Truck, Umbrella, Users, Video, Wallet, Wrench,
  type LucideProps,
} from 'lucide-react';

const icons = {
  activity: Activity, anchor: Anchor, bandage: Bandage, bike: Bike, brain: Brain, briefcase: Briefcase,
  building: Building, building2: Building2, calendar: CalendarCheck, camera: Camera, car: Car,
  clipboard: ClipboardCheck, coins: Coins, construction: Construction, factory: Factory, file: FileCheck,
  gavel: Gavel, graduation: GraduationCap, handcoins: HandCoins, handshake: Handshake, hardhat: HardHat,
  heart: Heart, pulse: HeartPulse, house: House, key: KeyRound, landmark: Landmark, laptop: Laptop,
  leaf: Leaf, paw: PawPrint, piggy: PiggyBank, plane: Plane, scale: Scale, server: Server, shield: Shield,
  shieldAlert: ShieldAlert, shieldCheck: ShieldCheck, ship: Ship, smile: Smile, sprout: Sprout,
  stethoscope: Stethoscope, ticket: Ticket, tractor: Tractor, trending: TrendingUp, truck: Truck,
  umbrella: Umbrella, users: Users, video: Video, wallet: Wallet, wrench: Wrench,
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden="true" strokeWidth={1.75} {...props} />;
}
