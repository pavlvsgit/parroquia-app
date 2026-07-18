import { Target, ClipboardList, DoorOpen, BookOpenText, Users, Flag, ArrowRight, FileText } from "lucide-react";

// A lookup-table `const Icon = pick(title); <Icon />` pattern trips the
// react-compiler "static components" rule (it can't tell the picked value
// is always one of a fixed set of module-level components). Branching to a
// statically-referenced JSX tag per case avoids that.
export function SectionIcon({ title, ...props }) {
  if (/^objetivo/i.test(title)) return <Target {...props} />;
  if (/^antes de empezar/i.test(title)) return <ClipboardList {...props} />;
  if (/^apertura/i.test(title)) return <DoorOpen {...props} />;
  if (/^desarrollo/i.test(title)) return <BookOpenText {...props} />;
  if (/^actividad/i.test(title)) return <Users {...props} />;
  if (/^cierre/i.test(title)) return <Flag {...props} />;
  if (/^para la pr[oó]xima/i.test(title)) return <ArrowRight {...props} />;
  return <FileText {...props} />;
}
