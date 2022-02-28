import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import '@testing-library/jest-dom';
import ErrorBoundary from "./error-boundary";

describe("Error Boundary Test Suite", () => {
  it("should render and show its children", () => {
    const component = shallow(
      <ErrorBoundary>
        <p>children</p>
      </ErrorBoundary>
    );
    expect(component).toHaveLength(1);
    const p = component.find("p");
    expect(p).toHaveLength(1);
    expect(p.text()).toBe("children");
  });

  it("should render and an error", () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const ThrowError = () => {
      throw new Error("Test");
    };
    render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
  
      expect(screen.getByTestId('error-boundary')).toBeVisible();
  });
});
