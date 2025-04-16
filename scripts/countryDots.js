class CountryDots {
    constructor(countries) {
      console.log('Raw countries data received:', countries);
      this.countries = countries;
      this.radius = config.sizes.globe + config.sizes.globe * config.scale.markers;
  
      groups.countryDots = new THREE.Group();
      groups.countryDots.name = 'CountryDots';
  
      this.geometry = new THREE.SphereGeometry(config.countryDots.size, 32, 32);
      this.material = new THREE.MeshBasicMaterial({
        color: config.countryDots.color,
        transparent: false,
        opacity: 1.0,
        depthWrite: true,
        depthTest: true
      });
  
      this.create();
    }
  
    create() {
      console.log('=== Country Dots Debug Info ===');
      console.log('1. Total countries received:', this.countries.length);
      console.log('2. First 5 countries:', this.countries.slice(0, 5));
      
      let validCountries = 0;
      let invalidCountries = [];
      
      this.countries.forEach(country => {
        if (country.latitude && country.longitude) {
          validCountries++;
        } else {
          invalidCountries.push(country.name);
        }
      });
      
      console.log('3. Countries with valid coordinates:', validCountries);
      console.log('4. Countries missing coordinates:', invalidCountries);
      console.log('5. Sample country data:', this.countries[0]);
      console.log('=== End Debug Info ===');
      
      this.countries.forEach(country => {
        if (country.latitude && country.longitude) {
          const lat = +country.latitude;
          const lng = +country.longitude;
          const coords = toSphereCoordinates(lat, lng, this.radius);
          
          for (let i = 0; i < config.countryDots.total; i++) {
            const dot = new CountryDot(this.geometry, this.material, coords);
            elements.countryDots.push(dot);
          }
        }
      });
    }
  }
  
  class CountryDot {
    constructor(geometry, material, coords) {
      this.mesh = new THREE.Mesh(geometry, material);
      this.coords = coords;
      this.setPosition();
      
      groups.countryDots.add(this.mesh);
    }
  
    setPosition() {
      const {x, y, z} = this.coords;
      this.mesh.position.set(-x, y, -z);
    }
  }