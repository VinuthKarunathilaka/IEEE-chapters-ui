'use client';

import { useEffect, useRef } from 'react';

export default function TextSphereAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/TextGeometry.js',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/FontUtils.js',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/pnltri.min.js',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/droid_sans_bold.typeface.js',
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js',
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/bas.js',
    ];

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      for (const src of scripts) {
        await loadScript(src);
      }
      initAnimation();
    };

    const initAnimation = () => {
      const THREE = (window as any).THREE;
      const TweenMax = (window as any).TweenMax;
      const TimelineMax = (window as any).TimelineMax;
      const Power1 = (window as any).Power1;
      const PNLTRI = (window as any).PNLTRI;

      THREE.ShapeUtils.triangulateShape = (function () {
        const pnlTriangulator = new PNLTRI.Triangulator();
        return function triangulateShape(contour: any, holes: any) {
          return pnlTriangulator.triangulate_polygon([contour].concat(holes));
        };
      })();

      const utils = {
        extend: function (dst: any, src: any) {
          for (const key in src) {
            dst[key] = src[key];
          }
          return dst;
        },
        fibSpherePoint: (function () {
          const v = { x: 0, y: 0, z: 0 };
          const G = Math.PI * (3 - Math.sqrt(5));
          return function (i: number, n: number, radius: number) {
            const step = 2.0 / n;
            v.y = i * step - 1 + step * 0.5;
            const r = Math.sqrt(1 - v.y * v.y);
            const phi = i * G;
            v.x = Math.cos(phi) * r;
            v.z = Math.sin(phi) * r;
            radius = radius || 1;
            v.x *= radius;
            v.y *= radius;
            v.z *= radius;
            return v;
          };
        })(),
      };

      function THREERoot(this: any, params: any) {
        params = utils.extend(
          { fov: 60, zNear: 10, zFar: 100000, createCameraControls: true },
          params
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: params.antialias, alpha: true });
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

        const container = document.getElementById('three-container');
        if (container) {
          container.appendChild(this.renderer.domElement);
        }

        this.camera = new THREE.PerspectiveCamera(
          params.fov,
          window.innerWidth / window.innerHeight,
          params.zNear,
          params.zFar
        );

        this.scene = new THREE.Scene();
        this.onUpdate = null; 

        this.resize = () => {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        this.tick = () => {
          if (this.onUpdate) this.onUpdate(); 
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(this.tick);
        };

        this.resize();
        this.tick();
        window.addEventListener('resize', this.resize, false);
      }

      const SPHERE_RADIUS = 240; 

      function TextAnimation(this: any, textGeometry: any) {
        const bufferGeometry = new THREE.BAS.ModelBufferGeometry(textGeometry);
        const aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
        const aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
        const aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

        const faceCount = bufferGeometry.faceCount;
        const maxDelay = 0.0;
        const minDuration = 1.0;
        const maxDuration = 1.0;
        const stretch = 0.05;
        const lengthFactor = 0.001;
        const maxLength = textGeometry.boundingBox.max.length();

        this.animationDuration = maxDuration + maxDelay + stretch + lengthFactor * maxLength;
        this._animationProgress = 0;

        const axis = new THREE.Vector3();

        for (let i = 0, i2 = 0, i3 = 0, i4 = 0; i < faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
          const face = textGeometry.faces[i];
          const centroid = THREE.BAS.Utils.computeCentroid(textGeometry, face);
          const centroidN = new THREE.Vector3().copy(centroid).normalize();

          const delay = (maxLength - centroid.length()) * lengthFactor;
          const duration = THREE.Math.randFloat(minDuration, maxDuration);

          for (let v = 0; v < 6; v += 2) {
            aAnimation.array[i2 + v] = delay + stretch * Math.random();
            aAnimation.array[i2 + v + 1] = duration;
          }

          const point = utils.fibSpherePoint(i, faceCount, SPHERE_RADIUS);
          for (let v = 0; v < 9; v += 3) {
            aEndPosition.array[i3 + v] = point.x;
            aEndPosition.array[i3 + v + 1] = point.y;
            aEndPosition.array[i3 + v + 2] = point.z;
          }

          axis.x = centroidN.x;
          axis.y = -centroidN.y;
          axis.z = -centroidN.z;
          axis.normalize();

          const angle = Math.PI * THREE.Math.randFloat(0.5, 2.0);
          for (let v = 0; v < 12; v += 4) {
            aAxisAngle.array[i4 + v] = axis.x;
            aAxisAngle.array[i4 + v + 1] = axis.y;
            aAxisAngle.array[i4 + v + 2] = axis.z;
            aAxisAngle.array[i4 + v + 3] = angle;
          }
        }

        const material = new THREE.BAS.PhongAnimationMaterial(
          {
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
              uTime: { type: 'f', value: 0 },
            },
            shaderFunctions: [
              THREE.BAS.ShaderChunk['cubic_bezier'],
              THREE.BAS.ShaderChunk['ease_out_cubic'],
              THREE.BAS.ShaderChunk['quaternion_rotation'],
            ],
            shaderParameters: [
              'uniform float uTime;',
              'attribute vec2 aAnimation;',
              'attribute vec3 aEndPosition;',
              'attribute vec4 aAxisAngle;',
            ],
            shaderVertexInit: [
              'float tDelay = aAnimation.x;',
              'float tDuration = aAnimation.y;',
              'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
              'float tProgress = ease(tTime, 0.0, 1.0, tDuration);',
            ],
            shaderTransformPosition: [
              'transformed = mix(transformed, aEndPosition, tProgress);',
              'float angle = aAxisAngle.w * tProgress;',
              'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);',
              'transformed = rotateVector(tQuat, transformed);',
            ],
          },
          { diffuse: 0x444444, specular: 0xcccccc, shininess: 4 }
        );

        THREE.Mesh.call(this, bufferGeometry, material);
        this.frustumCulled = false;
      }

      TextAnimation.prototype = Object.create(THREE.Mesh.prototype);
      TextAnimation.prototype.constructor = TextAnimation;

      Object.defineProperty(TextAnimation.prototype, 'animationProgress', {
        get: function () { return this._animationProgress; },
        set: function (v: number) {
          this._animationProgress = v;
          this.material.uniforms['uTime'].value = this.animationDuration * v;
        },
      });

      function generateTextGeometry(text: string, params: any) {
        const geometry = new THREE.TextGeometry(text, {
          size: params.size,
          height: params.height,
          curveSegments: params.curveSegments,
          bevelSize: params.bevelSize,
          bevelThickness: params.bevelThickness,
          bevelEnabled: params.bevelEnabled,
          font: 'droid sans',
          weight: 'bold',
          style: 'normal',
        });
        geometry.computeBoundingBox();

        const size = geometry.boundingBox.size();
        const anchorX = size.x * -params.anchor.x;
        const anchorY = size.y * -params.anchor.y;
        const anchorZ = size.z * -params.anchor.z;
        const matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);
        geometry.applyMatrix(matrix);
        return geometry;
      }

      function createTextAnimation() {
        const THREE = (window as any).THREE;

        const ieeeGeometry = generateTextGeometry('IEEE', {
          size: 75,         
          height: 4,        
          curveSegments: 24,
          bevelSize: 1,     
          bevelThickness: 1,
          bevelEnabled: true,
          anchor: { x: 0.5, y: 0.5, z: 0.0 },
        });
        
        ieeeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 40, 0));

        const uniGeometry = generateTextGeometry('UNIVERSITY OF MORATUWA', {
          size: 22,         
          height: 2,        
          curveSegments: 24,
          bevelSize: 0.5,
          bevelThickness: 0.5,
          bevelEnabled: true,
          anchor: { x: 0.5, y: 0.5, z: 0.0 },
        });
        
        uniGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -25, 0));

        ieeeGeometry.merge(uniGeometry);
        ieeeGeometry.computeBoundingBox();

        THREE.BAS.Utils.tessellateRepeat(ieeeGeometry, 1.0, 2);
        THREE.BAS.Utils.separateFaces(ieeeGeometry);

        return new (TextAnimation as any)(ieeeGeometry);
      }

      function createEarthSphere(earthTexture: any) {
        const geometry = new THREE.SphereGeometry(SPHERE_RADIUS * 0.99, 64, 64);
        const material = new THREE.MeshBasicMaterial({
          map: earthTexture,
          transparent: true,
          opacity: 1, 
          color: 0xffffff,
        });
        const earth = new THREE.Mesh(geometry, material);

        earth.scale.set(1, 1, 1);
        earth.visible = true;
        earth.renderOrder = -1;
        return earth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#60a5fa';

        const dotSize = 2;
        const dotSpacing = 8;
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          for (let x = 0; x < canvas.width; x += dotSpacing) {
            const i = (y * canvas.width + x) * 4;
            const brightness = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

            if (brightness > 100) {
              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        const earthTexture = new THREE.Texture(canvas);
        earthTexture.needsUpdate = true;
        initScene(earthTexture);
      };
      img.src = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/land_ocean_ice_cloud_2048.jpg';

      function initScene(earthTexture: any) {
          const root = new (THREERoot as any)({
            createCameraControls: false,
            antialias: window.devicePixelRatio === 1,
            fov: 60,
          });

          root.renderer.setClearColor(0x000000, 0);
          root.renderer.setPixelRatio(window.devicePixelRatio || 1);
          root.camera.position.set(0, 0, 600);

          const sphereGroup = new THREE.Object3D();
          root.scene.add(sphereGroup);

          const earthSphere = createEarthSphere(earthTexture);
          sphereGroup.add(earthSphere);

          const textAnimation = createTextAnimation();
          textAnimation.material.opacity = 0;
          sphereGroup.add(textAnimation);

          const light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(0, 0, 1);
          root.scene.add(light);

          const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
          backLight.position.set(0, 0, -1);
          root.scene.add(backLight);

          const ambientLight = new THREE.AmbientLight(0x333333);
          root.scene.add(ambientLight);

          let idleSpeed = { value: 0 };

          root.onUpdate = () => {
             earthSphere.rotation.y -= idleSpeed.value;
          };

          const tl = new TimelineMax();
          
          const bgGlobe = document.getElementById('bg-globe');
          const bgText = document.getElementById('bg-text');

          tl.fromTo(sphereGroup.rotation, 5.5,
            { y: -Math.PI * 3 },
            { y: 0, ease: Power1.easeInOut },
            0
          );

          tl.fromTo(earthSphere.scale, 3,
            { x: 1, y: 1, z: 1 },
            { x: 0.001, y: 0.001, z: 0.001, ease: Power1.easeInOut },
            1.5
          );

          tl.fromTo(earthSphere.material, 3,
            { opacity: 1.0 },
            { opacity: 0, ease: Power1.easeInOut },
            1.5
          );

          tl.fromTo(textAnimation.material, 3,
            { opacity: 0 },
            { opacity: 1, ease: Power1.easeInOut },
            1.5
          );

          tl.fromTo(textAnimation, 4,
            { animationProgress: 0.6 }, 
            { animationProgress: 0.0, ease: Power1.easeInOut }, 
            1.5
          );

          if (bgGlobe && bgText) {
            tl.fromTo(bgGlobe, 3,
              { opacity: 1 },
              { opacity: 0, ease: Power1.easeInOut },
              1.5
            );
            tl.fromTo(bgText, 3,
              { opacity: 0 },
              { opacity: 1, ease: Power1.easeInOut },
              1.5
            );
          }

          tl.eventCallback('onReverseComplete', () => {
            earthSphere.material.opacity = 1;
            textAnimation.material.opacity = 0;
            earthSphere.scale.set(1, 1, 1);
            if(bgGlobe) bgGlobe.style.opacity = '1';
            if(bgText) bgText.style.opacity = '0';
          });

          document.body.style.cursor = 'pointer';
          window.addEventListener('click', () => {
            if (tl.reversed()) {
              tl.reversed(false);
              TweenMax.to(idleSpeed, 1.5, { value: 0, ease: Power1.easeOut });
            } else {
              tl.reversed(true);
              const durationLeft = Math.max(tl.time(), 0.1); 
              TweenMax.to(idleSpeed, durationLeft, { value: 0.003, ease: Power1.easeIn });
            }
          });
      }
    };

    loadAllScripts();
  }, []);

  // Define our 3 distinct paths that turn corners
  const circuitPaths = [
    { id: 1, d: "M -20 280 L 480 280 L 480 780 L 1940 780", delay: "0s" },
    { id: 2, d: "M 1300 -20 L 1300 450 L 820 450 L 820 1100", delay: "12s" },
    { id: 3, d: "M 1940 520 L 1650 520 L 1650 100 L -20 100", delay: "24s" }
  ];

  return (
    <div className="relative w-full h-screen bg-[#000408] overflow-hidden">
      
      {/* --- GLOBE BACKGROUND --- */}
      <div id="bg-globe" className="absolute inset-0 pointer-events-none opacity-100 z-0">
        <div className="absolute inset-0"
             style={{
               background: 'radial-gradient(circle at center, rgba(0, 102, 255, 0.15) 0%, rgba(0, 4, 8, 1) 70%)'
             }}
        />
        <div className="absolute inset-0 opacity-30"
             style={{
               backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
               backgroundSize: '100px 100px',
               backgroundPosition: '0 0, 50px 50px'
             }}
        />
      </div>

      {/* --- TEXT BACKGROUND (SVG Irregular Grid & Layered Fading Glow) --- */}
      <div id="bg-text" className="absolute inset-0 pointer-events-none opacity-0 z-0">
        
        <style>{`
          /* Path animation: Total loop is 40s.
             Visible travel happens between 1% and 20% of the timeline (approx 8 seconds).
             'both' fill mode ensures lines are completely hidden before and after running.
          */
          @keyframes circuit-pulse {
            0% { stroke-dashoffset: 120; opacity: 0; }
            1% { opacity: 1; }
            20% { stroke-dashoffset: -20; opacity: 1; } 
            21% { opacity: 0; }
            100% { stroke-dashoffset: -20; opacity: 0; }
          }
          
          .animate-path {
            stroke-dasharray: 20 100; /* Sets the line length */
            animation: circuit-pulse 40s linear infinite both;
          }
        `}</style>

        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1920 1080">
          <defs>
            {/* 3 distinct blur filters to create the multi-layered depth of a realistic glow */}
            <filter id="blur-large" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id="blur-medium" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="blur-small" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>

          {/* 1. Base Asymmetric Grid (Maintained 0.07 opacity for visibility) */}
          <g stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1">
            <line x1="120" y1="0" x2="120" y2="1080" />
            <line x1="350" y1="0" x2="350" y2="1080" />
            <line x1="480" y1="0" x2="480" y2="1080" />
            <line x1="820" y1="0" x2="820" y2="1080" />
            <line x1="950" y1="0" x2="950" y2="1080" />
            <line x1="1300" y1="0" x2="1300" y2="1080" />
            <line x1="1650" y1="0" x2="1650" y2="1080" />
            <line x1="1780" y1="0" x2="1780" y2="1080" />

            <line x1="0" y1="100" x2="1920" y2="100" />
            <line x1="0" y1="280" x2="1920" y2="280" />
            <line x1="0" y1="450" x2="1920" y2="450" />
            <line x1="0" y1="520" x2="1920" y2="520" />
            <line x1="0" y1="780" x2="1920" y2="780" />
            <line x1="0" y1="910" x2="1920" y2="910" />
          </g>

          {/* 2. Multi-Layered Glow Paths */}
          {circuitPaths.map((path) => (
            <g key={path.id} fill="none">
              {/* Outer Glow (Wide, very blurry, faint opacity) */}
              <path 
                d={path.d} 
                pathLength="100" 
                stroke="rgba(255, 255, 255, 0.15)" 
                strokeWidth="16" 
                filter="url(#blur-large)" 
                className="animate-path" 
                style={{ animationDelay: path.delay }} 
              />
              
              {/* Inner Glow (Medium width, medium blur, medium opacity) */}
              <path 
                d={path.d} 
                pathLength="100" 
                stroke="rgba(255, 255, 255, 0.4)" 
                strokeWidth="6" 
                filter="url(#blur-medium)" 
                className="animate-path" 
                style={{ animationDelay: path.delay }} 
              />
              
              {/* Core Light (Thin, tiny blur, high opacity) */}
              <path 
                d={path.d} 
                pathLength="100" 
                stroke="rgba(255, 255, 255, 0.8)" 
                strokeWidth="1.5" 
                filter="url(#blur-small)" 
                className="animate-path" 
                style={{ animationDelay: path.delay }} 
              />
            </g>
          ))}
        </svg>

        {/* Central ambient light behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
             style={{
               background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
             }}
        />
      </div>

      {/* 3D Animation Container */}
      <div id="three-container" ref={containerRef} className="relative w-full h-full z-10" />

      {/* Global Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20"
           style={{
             background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 4, 8, 0.95) 100%)'
           }}
      />
    </div>
  );
}