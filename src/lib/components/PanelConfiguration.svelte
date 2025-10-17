<script>
  import { Trash } from "lucide-svelte";
  import { monitorsStore } from "../stores/monitors";
  import PanelConfigurationModal from "./PanelConfigurationModal.svelte";

  let { selectedMonitor, selectMonitor } = $props();
  let showModal = $state(false);

  function handleMonitorAdded() {
    showModal = false;
    // Auto-select last added monitor
    if ($monitorsStore.length > 0) {
      selectMonitor($monitorsStore[$monitorsStore.length - 1]);
    }
  }

  function deleteMonitor(monitor, event) {
    event.stopPropagation(); // Prevent monitor selection
    monitorsStore.deleteMonitor(monitor.id);

    // If it was the selected monitor, auto-select another
    if (selectedMonitor?.id === monitor.id) {
      if ($monitorsStore.length > 0) {
        selectMonitor($monitorsStore[0]);
      } else {
        selectMonitor(null);
      }
    }
  }
</script>

<div class="panel-section">
  <!-- Section Header -->
  <div class="section-header">
    <h2>Monitors ({$monitorsStore.length})</h2>
    <button class="btn btn-primary btn-sm" onclick={() => (showModal = true)}> + Add </button>
  </div>

  <!-- Monitors List -->
  <div class="monitors-list">
    {#each $monitorsStore as monitor (monitor.id)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        class="card monitor-card"
        class:selected={selectedMonitor?.id === monitor.id}
        onclick={() => selectMonitor(monitor)}
        role="button"
        tabindex="0"
      >
        <div class="card-content monitor-content">
          <div class="card-title">{monitor.name}</div>
          <div class="card-subtitle">
            {monitor.diagonal}" • {monitor.aspectRatio}
          </div>
        </div>
        <button
          class="btn btn-icon btn-danger"
          onclick={(e) => deleteMonitor(monitor, e)}
          title="Delete monitor"
        >
          <Trash />
        </button>
      </div>
    {/each}

    {#if $monitorsStore.length === 0}
      <div class="monitor-empty-state">
        <p>No monitors yet</p>
        <p class="hint">Add your first monitor!</p>
      </div>
    {/if}
  </div>
</div>

<!-- Modal -->
{#if showModal}
  <PanelConfigurationModal
    onClose={() => (showModal = false)}
    onAdd={handleMonitorAdded}
  />
{/if}
