<script>
  import { T } from "@threlte/core";
  import { OrbitControls, interactivity } from "@threlte/extras";
  import { monitorsStore } from "../stores/monitors";
  import Monitor from "./models/Monitor.svelte";
  import Desk from "./models/Desk.svelte";
  import Keyboard from "./models/Keyboard.svelte";
  import Mouse from "./models/Mouse.svelte";

  interactivity();
</script>

<!-- CAMERA -->
<T.PerspectiveCamera makeDefault position={[0, 8, 15]} fov={60}>
  <OrbitControls enableDamping dampingFactor={0.05} enablePan={true} />
</T.PerspectiveCamera>

<!-- LIGHT -->
<T.AmbientLight intensity={0.8} />
<T.DirectionalLight
  position={[5, 10, 5]}
  intensity={1.2}
  castShadow
  shadow.mapSize.width={2048}
  shadow.mapSize.height={2048}
/>

<T.DirectionalLight
  position={[-5, 8, -3]}
  intensity={0.6}
/>

<!-- CUSTOM MONITORS -->
{#each $monitorsStore as monitor (monitor.id)}
  <Monitor {monitor} />
{/each}

<!-- OTHERS STATIC COMPONENTS -->
<Desk />
<Keyboard />
<Mouse />
