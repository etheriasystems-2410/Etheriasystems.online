import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type QuantumFieldProps = {
  className?: string;
};

const GOLD = new THREE.Color('#c9a227');
const CYAN = new THREE.Color('#00e5e5');
const VIOLET = new THREE.Color('#8b5cf6');

export default function QuantumField({ className = '' }: QuantumFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const quantumGroup = new THREE.Group();
    quantumGroup.rotation.set(-0.14, 0.2, -0.08);
    scene.add(quantumGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.28, 4);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.16,
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
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    quantumGroup.add(innerCore);

    const ringGeometry = new THREE.TorusGeometry(2.05, 0.012, 8, 180);
    const ringMaterials = [GOLD, CYAN, VIOLET].map((color) => new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.42,
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

    const nodeCount = 74;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodes: THREE.Vector3[] = [];
    for (let index = 0; index < nodeCount; index += 1) {
      const radius = 1.45 + Math.random() * 1.55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const node = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
      nodes.push(node);
      node.toArray(nodePositions, index * 3);
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: CYAN,
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodeCloud = new THREE.Points(nodeGeometry, nodeMaterial);
    quantumGroup.add(nodeCloud);

    const connectionPositions: number[] = [];
    nodes.forEach((node, index) => {
      for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
        const otherNode = nodes[otherIndex];
        if (node.distanceTo(otherNode) < 0.82) {
          connectionPositions.push(node.x, node.y, node.z, otherNode.x, otherNode.y, otherNode.z);
        }
      }
    });
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.17,
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
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const pointer = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
      targetRotation.set(pointer.y * 0.16, pointer.x * 0.24);
    };
    container.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      quantumGroup.scale.setScalar(width < 640 ? 0.78 : 1);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();
    let animationFrame = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      quantumGroup.rotation.x += (targetRotation.x - quantumGroup.rotation.x) * 0.025;
      quantumGroup.rotation.y += (targetRotation.y - quantumGroup.rotation.y) * 0.025;
      quantumGroup.rotation.z = -0.08 + Math.sin(elapsed * 0.22) * 0.05;
      core.rotation.y = elapsed * 0.09;
      core.rotation.x = elapsed * 0.055;
      innerCore.rotation.y = -elapsed * 0.16;
      innerCore.scale.setScalar(1 + Math.sin(elapsed * 1.35) * 0.08);
      rings[0].rotation.z += 0.0018;
      rings[1].rotation.x -= 0.0014;
      rings[2].rotation.y += 0.0012;
      nodeCloud.rotation.y = elapsed * 0.025;
      connections.rotation.y = elapsed * 0.025;
      dust.rotation.y = -elapsed * 0.008;
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    if (reducedMotion) renderer.render(scene, camera);
    else render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
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
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className={`pointer-events-auto ${className}`} aria-hidden="true" />;
}
