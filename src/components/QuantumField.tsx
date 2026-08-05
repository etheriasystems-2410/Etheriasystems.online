import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type QuantumFieldProps = {
  className?: string;
};

type QuantumShape = 'sphere' | 'torus' | 'helix' | 'diamond';

const GOLD = new THREE.Color('#c9a227');
const CYAN = new THREE.Color('#00e5e5');
const VIOLET = new THREE.Color('#8b5cf6');
const WHITE = new THREE.Color('#f5f5f5');
const SHAPES: QuantumShape[] = ['sphere', 'torus', 'helix', 'diamond'];
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function createShapePositions(count: number, shape: QuantumShape) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const progress = (index + 0.5) / count;
    const angle = index * GOLDEN_ANGLE;
    let x = 0;
    let y = 0;
    let z = 0;

    if (shape === 'sphere') {
      const polar = Math.acos(1 - 2 * progress);
      const radius = 2.18 + Math.sin(index * 1.73) * 0.12;
      x = radius * Math.sin(polar) * Math.cos(angle);
      y = radius * Math.cos(polar);
      z = radius * Math.sin(polar) * Math.sin(angle);
    } else if (shape === 'torus') {
      const tubeAngle = ((index * 29) % count) / count * Math.PI * 2;
      const radius = 1.55 + 0.62 * Math.cos(tubeAngle);
      x = radius * Math.cos(angle);
      y = 0.62 * Math.sin(tubeAngle);
      z = radius * Math.sin(angle);
    } else if (shape === 'helix') {
      const vertical = progress * 4.8 - 2.4;
      const helixAngle = progress * Math.PI * 9;
      const radius = 1.35 + Math.sin(index * 0.7) * 0.16;
      x = radius * Math.cos(helixAngle);
      y = vertical;
      z = radius * Math.sin(helixAngle);
    } else {
      const polar = Math.acos(1 - 2 * progress);
      const direction = new THREE.Vector3(
        Math.sin(polar) * Math.cos(angle),
        Math.cos(polar),
        Math.sin(polar) * Math.sin(angle),
      );
      const radius = 2.35 / (Math.abs(direction.x) + Math.abs(direction.y) + Math.abs(direction.z));
      x = direction.x * radius;
      y = direction.y * radius;
      z = direction.z * radius;
    }

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
  }

  return positions;
}

export default function QuantumField({ className = '' }: QuantumFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'pan-y';
    container.appendChild(renderer.domElement);

    const quantumGroup = new THREE.Group();
    quantumGroup.rotation.set(-0.14, 0.2, -0.08);
    scene.add(quantumGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.28, 4);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.24,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    quantumGroup.add(core);

    const innerGeometry = new THREE.IcosahedronGeometry(0.72, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    quantumGroup.add(innerCore);

    const ringGeometry = new THREE.TorusGeometry(2.05, 0.012, 8, 180);
    const ringMaterials = [GOLD, CYAN, VIOLET].map((color) => new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    const rings = ringMaterials.map((material, index) => {
      const ring = new THREE.Mesh(ringGeometry, material);
      ring.rotation.set(
        Math.PI * (0.18 + index * 0.26),
        Math.PI * (0.12 + index * 0.31),
        Math.PI * index * 0.2,
      );
      quantumGroup.add(ring);
      return ring;
    });

    const nodeCount = 180;
    const shapeTargets = SHAPES.map((shape) => createShapePositions(nodeCount, shape));
    const nodePositions = shapeTargets[0].slice();
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositionAttribute = new THREE.BufferAttribute(nodePositions, 3);
    nodeGeometry.setAttribute('position', nodePositionAttribute);
    const nodeMaterial = new THREE.PointsMaterial({
      color: CYAN,
      size: 0.065,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodeCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    quantumGroup.add(nodeCloud);

    const connectionPositions = new Float32Array(nodeCount * 12);
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositionAttribute = new THREE.BufferAttribute(connectionPositions, 3);
    connectionGeometry.setAttribute('position', connectionPositionAttribute);
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    quantumGroup.add(connections);

    const dustCount = 480;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      const radius = 3.1 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPositions[index * 3 + 1] = radius * Math.cos(phi) * 0.72;
      dustPositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: GOLD,
      size: 0.025,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const rippleGeometry = new THREE.RingGeometry(0.96, 1, 96);
    const rippleMaterial = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.visible = false;
    scene.add(ripple);

    const pointer = new THREE.Vector2();
    const targetRotation = new THREE.Vector2(-0.14, 0.2);
    let baseScale = 1.2;
    let shapeIndex = 0;
    let nextShapeAt = 8;
    let energy = 0;
    let answerEnergy = 0;
    let pulse = 0;
    let rippleLife = 0;
    let colorMix = 0;

    const selectShape = (index: number, holdSeconds = 7) => {
      shapeIndex = (index + SHAPES.length) % SHAPES.length;
      nextShapeAt = elapsedTime + holdSeconds;
      pulse = Math.max(pulse, 0.7);
    };

    const triggerRipple = (normalizedX = 0, normalizedY = 0) => {
      const vector = new THREE.Vector3(normalizedX, normalizedY, 0.5).unproject(camera);
      const direction = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / direction.z;
      const position = camera.position.clone().add(direction.multiplyScalar(distance));
      ripple.position.copy(position);
      ripple.scale.setScalar(0.12);
      rippleMaterial.opacity = 0.88;
      ripple.visible = true;
      rippleLife = 1;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      targetRotation.set(-0.14 + pointer.y * 0.22, 0.2 + pointer.x * 0.34);
      energy = Math.min(1, energy + 0.025);
    };

    const onPointerLeave = () => targetRotation.set(-0.14, 0.2);

    const onPointerDown = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      triggerRipple(normalizedX, normalizedY);
      energy = 1;
      pulse = 1;
      selectShape(shapeIndex + 1, 8);
    };

    const onQuestion = (event: Event) => {
      const detail = (event as CustomEvent<{ length?: number }>).detail;
      energy = Math.min(1.35, 0.8 + (detail?.length || 0) / 300);
      colorMix = 0.35;
      selectShape(1, 10);
      triggerRipple();
    };

    const onAnswerStart = () => {
      answerEnergy = 1;
      energy = 1;
      colorMix = 1;
      selectShape(2, 12);
    };

    const onAnswerToken = (event: Event) => {
      const detail = (event as CustomEvent<{ length?: number }>).detail;
      answerEnergy = Math.min(1.4, answerEnergy + 0.08 + (detail?.length || 0) / 220);
      pulse = Math.min(1.2, pulse + 0.08);
    };

    const onAnswerComplete = () => {
      answerEnergy = 0.35;
      energy = 1.1;
      colorMix = 0.55;
      selectShape(3, 8);
      triggerRipple();
    };

    const onAnswerError = () => {
      answerEnergy = 0;
      colorMix = 0;
      selectShape(0, 6);
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('quantum-ai-question', onQuestion);
    window.addEventListener('quantum-ai-answer-start', onAnswerStart);
    window.addEventListener('quantum-ai-answer-token', onAnswerToken);
    window.addEventListener('quantum-ai-answer-complete', onAnswerComplete);
    window.addEventListener('quantum-ai-answer-error', onAnswerError);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      baseScale = width < 640 ? 0.98 : 1.2;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    let animationFrame = 0;
    let elapsedTime = 0;

    const updateConnections = () => {
      for (let index = 0; index < nodeCount; index += 1) {
        const nextIndex = (index + 1) % nodeCount;
        const crossIndex = (index + 13) % nodeCount;
        const nodeOffset = index * 3;
        const nextOffset = nextIndex * 3;
        const crossOffset = crossIndex * 3;
        const connectionOffset = index * 12;

        connectionPositions[connectionOffset] = nodePositions[nodeOffset];
        connectionPositions[connectionOffset + 1] = nodePositions[nodeOffset + 1];
        connectionPositions[connectionOffset + 2] = nodePositions[nodeOffset + 2];
        connectionPositions[connectionOffset + 3] = nodePositions[nextOffset];
        connectionPositions[connectionOffset + 4] = nodePositions[nextOffset + 1];
        connectionPositions[connectionOffset + 5] = nodePositions[nextOffset + 2];
        connectionPositions[connectionOffset + 6] = nodePositions[nodeOffset];
        connectionPositions[connectionOffset + 7] = nodePositions[nodeOffset + 1];
        connectionPositions[connectionOffset + 8] = nodePositions[nodeOffset + 2];
        connectionPositions[connectionOffset + 9] = nodePositions[crossOffset];
        connectionPositions[connectionOffset + 10] = nodePositions[crossOffset + 1];
        connectionPositions[connectionOffset + 11] = nodePositions[crossOffset + 2];
      }
      connectionPositionAttribute.needsUpdate = true;
    };

    updateConnections();

    const render = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      elapsedTime += delta;

      if (elapsedTime >= nextShapeAt) selectShape(shapeIndex + 1, 7 + Math.random() * 4);

      energy = THREE.MathUtils.damp(energy, 0, 1.35, delta);
      answerEnergy = THREE.MathUtils.damp(answerEnergy, 0, 0.65, delta);
      pulse = THREE.MathUtils.damp(pulse, 0, 2.2, delta);
      colorMix = THREE.MathUtils.damp(colorMix, 0.18, 0.5, delta);

      quantumGroup.rotation.x = THREE.MathUtils.damp(quantumGroup.rotation.x, targetRotation.x, 3.5, delta);
      quantumGroup.rotation.y = THREE.MathUtils.damp(quantumGroup.rotation.y, targetRotation.y, 3.5, delta);
      quantumGroup.rotation.z = -0.08 + Math.sin(elapsedTime * 0.32) * 0.08;
      quantumGroup.position.x = THREE.MathUtils.damp(quantumGroup.position.x, pointer.x * 0.13, 2.5, delta);
      quantumGroup.position.y = THREE.MathUtils.damp(quantumGroup.position.y, pointer.y * 0.1, 2.5, delta);

      const breathing = 1 + Math.sin(elapsedTime * 0.82) * 0.075;
      const expansion = breathing + energy * 0.13 + pulse * 0.16;
      quantumGroup.scale.setScalar(baseScale * expansion);

      const shapeTarget = shapeTargets[shapeIndex];
      const morphSpeed = 1 - Math.exp(-delta * (1.5 + energy * 2.5));
      for (let index = 0; index < nodePositions.length; index += 3) {
        const particleIndex = index / 3;
        const wave = Math.sin(elapsedTime * 2.1 + particleIndex * 0.31) * (0.015 + answerEnergy * 0.035);
        nodePositions[index] += (shapeTarget[index] * (1 + wave) - nodePositions[index]) * morphSpeed;
        nodePositions[index + 1] += (shapeTarget[index + 1] * (1 + wave) - nodePositions[index + 1]) * morphSpeed;
        nodePositions[index + 2] += (shapeTarget[index + 2] * (1 + wave) - nodePositions[index + 2]) * morphSpeed;
      }
      nodePositionAttribute.needsUpdate = true;
      updateConnections();

      core.rotation.y = elapsedTime * (0.12 + answerEnergy * 0.22);
      core.rotation.x = elapsedTime * 0.07;
      core.scale.set(
        1 + Math.sin(elapsedTime * 1.1) * 0.08 + pulse * 0.12,
        1 + Math.cos(elapsedTime * 0.9) * 0.1 + energy * 0.08,
        1 + Math.sin(elapsedTime * 1.3) * 0.06 + answerEnergy * 0.1,
      );
      innerCore.rotation.y = -elapsedTime * (0.2 + answerEnergy * 0.35);
      innerCore.rotation.z = elapsedTime * 0.12;
      innerCore.scale.setScalar(1 + Math.sin(elapsedTime * (1.5 + answerEnergy)) * (0.1 + answerEnergy * 0.08));

      rings[0].rotation.z += delta * (0.22 + energy * 0.5);
      rings[1].rotation.x -= delta * (0.18 + answerEnergy * 0.55);
      rings[2].rotation.y += delta * (0.16 + energy * 0.4);
      rings.forEach((ring, index) => ring.scale.setScalar(1 + Math.sin(elapsedTime * 0.9 + index * 2.1) * 0.08 + pulse * 0.1));

      nodeCloud.rotation.y = elapsedTime * (0.045 + answerEnergy * 0.05);
      connections.rotation.y = nodeCloud.rotation.y;
      dust.rotation.y = -elapsedTime * (0.012 + energy * 0.01);
      dust.rotation.x = Math.sin(elapsedTime * 0.15) * 0.08;

      nodeMaterial.size = 0.065 + answerEnergy * 0.025 + pulse * 0.018;
      nodeMaterial.color.copy(CYAN).lerp(WHITE, Math.min(0.7, answerEnergy * 0.45));
      connectionMaterial.color.copy(VIOLET).lerp(CYAN, colorMix);
      connectionMaterial.opacity = 0.24 + energy * 0.2 + answerEnergy * 0.12;
      innerMaterial.opacity = 0.3 + answerEnergy * 0.24 + pulse * 0.1;
      coreMaterial.opacity = 0.2 + energy * 0.16;

      if (rippleLife > 0) {
        rippleLife = Math.max(0, rippleLife - delta * 0.75);
        const rippleProgress = 1 - rippleLife;
        ripple.scale.setScalar(0.12 + rippleProgress * 4.8);
        rippleMaterial.opacity = rippleLife * 0.78;
        ripple.visible = rippleLife > 0;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    if (reducedMotion) renderer.render(scene, camera);
    else render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('quantum-ai-question', onQuestion);
      window.removeEventListener('quantum-ai-answer-start', onAnswerStart);
      window.removeEventListener('quantum-ai-answer-token', onAnswerToken);
      window.removeEventListener('quantum-ai-answer-complete', onAnswerComplete);
      window.removeEventListener('quantum-ai-answer-error', onAnswerError);
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterials.forEach((material) => material.dispose());
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      rippleGeometry.dispose();
      rippleMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className={`pointer-events-auto cursor-crosshair ${className}`} aria-hidden="true" />;
}
