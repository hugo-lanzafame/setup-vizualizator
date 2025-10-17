<script>
  import { Canvas } from "@threlte/core";
  import Panel from "./lib/components/Panel.svelte";
  import Scene from "./lib/components/Scene.svelte";
  import { monitorsStore } from "./lib/stores/monitors";
  import "./styles.css";

  let selectedMonitor = $state($monitorsStore[0]);

  function selectMonitor(monitor) {
    selectedMonitor = monitor;
  }

  // Dynamic hue rotation for primary color
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    document.documentElement.style.setProperty(
      "--color-primary",
      `hsl(${hue}, 100%, 50%)`,
    );
    document.documentElement.style.setProperty(
      "--color-primary-hover",
      `hsl(${hue}, 100%, 20%)`,
    );
  }, 30);
</script>

<main>
  <div class="main-interface">
    <div class="canvas-container">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
    <Panel {selectedMonitor} {selectMonitor} />
  </div>
</main>
