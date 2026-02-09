import { ReactNode } from "react";
import { DrawerBottom } from "./DrawerBottom";

interface DrawerConfig {
  id: string;
  component: ReactNode;
  title?: string;
  height?: "auto" | "half" | "full";
}

interface DrawerRenderProps {
  activeDrawer: string | null;
  drawers: DrawerConfig[];
  onClose: () => void;
}

export function DrawerRender({ activeDrawer, drawers, onClose }: DrawerRenderProps) {
  const currentDrawer = drawers.find((d) => d.id === activeDrawer);

  return (
    <DrawerBottom
      isOpen={!!activeDrawer}
      onClose={onClose}
      title={currentDrawer?.title}
      height={currentDrawer?.height}
    >
      {currentDrawer?.component}
    </DrawerBottom>
  );
}
