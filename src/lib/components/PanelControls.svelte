<script>
  import { monitorsStore } from "../stores/monitors";

  let { selectedMonitor } = $props();
  let adjustmentMode = $state("position"); // 'position' ou 'screen'
  let currentMonitor = $derived($monitorsStore.find(m => m.id === selectedMonitor.id) || selectedMonitor);

  function updatePosition(axis, value) {
    const newPosition = {
      ...currentMonitor.position,
      [axis]: parseFloat(value),
    };
    monitorsStore.updateMonitor(currentMonitor.id, { position: newPosition });
  }

  function updateRotation(value) {
    const newRotation = { y: parseFloat(value) * (Math.PI / 180) };
    monitorsStore.updateMonitor(currentMonitor.id, { rotation: newRotation });
  }

  function updateScreenRotation(value) {
    monitorsStore.updateMonitor(currentMonitor.id, {
      screenRotation: parseFloat(value),
    });
  }

  function updateScreenHeight(value) {
    monitorsStore.updateMonitor(currentMonitor.id, {
      screenHeight: parseFloat(value),
    });
  }
</script>

<div class="panel-section">
  <div class="section-header">
    <h2>Adjustment</h2>
    <div>
      <button
        class="btn btn-primary btn-sm"
        class:active={adjustmentMode === "position"}
        onclick={() => (adjustmentMode = "position")}
      >
        Position
      </button>
      <button
        class="btn btn-primary btn-sm"
        class:active={adjustmentMode === "screen"}
        onclick={() => (adjustmentMode = "screen")}
      >
        Screen
      </button>
    </div>
  </div>

  <div class="controls-list">
    {#if adjustmentMode === "position"}
      <div class="card">
        <div class="control-row">
          <span class="control-label">Left ↔ Right:</span>
          <input
            type="range"
            class="control-range"
            min="-10"
            max="10"
            step="0.1"
            value={currentMonitor.position.x}
            oninput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                updatePosition("x", e.target.value);
              }
            }}
          />
          <span class="control-value">{currentMonitor.position.x.toFixed(2)}</span>
        </div>
      </div>

      <div class="card">
        <div class="control-row">
          <span class="control-label">Back ↔ Forward</span>
          <input
            type="range"
            class="control-range"
            min="-10"
            max="10"
            step="0.1"
            value={currentMonitor.position.z}
            oninput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                updatePosition("z", e.target.value);
              }
            }}
          />
          <span class="control-value">{currentMonitor.position.z.toFixed(2)}</span>
        </div>
      </div>

      <div class="card">
        <div class="control-row">
          <span class="control-label">Pivot angle</span>
          <input
            type="range"
            class="control-range"
            min="-180"
            max="180"
            step="1"
            value={((currentMonitor.rotation?.y || 0) * 180) / Math.PI}
            oninput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                updateRotation(e.target.value);
              }
            }}
          />
          <span class="control-value">{(((currentMonitor.rotation?.y || 0) * 180) / Math.PI).toFixed(0)}°</span>
        </div>
      </div>
    {:else}
      <!-- Screen Controls -->
      <div class="card">
        <div class="control-row">
          <span class="control-label">Rotation</span>
          <input
            type="range"
            class="control-range"
            min="-90"
            max="90"
            step="1"
            value={currentMonitor.screenRotation || 0}
            oninput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                updateScreenRotation(e.target.value);
              }
            }}
          />
          <span class="control-value">{currentMonitor.screenRotation || 0}°</span>
        </div>
      </div>

      <div class="card">
        <div class="control-row">
          <span class="control-label">Down ↔ Up</span>
          <input
            type="range"
            class="control-range"
            min="-2"
            max="2"
            step="0.1"
            value={currentMonitor.screenHeight || 0}
            oninput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                updateScreenHeight(e.target.value);
              }
            }}
          />
          <span class="control-value">{(currentMonitor.screenHeight || 0).toFixed(2)}</span>
        </div>
      </div>
    {/if}
  </div>
</div>
