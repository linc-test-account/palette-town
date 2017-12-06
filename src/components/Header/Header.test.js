import Header from "./Header";

import React from 'react';
import { shallow } from "enzyme";

describe("Header", () => {
  let props;
  beforeEach(() => {
    props = {
        toggleSideNav: jest.fn(),
        modalHandleClick: jest.fn(),
        dataStore: { palette: {}} 
    };
  });
  it("should render correctly", () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
