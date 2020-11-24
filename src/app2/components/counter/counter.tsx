import React from "react";
import { connect } from "react-redux";
import { DefaultButton } from "office-ui-fabric-react";
import { IAppState } from "../../../store/store";
import { increment, decrement } from "../../../actions/counter-actions";

interface IProps {
  readonly count: number;
  increment: typeof increment;
  decrement: typeof decrement;
}

const Counter: React.FC<IProps> = ({ count, increment, decrement }) => {
  return (
    <div className="counter">
      <h2>Counter</h2>
      <div>
        <DefaultButton onClick={decrement}>-</DefaultButton>
        <span className="count">{count}</span>
        <DefaultButton onClick={increment}>+</DefaultButton>
      </div>
    </div>
  );
};

function mapStateToProps(state: IAppState) {
  return {
    count: state.count
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    decrement: () => dispatch(decrement()),
    increment: () => dispatch(increment())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
