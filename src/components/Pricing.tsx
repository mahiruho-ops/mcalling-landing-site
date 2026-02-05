// import { Badge } from "./ui/badge";

// export const Pricing = () => {
//   return (
//     <section id="pricing" className="py-24 relative">
//       <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
//       <div className="container mx-auto px-6 relative">
//         <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
//           <div className="space-y-4">
//             <h2 className="text-4xl md:text-5xl font-bold">Transparent beta pricing</h2>
//             <div className="grid md:grid-cols-3 gap-4 text-left">
//               {[{ name: 'Starter (Beta)', price: 'from $499/month' }, { name: 'Growth', price: 'from $1,999/month' }, { name: 'Enterprise', price: 'Custom' }].map((tier, i) => (
//                 <div key={i} className="p-6 rounded-xl bg-card/50 border border-primary/20">
//                   <div className="text-lg font-semibold mb-1">{tier.name}</div>
//                   <div className="text-sm text-muted-foreground">{tier.price}</div>
//                 </div>
//               ))}
//             </div>
//             <p className="text-sm text-muted-foreground">Beta pricing includes priority onboarding; SLAs limited during beta.</p>
//             <div className="flex items-center justify-center gap-3 pt-2">
//               <a href="#interest" className="inline-flex px-5 py-3 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all">Contact us for pricing</a>
//               <a href="#interest" className="inline-flex px-5 py-3 rounded-lg border border-primary/30 hover:border-primary/60 hover:bg-card/50 transition-all">Join waitlist</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Badge } from "./ui/badge";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Enterprise Release
            </h2>
            <div className="inline-block p-8 rounded-2xl bg-card/50 border border-primary/30 backdrop-blur-sm">
              <p className="text-6xl font-bold gradient-text-primary mb-4">
                16<sup className="gradient-text-primary text-4xl">th</sup> January 2026
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
