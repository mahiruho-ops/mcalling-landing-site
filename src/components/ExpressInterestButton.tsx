'use client';
import { Button } from "./ui/button";
export const ExpressInterestButton = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex justify-center">
      <Button onClick={() => scrollToSection("interest")} className="bg-gradient-primary hover:shadow-glow-primary transition-all">
        Schedule a Demo
      </Button>
    </div>
  );
};