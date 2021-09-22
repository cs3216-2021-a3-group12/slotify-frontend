import { Fragment } from "react";

interface SegmentPanelProps {
  value: string;
  selected: string;
  children?: React.ReactNode;
}

function SegmentPanel({ value, selected, children }: SegmentPanelProps) {
  return <Fragment>{selected === value && children}</Fragment>;
}

export default SegmentPanel;
