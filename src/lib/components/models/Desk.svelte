<script>
  import { T } from '@threlte/core';
  import { DESK_CONFIG } from '../../data/desks';
  
  const {
    deskWidth,
    deskDepth,
    deskHeight,
    legWidth,
    legHeight,
    legInset,
    positionX,
    positionY,
    positionZ,
    deskColor,
    legColor,
    deskRoughness,
    deskMetalness,
    legRoughness,
    legMetalness
  } = DESK_CONFIG;
</script>

<T.Group position={[positionX, positionY, positionZ]}>
  <!-- DESK -->
  <T.Mesh 
    position={[0, deskHeight / 2, 0]}
    castShadow
    receiveShadow
  >
    <T.BoxGeometry args={[deskWidth, deskHeight, deskDepth]} />
    <T.MeshStandardMaterial 
      color={deskColor}
      roughness={deskRoughness}
      metalness={deskMetalness}
    />
  </T.Mesh>

  <!-- LEGS -->
  <T.Mesh 
    position={[-(deskWidth/2) + legInset, -legHeight/2, (deskDepth/2) - legInset]}
    castShadow
  >
    <T.BoxGeometry args={[legWidth, legHeight, legWidth]} />
    <T.MeshStandardMaterial 
      color={legColor}
      roughness={legRoughness}
      metalness={legMetalness}
    />
  </T.Mesh>
  <T.Mesh 
    position={[(deskWidth/2) - legInset, -legHeight/2, (deskDepth/2) - legInset]}
    castShadow
  >
    <T.BoxGeometry args={[legWidth, legHeight, legWidth]} />
    <T.MeshStandardMaterial 
      color={legColor}
      roughness={legRoughness}
      metalness={legMetalness}
    />
  </T.Mesh>
  <T.Mesh 
    position={[-(deskWidth/2) + legInset, -legHeight/2, -(deskDepth/2) + legInset]}
    castShadow
  >
    <T.BoxGeometry args={[legWidth, legHeight, legWidth]} />
    <T.MeshStandardMaterial 
      color={legColor}
      roughness={legRoughness}
      metalness={legMetalness}
    />
  </T.Mesh>
  <T.Mesh 
    position={[(deskWidth/2) - legInset, -legHeight/2, -(deskDepth/2) + legInset]}
    castShadow
  >
    <T.BoxGeometry args={[legWidth, legHeight, legWidth]} />
    <T.MeshStandardMaterial 
      color={legColor}
      roughness={legRoughness}
      metalness={legMetalness}
    />
  </T.Mesh>
</T.Group>