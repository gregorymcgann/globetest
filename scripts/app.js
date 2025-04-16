class App {
  constructor({animate, setup, preload}) {
    this.preload = preload;
    this.animate = animate;
    this.setup = setup;
    window.app = this;
    this.clickedMarker = null;
  }

  init = async () => {
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.initStats();
    this.initRaycaster();
    this.initClickHandler();

    if(this.preload) {
      await this.preload();
    }

    this.render();
    this.update();
  }

  initScene = () => {
    this.scene = new THREE.Scene();
  }

  initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    this.renderer.shadowMap.enabled = true;
    this.renderer.antialias = true;
  }

  initCamera = () => {
    this.ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, this.ratio, 0.1, 10000);
    this.camera.lookAt(this.scene.position);
    this.camera.position.set(0, 15, 30);
  }

  initControls = () => {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  initStats = () => {
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.right = '10px';
    this.stats.domElement.style.bottom = '10px';
    document.body.appendChild( this.stats.domElement );
  }

  initRaycaster = () => {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredMarker = null;

    // Add mouse move listener
    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }

  initClickHandler = () => {
    window.addEventListener('click', (event) => {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(groups.markers.children, true);

      if (intersects.length) {
        // If we clicked on a marker
        const marker = intersects[0].object.parent.userData.marker;
        if (marker) {
          // If we click the same marker that's already clicked, unclick it
          if (this.clickedMarker === marker) {
            marker.setClicked(false);
            this.clickedMarker = null;
            animations.rotateGlobe = true;
          } else {
            // If there was a previously clicked marker, unclick it
            if (this.clickedMarker) {
              this.clickedMarker.setClicked(false);
            }
            // Click the new marker
            marker.setClicked(true);
            this.clickedMarker = marker;
            animations.rotateGlobe = false;
          }
          return;
        }
      }

      // If we clicked anywhere else (except UI elements)
      if (event.target === this.renderer.domElement) {
        if (this.clickedMarker) {
          this.clickedMarker.setClicked(false);
          this.clickedMarker = null;
        }
        animations.rotateGlobe = true;
      }
    });
  }

  checkIntersects = () => {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(groups.markers.children, true);

    // If we were hovering over something before, unhover it
    if (this.hoveredMarker && (!intersects.length || intersects[0].object.parent.userData.marker !== this.hoveredMarker)) {
      this.hoveredMarker.setHovered(false);
      this.hoveredMarker = null;
    }

    // If we're now hovering over something new
    if (intersects.length) {
      const marker = intersects[0].object.parent.userData.marker;
      if (marker && marker !== this.hoveredMarker) {
        this.hoveredMarker = marker;
        marker.setHovered(true);
      }
    }
  }

  render = () => {
    this.setup(this);
    document.body.appendChild(this.renderer.domElement);
  }

  update = () => {
    this.animate(this);
    this.stats.update();
    this.controls.update();
    this.checkIntersects();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.update);
  }

  handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}