import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Stage, Grid } from '@react-three/drei';
import { useCallback, useEffect } from 'react';
import * as THREE from 'three';
import GarmentModel from './GarmentModel';

function ExportButton() {
  const { gl, scene, camera } = useThree();
  const onExport = useCallback(() => {
    gl.render(scene, camera);
    const url = gl.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garment.png';
    a.click();
  }, [gl, scene, camera]);
  useEffect(() => {
    const handler = () => onExport();
    document.addEventListener('export-png', handler);
    return () => document.removeEventListener('export-png', handler);
  }, [onExport]);
  return null;
}

export default function Viewer3D({ garment, colors, fabric, pattern, style, measurements, personalization }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 1.6, 5], fov: 50 }} shadows dpr={[1, 2]} gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
        <color attach="background" args={garment === 'pants' ? [0.08, 0.08, 0.09] : [0.96, 0.94, 0.92]} />
        {garment === 'pants' ? (
          <fog attach="fog" args={[new THREE.Color(0.08, 0.08, 0.09), 8, 22]} />
        ) : (
          <fog attach="fog" args={[new THREE.Color(0.96, 0.94, 0.92), 10, 30]} />
        )}
        <Stage intensity={0.6} environment="studio" adjustCamera={false} shadows="accumulative">
          <GarmentModel garment={garment} colors={colors} fabric={fabric} pattern={pattern} style={style} measurements={measurements} personalization={personalization} />
        </Stage>
        <directionalLight position={[4, 6, -3]} intensity={0.6} color={garment === 'pants' ? '#b0c7ff' : '#bcd0ff'} />
        <directionalLight position={[-5, 3, 5]} intensity={0.3} color={garment === 'pants' ? '#ffd6b3' : '#ffddb7'} />
        {garment === 'pants' && (
          <Grid args={[10, 10]} position={[0, -0.001, 0]} cellSize={0.6} cellThickness={0.8} sectionSize={3.6} sectionThickness={1.2} fadeDistance={20} fadeStrength={1} infiniteGrid />
        )}
        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2.6} far={4.5} />
        <OrbitControls enablePan={false} />
        <Environment preset="studio" />
        <ExportButton />
      </Canvas>
    </div>
  );
}
