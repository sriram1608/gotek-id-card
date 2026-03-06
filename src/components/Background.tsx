import { motion } from 'motion/react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700">
      <CleanCorporateBackground />
    </div>
  );
}

function CleanCorporateBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Geometric grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Subtle curves */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border-[60px] border-blue-100/50 blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-50/80 blur-3xl"></div>
      </div>
    </div>
  );
}
