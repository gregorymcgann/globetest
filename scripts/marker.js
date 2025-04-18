class Marker {
  constructor(material, geometry, label, cords, {
    textColor = 'white',
    pointColor = config.colors.globeMarkerColor,
    glowColor = config.colors.globeMarkerGlow
  } = {}) {
    this.material = material;
    this.geometry = geometry;
    this.labelText = label;
    this.cords = cords;

    this.isAnimating = false;
    this.isHovered = false;
    this.isClicked = false;

    this.textColor = textColor;
    this.pointColor = new THREE.Color(pointColor);
    this.glowColor = new THREE.Color(glowColor);
    this.clickedColor = new THREE.Color('rgb(255, 215, 0)'); // Gold color for clicked state

    this.group = new THREE.Group();
    this.group.name = 'Marker';

    this.createLabel();
    this.createPoint();
    this.createGlow();
    this.setPosition();

    // Initially hide the label
    this.label.visible = false;

    // Add hover detection
    this.group.userData.marker = this;
    this.group.userData.type = 'marker';

    groups.markers.add(this.group);
  }

  createLabel() {
    const text = this.createText();
    const texture = new THREE.Texture(text);
    texture.minFilter = THREE.LinearFilter;
    textures.markerLabels.push(texture);

    const material = new THREE.SpriteMaterial()
    material.map = texture;
    material.depthTest = false;
    material.useScreenCoordinates = false;

    this.label = new THREE.Sprite(material);
    this.label.scale.set( 40, 20, 1 );
    this.label.center.x = 0.25;
    this.label.translateY(2);

    this.group.add(this.label);
    elements.markerLabel.push(this.label);
  }

  createPoint() {
    this.point = new THREE.Mesh( this.geometry, this.material );
    this.point.material.color.set(this.pointColor);
    this.group.add(this.point);
    elements.markerPoint.push(this.point);
  }

  createGlow() {
    this.glow = new THREE.Mesh( this.geometry, this.material.clone() );
    this.glow.material.color.set(this.glowColor);
    this.glow.material.opacity = 0.6;
    this.group.add(this.glow);
    elements.markerPoint.push(this.glow);
  }

  animateGlow() {
    if(!this.isAnimating) {
      if(Math.random() > 0.99) {
        this.isAnimating = true;
      }
    } else if(this.isAnimating) {
      this.glow.scale.x += 0.025;
      this.glow.scale.y += 0.025;
      this.glow.scale.z += 0.025;
      this.glow.material.opacity -= 0.005;

      if(this.glow.scale.x >= 4) {
        this.glow.scale.x = 1;
        this.glow.scale.y = 1;
        this.glow.scale.z = 1;
        this.glow.material.opacity = 0.6;
        this.glow.isAnimating = false;
      }
    }
  }

  setPosition() {
    const {x, y, z} = this.cords
    this.group.position.set(-x, y, -z)
  }

  createText() {
    const element = document.createElement('canvas');
    const canvas = new fabric.Canvas(element);

    const text = new fabric.Text(this.labelText, {
      left: 0, top: 0, fill: this.textColor, 
      fontFamily: 'Open Sans',
    });

    canvas.add(text);
    return element;
  }

  setHovered(hovered) {
    this.isHovered = hovered;
    this.label.visible = hovered || this.isClicked;
    
    // Update point color based on state
    if (this.isClicked) {
      this.point.material.color.copy(this.clickedColor);
    } else if (hovered) {
      this.point.material.color.copy(this.glowColor);
    } else {
      this.point.material.color.copy(this.pointColor);
    }
  }

  setClicked(clicked) {
    this.isClicked = clicked;
    this.label.visible = clicked || this.isHovered;
    
    // Update point color based on state
    if (clicked) {
      this.point.material.color.copy(this.clickedColor);
    } else if (this.isHovered) {
      this.point.material.color.copy(this.glowColor);
    } else {
      this.point.material.color.copy(this.pointColor);
    }
  }
}
