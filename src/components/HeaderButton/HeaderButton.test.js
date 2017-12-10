import HeaderButton from "./HeaderButton";

import React from "react";
import { shallow } from "enzyme";

describe("HeaderButton", () => {
  let props;
  beforeEach(() => {
    props = {
      btnFunction: jest.fn(),
      fontAwesomeIcon: "exampleIcon",
      overlayValue: 1,
      isActive: true
    };
  });
  
  it("should render active", () => {
    const wrapper = shallow(<HeaderButton {...props} isActive={true} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it("should render in-active", () => {
    const wrapper = shallow(<HeaderButton {...props} isActive={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it("should call when clicked", () => {

    const wrapper = shallow(<HeaderButton {...props} isActive={false} />);
    
    wrapper.find('button').simulate('click');

    expect(props.btnFunction).toHaveBeenCalledTimes(1);
  })
});
