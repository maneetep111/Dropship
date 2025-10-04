import {
  ChartPieIcon,
  CubeIcon,
  DocumentDuplicateIcon,
  LifebuoyIcon,
  TruckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { ComponentType, SVGProps } from 'react';

export type IconName =
  | 'ChartPieIcon'
  | 'CubeIcon'
  | 'DocumentDuplicateIcon'
  | 'LifebuoyIcon'
  | 'TruckIcon'
  | 'UserGroupIcon';

const mapping: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  ChartPieIcon,
  CubeIcon,
  DocumentDuplicateIcon,
  LifebuoyIcon,
  TruckIcon,
  UserGroupIcon
};

export function resolveIcon(name: IconName) {
  return mapping[name];
}
