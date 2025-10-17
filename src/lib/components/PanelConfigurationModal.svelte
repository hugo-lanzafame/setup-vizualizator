<script>
  import { monitorsStore } from '../stores/monitors';
  import { PRESET_MONITORS } from '../data/monitors';
  import { CircleX } from 'lucide-svelte';

  let { onClose, onAdd } = $props();

  let activeTab = $state('presets'); // 'presets' or 'custom'

  // Custom monitor form
  let customMonitor = $state({
    name: 'Custom Monitor',
    diagonal: 27,
    aspectRatio: '16:9'
  });

  function addPreset(preset) {
    monitorsStore.addMonitor({
      ...preset,
      name: preset.name
    });
    onAdd();
  }

  function addCustom() {
    monitorsStore.addMonitor({
      name: customMonitor.name,
      diagonal: customMonitor.diagonal,
      aspectRatio: customMonitor.aspectRatio,
    });
    onAdd();
  }
</script>

<div class="modal-backdrop">
  <div class="modal">
    <!-- Header -->
    <div class="modal-header">
      <h2>Add Monitor</h2>
      <button class="btn btn-danger btn-icon" onclick={onClose}>
        <CircleX />
      </button>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        class="tab"
        class:active={activeTab === 'presets'}
        onclick={() => activeTab = 'presets'}
      >
        Presets
      </button>
      <button
        class="tab"
        class:active={activeTab === 'custom'}
        onclick={() => activeTab = 'custom'}
      >
        Custom
      </button>
    </div>

    <!-- Content -->
    <div class="modal-content">
      {#if activeTab === 'presets'}
        <!-- Presets List -->
        <div class="presets-list">
          {#each PRESET_MONITORS as preset (preset.id)}
            <button class="card preset-card" onclick={() => addPreset(preset)}>
              <div class="card-title">{preset.name}</div>
              <div class="card-subtitle">
                {preset.diagonal}" • {preset.aspectRatio}
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <!-- Custom Form -->
        <div>
          <div class="form-group">
            <label for="name">Monitor Name</label>
            <input
              class="form-input"
              id="name"
              type="text"
              bind:value={customMonitor.name}
              placeholder="My Monitor"
            />
          </div>

          <div class="form-group">
            <label for="diagonal">Diagonal (inches)</label>
            <input
              class="form-input"
              id="diagonal"
              type="number"
              bind:value={customMonitor.diagonal}
              min="10"
              max="50"
              step="0.1"
            />
          </div>

          <div class="form-group">
            <label for="ratio">Aspect Ratio</label>
            <select class="form-select" id="ratio" bind:value={customMonitor.aspectRatio}>
              <option value="16:9">16:9 (Standard)</option>
              <option value="16:10">16:10</option>
              <option value="21:9">21:9 (Ultrawide)</option>
              <option value="32:9">32:9 (Super Ultrawide)</option>
            </select>
          </div>

          <button class="btn btn-primary btn-lg" onclick={addCustom}>
            Add Custom Monitor
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
