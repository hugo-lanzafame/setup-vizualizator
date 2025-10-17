<script>
  import { T } from '@threlte/core';
  import { monitorsStore } from '../../stores/monitors';
  
  let { monitor } = $props();
  
  const { 
    width, 
    height, 
    bezelThickness, 
    bottomBezelExtra,
    depth,
    baseRadius,
    baseHeight,
    poleRadius,
    armWidth,
    armHeight,
    armDepth
  } = monitor;
  
  // Pole height adapts to screen height
  // Screen bottom is at a fixed height above base
  const targetScreenBottomY = 2.7;  // ← Adjust this for screen height
  const poleHeight = targetScreenBottomY - baseHeight;
  const screenOffsetY = baseHeight + poleHeight;

  function handleClick(event) {
    event.stopPropagation();
    monitorsStore.selectMonitor(monitor.id);
  }
</script>

<T.Group 
  position={[monitor.position.x, monitor.position.y, monitor.position.z]}
  rotation.y={monitor.rotation.y}
>
  <!-- SCREEN GROUP -->
  <T.Group 
    position.y={screenOffsetY + (monitor.screenHeight || 0)}
    rotation.z={(monitor.screenRotation || 0) * (Math.PI / 180)}
  >
    <!-- Main frame -->
    <T.Mesh castShadow>
      <T.BoxGeometry 
        args={[
          width + bezelThickness * 2, 
          height + bezelThickness + bottomBezelExtra, 
          depth
        ]} 
      />
      <T.MeshStandardMaterial 
        color="#1a1a1a" 
        roughness={0.4}
        metalness={0.5}
      />
    </T.Mesh>

    <!-- Active display area -->
    <T.Mesh 
      position.z={depth / 2 + 0.03}
      position.y={bottomBezelExtra / 4}
      onclick={handleClick}
      castShadow
    >
      <T.BoxGeometry args={[width, height, 0.05]} />
      <T.MeshStandardMaterial 
        color={monitor.selected ? "#2a5a8a" : "#0a1a2a"}
        roughness={0.1}
        metalness={0.2}
        emissive={monitor.selected ? "#4a9aff" : "#1a3a5a"}
        emissiveIntensity={monitor.selected ? 0.8 : 0.3}
      />
    </T.Mesh>
    
    <!-- VERTICAL ARM (behind screen) -->
    <T.Mesh 
      position.z={-depth / 2 - armDepth / 2}
      position.y={0}
      castShadow
    >
      <T.BoxGeometry args={[armWidth, armHeight, armDepth]} />
      <T.MeshStandardMaterial 
        color="#2a2a2a"
        roughness={0.3}
        metalness={0.7}
      />
    </T.Mesh>
  </T.Group>

  <!-- STAND POLE (adapts to screen height) -->
  <T.Mesh 
    position.y={baseHeight + poleHeight / 2}
    position.z={-depth / 2 - armDepth}
    castShadow
  >
    <T.CylinderGeometry args={[poleRadius, poleRadius * 1.2, poleHeight, 24]} />
    <T.MeshStandardMaterial 
      color="#1a1a1a"
      roughness={0.3}
      metalness={0.8}
    />
  </T.Mesh>

  <!-- STAND BASE (always at y=0) -->  
  <T.Mesh 
    position.y={baseHeight / 2}
    position.z={-depth + 1.5 / 4 - armDepth}
    castShadow
  >
    <T.CylinderGeometry args={[baseRadius, baseRadius * 1.15, baseHeight, 32]} />
    <T.MeshStandardMaterial 
      color="#0a0a0a"
      roughness={0.4}
      metalness={0.7}
    />
  </T.Mesh>
</T.Group>