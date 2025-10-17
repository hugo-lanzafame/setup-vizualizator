<script>
  import PanelConfiguration from './PanelConfiguration.svelte';
  import PanelControls from './PanelControls.svelte';

  let { selectedMonitor, selectMonitor } = $props();
</script>

<div class="panel">
  <div class="panel-header">
    <h1>Setup<span class="primary-color">Vizualizator</span></h1>
    <p>Monitor Setup Simulator 3D</p>
  </div>

  <!-- Configuration Section -->
  <PanelConfiguration {selectedMonitor} {selectMonitor} />

  <!-- Position Section -->
  {#if selectedMonitor}
    <PanelControls {selectedMonitor} />
  {/if}
</div>
