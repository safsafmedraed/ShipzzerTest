import X from "./svgLetters/X";
import O from "./svgLetters/O";
const Squares = (props) => {
  return (
    <div className="square " {...props}>
      {props.x ? <X /> : props.o ? <O /> : ""}
    </div>
  );
};
export default Squares;
