<script>
  import { T } from '@threlte/core';
  
  let { position = { x: 2.6, y: 0, z: 3.42 }, rotation = { y: 0 } } = $props();
  
  // Mouse dimensions (realistic scale)
  const mouseWidth = 0.6;    // ~6cm width
  const mouseLength = 0.9;   // ~11cm length
  const mouseHeight = 0.15;   // ~3.8cm height
  
  // Mouse pad dimensions
  const padWidth = 2.8;       // ~25cm width
  const padLength = 2;      // ~30cm length
  const padHeight = 0.01;     // ~2.5mm thickness
</script>

<T.Group 
  position={[position.x, position.y, position.z]}
  rotation.y={rotation.y}
>
  <!-- Mouse pad -->
  <T.Mesh 
    castShadow 
    receiveShadow 
    position={[0, padHeight / 2, 0]}
  >
    <T.BoxGeometry args={[padWidth, padHeight, padLength]} />
    <T.MeshStandardMaterial 
      color="#1a1a2e" 
      roughness={0.2} 
      metalness={0.0}
    />
  </T.Mesh>
  
  <!-- Mouse pad surface (gaming style with subtle pattern) -->
  <T.Mesh 
    position={[0, padHeight + 0.001, 0]}
    rotation.x={-Math.PI / 2}
  >
    <T.PlaneGeometry args={[padWidth * 0.95, padLength * 0.95]} />
    <T.MeshStandardMaterial 
      color="#0f0f23" 
      roughness={0.1} 
      metalness={0.1}
      transparent={true}
      opacity={0.9}
    />
  </T.Mesh>
  
  <!-- Mouse pad edges (stitched border) -->
  <!-- Top edge -->
  <T.Mesh position={[0, padHeight + 0.002, -padLength/2 + 0.01]}>
    <T.BoxGeometry args={[padWidth * 0.98, 0.002, 0.02]} />
    <T.MeshStandardMaterial color="#444455" roughness={0.8} />
  </T.Mesh>
  
  <!-- Bottom edge -->
  <T.Mesh position={[0, padHeight + 0.002, padLength/2 - 0.01]}>
    <T.BoxGeometry args={[padWidth * 0.98, 0.002, 0.02]} />
    <T.MeshStandardMaterial color="#444455" roughness={0.8} />
  </T.Mesh>
  
  <!-- Left edge -->
  <T.Mesh position={[-padWidth/2 + 0.01, padHeight + 0.002, 0]}>
    <T.BoxGeometry args={[0.02, 0.002, padLength * 0.96]} />
    <T.MeshStandardMaterial color="#444455" roughness={0.8} />
  </T.Mesh>
  
  <!-- Right edge -->
  <T.Mesh position={[padWidth/2 - 0.01, padHeight + 0.002, 0]}>
    <T.BoxGeometry args={[0.02, 0.002, padLength * 0.96]} />
    <T.MeshStandardMaterial color="#444455" roughness={0.8} />
  </T.Mesh>
  
  <!-- Main mouse body -->
  <T.Mesh 
    castShadow 
    position={[0.15, padHeight + mouseHeight / 2, -0.1]}
  >
    <T.BoxGeometry args={[mouseWidth, mouseHeight, mouseLength]} />
    <T.MeshStandardMaterial 
      color="#2a2a2a" 
      roughness={0.3} 
      metalness={0.1}
    />
  </T.Mesh>
  
  <!-- Mouse top shell (slightly rounded effect) -->
  <T.Mesh 
    castShadow 
    position={[0.15, padHeight + mouseHeight + 0.02, -0.1]}
  >
    <T.BoxGeometry args={[mouseWidth * 0.95, 0.04, mouseLength * 0.95]} />
    <T.MeshStandardMaterial 
      color="#3a3a3a" 
      roughness={0.2} 
      metalness={0.2}
    />
  </T.Mesh>
  
  <!-- Left mouse button -->
  <T.Mesh 
    castShadow 
    position={[0.15 - mouseWidth * 0.15, padHeight + mouseHeight + 0.04, -0.1 - mouseLength * 0.15]}
  >
    <T.BoxGeometry args={[mouseWidth * 0.35, 0.02, mouseLength * 0.3]} />
    <T.MeshStandardMaterial 
      color="#4a4a4a" 
      roughness={0.1} 
      metalness={0.3}
    />
  </T.Mesh>
  
  <!-- Right mouse button -->
  <T.Mesh 
    castShadow 
    position={[0.15 + mouseWidth * 0.15, padHeight + mouseHeight + 0.04, -0.1 - mouseLength * 0.15]}
  >
    <T.BoxGeometry args={[mouseWidth * 0.35, 0.02, mouseLength * 0.3]} />
    <T.MeshStandardMaterial 
      color="#4a4a4a" 
      roughness={0.1} 
      metalness={0.3}
    />
  </T.Mesh>
  
  <!-- Scroll wheel -->
  <T.Mesh 
    castShadow 
    position={[0.15, padHeight + mouseHeight + 0.05, -0.1 - mouseLength * 0.1]}
    rotation.x={Math.PI / 2}
  >
    <T.CylinderGeometry args={[0.02, 0.02, mouseWidth * 0.25]} />
    <T.MeshStandardMaterial 
      color="#1a1a1a" 
      roughness={0.4} 
      metalness={0.6}
    />
  </T.Mesh>
</T.Group>