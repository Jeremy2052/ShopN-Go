import React from "react";
import Home from "./pages/Home";
import Categories from "../src/components/Categories";
import Footer from "../src/components/Footer";
import Navbar from "../src/components/Navbar";
import NewsLetter from "../src/components/NewsLetter";
import Title from "../src/components/NewsLetter"
import Slider from "../src/components/Slider";
import Wrapper from "../src/components/Slider"
import { shallow } from "enzyme";
import configureStore from "redux-mock-store"
import {render} from "@testing-library/react"
import 'jest-styled-components'


describe("render components", () => {
  const initialState = {products: [],quantity: 0,total: 0,};
  const mockStore = configureStore();
  it("renders Home component without crashing", () => {
    // let store = mockStore(initialState)
    // const {getByText} = render(<Provider store={store}><Navbar /></Provider>);
    shallow(<Home />);
  });
  it("renders Categories component without crashing", () => {
    shallow(<Categories/>)
  });
  it("renders Slider component without crashing", () => {
    const component = shallow(<Slider/>);
    const wrapper = component.find('Wrapper');
    expect(wrapper.length).toBe(1);
    // console.log(wrapper.debug())
  });
  it("Renders NewsLetter component without crashing", () => {
    const component = shallow(<NewsLetter/>);
    const wrapper = component.find('title');
    const title = <h1>News Letter</h1>;
    // console.log(wrapper.debug())
    expect(wrapper.text()).toContain("News Letter");
  });
  test("Renders button of News Letter component", () => {
    const wrapper = shallow(<NewsLetter/>);
    expect(wrapper.find('newsButton').length).toBe(1)
  })
});
