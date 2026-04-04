import React from "react";
import { render, screen } from "@testing-library/react";
import GamingHUD from "./GamingHUD";
import "@testing-library/jest-dom";

describe("GamingHUD Component", () => {
  test("renders level and XP correctly", () => {
    const testLevel = 5;
    const testXP = 1200;
    
    render(<GamingHUD level={testLevel} xp={testXP} />);
    
    // Check if Level is rendered (L05)
    expect(screen.getByText(`L0${testLevel}`)).toBeInTheDocument();
    
    // Check if RANK: ELITE is present
    expect(screen.getByText(/RANK:/)).toBeInTheDocument();
    expect(screen.getByText(/ELITE/)).toBeInTheDocument();
    
    // Check if XP is rendered
    expect(screen.getByText(`${testXP} / ${testLevel * 200}`)).toBeInTheDocument();
  });

  test("renders system monitor units", () => {
    render(<GamingHUD level={1} xp={100} />);
    
    expect(screen.getByText(/THERMAL_CORE/)).toBeInTheDocument();
    expect(screen.getByText(/LOAD_BALANCER/)).toBeInTheDocument();
    expect(screen.getByText(/NET_LATENCY/)).toBeInTheDocument();
  });
});
