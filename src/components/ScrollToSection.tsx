'use client';

import { Button } from "./ui/button";

export const ScrollToSection = ({id, children, size = 'default',className, variant = 'default'}: {id: string, children: React.ReactNode, size?: 'default' | 'sm' | 'lg', className?: string, variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'}) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      };
    return (
        <Button onClick={() => scrollToSection(id)} className={className} size={size}
        variant={variant}
        >
            {children}
        </Button>
    );
};