<script>
  import { T } from '@threlte/core';
  
  let { position = { x: -1.2, y: 0, z: 3.6 }, rotation = { y: 0.08 } } = $props();
  
  // Keyboard dimensions (realistic proportions)
  const keyboardWidth = 4.5;
  const keyboardDepth = 2;
  const keyboardHeight = 0.2; 
  
  // Case/shell dimensions (the outer casing)
  const caseWidth = keyboardWidth;
  const caseDepth = keyboardDepth;
  const caseHeight = keyboardHeight;
  const caseBorderWidth = 0.8;  // Border around the keys
  
  // Key area (the actual typing surface)
  const keyAreaWidth = caseWidth - (caseBorderWidth * 2);
  const keyAreaDepth = caseDepth - (caseBorderWidth * 2);
  
  // Individual key dimensions (much smaller and realistic)
  const keyWidth = 0.25;      // Width (X axis) - largeur des touches
  const keyDepth = 0.25;     // Depth (Z axis) - profondeur des touches  
  const keySpacing = 0.05;   // Gap between keys
  const keyHeight = 0.08;     // Height (Y axis) - hauteur des touches

  // Keyboard layout (simplified QWERTY)
  const keyRows = [
    // Row 1 - Function keys
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    // Row 2 - Numbers
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    // Row 3 - QWERTY
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'Test'],
    // Row 4 - ASDF
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    // Row 5 - ZXCV
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift1'],
    // Row 6 - Space bar row
    ['Ctrl', 'jsp', 'Fn', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl']
  ];
  
  // Special key widths (multiplier of normal key width)
  const specialKeyWidths = {
    'Backspace': 2,
    'Tab': 1.6,
    'Caps': 2.2,
    'Test': 1.4,
    'Enter': 2,
    'Shift': 1.6,
    'Shift1': 3.8,
    'Ctrl': 1.6,
    'Alt': 1.6,
    'Space': 5.6,
  };
  
  function getKeyWidth(key) {
    return (specialKeyWidths[key] || 1) * keyWidth;
  }
  
  function getKeyPositions() {
    const positions = [];
    let yOffset = keyAreaWidth - 3.65; // Start from top of key area
    
    keyRows.forEach((row, rowIndex) => {
      let xOffset = keyAreaDepth - 2.6; // Start from left edge
      
      // Adjust starting position for different rows (staggering)
      if (rowIndex === 2) xOffset += keyWidth * 0.0; // Tab row
      if (rowIndex === 3) xOffset += keyWidth * 0.0;  // Caps row  
      if (rowIndex === 4) xOffset += keyWidth * 0.0;  // Shift row
      
      row.forEach((key, keyIndex) => {
        const width = getKeyWidth(key);
        
        // Add space between Esc and F1
        if (rowIndex === 0 && keyIndex === 1) {
          xOffset += keyWidth * 2.2; // Extra space before F1
        }
        
        positions.push({
          key,
          x: xOffset + width / 2,
          y: yOffset,
          width
        });
        xOffset += width + keySpacing;
      });
      
      yOffset += (keyDepth + keySpacing);
    });
    
    return positions;
  }
  
  const keyPositions = getKeyPositions();
</script>

<T.Group 
  position={[position.x, position.y, position.z]}
  rotation.y={rotation.y}
>
  <!-- Main keyboard case/shell -->
  <T.Mesh 
    castShadow 
    receiveShadow 
    position={[0, caseHeight / 2, 0]}
  >
    <T.BoxGeometry args={[caseWidth, caseHeight, caseDepth]} />
    <T.MeshStandardMaterial color="#2a2a2a" roughness={0.7} metalness={0.1} />
  </T.Mesh>
  
  
  <!-- Individual keys (adjusted for realistic proportions) -->
  <T.Group position.y={caseHeight}>
    {#each keyPositions as keyPos}
      <T.Mesh 
        castShadow 
        position={[keyPos.x, keyHeight / 2, keyPos.y]}
      >
        <T.BoxGeometry args={[keyPos.width, keyHeight, keyDepth]} />
        <T.MeshStandardMaterial 
          color={keyPos.key === 'Space' ? "#3a3a3a" : "#4a4a4a"} 
          roughness={0.3} 
          metalness={0.2} 
        />
      </T.Mesh>
      
      <!-- Key labels (only for single character keys and some special keys) -->
      {#if keyPos.key.length === 1 || ['Esc', 'Tab', 'Caps', 'Shift', 'Ctrl', 'Alt', 'Win'].includes(keyPos.key)}
        <T.Mesh 
          position={[keyPos.x, keyHeight + 0.005, keyPos.y]}
          rotation.x={-Math.PI / 2}
        >
          <T.PlaneGeometry args={[keyPos.width * 0.6, keyDepth * 0.6]} />
          <T.MeshStandardMaterial 
            color="#ffffff" 
            transparent={true} 
            opacity={0.8}
          />
        </T.Mesh>
      {/if}
    {/each}
  </T.Group>
</T.Group>