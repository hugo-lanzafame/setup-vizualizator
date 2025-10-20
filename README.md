# SetupVizualizator
[![Svelte](https://img.shields.io/badge/Svelte-5.39-FF3E00?style=flat&logo=svelte)](https://svelte.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?style=flat&logo=three.js)](https://threejs.org/)
[![Threlte](https://img.shields.io/badge/Threlte-8.1-orange?style=flat)](https://threlte.xyz/)

The Monitor Setup Simulator 3D

A realistic 3D simulator to visualize and compare monitor setups on your desk. Perfect for planning your workspace before buying new monitors!

## Features

- **Real-time 3D Visualization** - Accurate monitor sizing based on real dimensions (inches to cm conversion)
- **Multiple Monitor Support** - Add and configure multiple monitors simultaneously
- **Realistic 3D Environment** - Complete desk setup with keyboard, mouse, and adjustable lighting
- **Interactive Camera** - Smooth orbit, pan, and zoom controls
- **Precise Controls** - Adjust position, rotation, screen tilt, and height independently for each monitors
- **Predefined Presets** - Popular monitor sizes (24", 27", 32", 34" ultrawide, 49" super ultrawide)
- **Custom Configurations** - Create custom monitor sizes with any diagonal and aspect ratio

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm (for local development)
- **Docker** and **Docker Compose** (for containerized deployment)

### Installation

#### Option 1: Docker

**Use this if:** You want a quick start without installing Node.js, need consistent environments across different machines, or deploying to production.

```bash
# Clone the repository
git clone https://github.com/hugo-lanzafame/setup-vizualizator
cd setup-vizualizator

# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

#### Option 2: Local Development

**Use this if:** You're actively developing features, need hot reload performance, or prefer working directly with npm packages.

```bash
# Clone the repository
git clone https://github.com/hugo-lanzafame/setup-vizualizator
cd setup-vizualizator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.


## Usage

### Camera Controls

| Control | Action |
|---------|--------|
| **Left Click + Drag** | Rotate camera around the scene |
| **Right Click + Drag** | Pan camera (move view) |
| **Mouse Wheel** | Zoom in/out |

### Monitor Adjustments

The sidebar offers two adjustment modes:

#### Position Mode
- **Left ↔ Right** - Move the entire monitor horizontally on the desk
- **Back ↔ Forward** - Move the monitor depth-wise
- **Pivot Angle** - Rotate the entire monitor stand

#### Screen Mode  
- **Rotation** - Tilt the screen (portrait/landscape) independently from the stand
- **Down ↔ Up** - Adjust screen height on the stand

### Adding Monitors

1. Click **"+ Add"** in the Configuration section
2. Choose from predefined presets or create a custom size
3. Enter diagonal size (in inches) and aspect ratio
4. Click **"Add Monitor"** to place it on the desk

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Scene.svelte                    # 3D scene setup (camera, lights)
│   │   │   ├── Panel.svelte                    # Main sidebar UI
│   │   │   ├── PanelConfiguration.svelte       # Monitor list and add/remove
│   │   │   ├── PanelControls.svelte            # Position and screen adjustments
│   │   │   ├── PanelConfigurationModal.svelte  # Add monitor modal
│   │   │   └── models/                         # 3D models (Desk, Monitor, etc.)
│   │   ├── stores/
│   │   │   └── monitors.js                     # Monitor state management
│   │   └── data/                               # Presets and configurations
│   ├── App.svelte                              # Root component
│   ├── main.js                                 # Application entry point
│   └── styles.css                              # Global styles
├── public/
├── .git/                                       # Git repository
├── .gitignore                                  # Git ignore rules
├── .dockerignore                               # Docker ignore rules
├── Dockerfile                                  # Multi-stage production build
├── docker-compose.yml                          # Docker Compose configuration
├── nginx.conf                                  # Nginx server configuration
├── vite.config.js                              # Vite build configuration
├── svelte.config.js                            # Svelte compiler configuration
├── jsconfig.json                               # JavaScript/IDE configuration
├── package.json                                # NPM dependencies and scripts
├── package-lock.json                           # NPM lock file
├── index.html                                  # HTML entry point
├── first-version.html                          # Legacy HTML version
├── LICENSE.md                                  # MIT License
└── README.md                                   # This file
```

## Technical Details

### Dimension System
- **Scale:** 1 Three.js unit = 10 cm

### Monitor Calculation
Monitor dimensions are calculated from diagonal size and aspect ratio:
```javascript
// Example: 24" 16:9 monitor
diagonal: 24 inches
width: ~53cm → 5.3 units
```

## Tech Stack

- **[Svelte 5](https://svelte.dev/)** - Modern reactive framework with Runes API
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[Threlte](https://threlte.xyz/)** - Declarative Three.js in Svelte

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
