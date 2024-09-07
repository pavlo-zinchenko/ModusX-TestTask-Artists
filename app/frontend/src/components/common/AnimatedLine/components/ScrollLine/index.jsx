import SAnimatedLine from "./styled";

export default function AnimatedLine({ children, ...props }) {
  return (
    <SAnimatedLine {...props}>
      {children}
    </SAnimatedLine>
  );
}
