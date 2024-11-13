import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const { rive, RiveComponent: RiveComponentScrollText } = useRive({
    src: "scroll-text-2.riv",
    stateMachines: "state-machine",
    artboard: "scroll-text-2",
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const scrollInput1 = useStateMachineInput(
    rive,
    "state-machine",
    "scrollPct 1",
    0
  );
  const scrollInput2 = useStateMachineInput(
    rive,
    "state-machine",
    "scrollPct 2",
    0
  );
  const scrollInput3 = useStateMachineInput(
    rive,
    "state-machine",
    "scrollPct 3",
    0
  );
  const scrollInput4 = useStateMachineInput(
    rive,
    "state-machine",
    "scrollPct 4",
    0
  );

  const riveElementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (riveElementRef.current) {
        const rect = riveElementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate the visibility percentage of the element
        const scrollPercentage = Math.min(
          100,
          Math.max(
            0,
            ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
          )
        );

        // Update Rive input if it exists
        if (scrollInput1 && scrollInput2 && scrollInput3 && scrollInput4) {
          scrollInput4.value = Math.max(scrollPercentage + 0, 0);
          scrollInput3.value = Math.max(scrollPercentage + 10, 0);
          scrollInput2.value = Math.max(scrollPercentage + 15, 0);
          scrollInput1.value = Math.max(scrollPercentage + 20, 0);
        }
      }
    };

    // Attach scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollInput1, scrollInput2, scrollInput3, scrollInput4]);

  return (
    <>
      <div style={{ height: "100vh", textAlign: "center" }}>
        <h1> Scrolla ned!! </h1>
      </div>
      <div style={{ width: "100vw", height: "50vh" }} ref={riveElementRef}>
        <RiveComponentScrollText />
      </div>
      <div style={{ marginTop: "100vh", textAlign: "center" }}>
        <h1> Scrolla upp!! </h1>
      </div>
    </>
  );
}

export default App;
