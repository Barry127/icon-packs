import { AllHTMLAttributes, SVGProps } from 'react';

export interface Icon {
  tag: keyof JSX.IntrinsicElements;
  attrs: AllHTMLAttributes<any> | SVGProps<any>;
  children?: this[] | string;
}
