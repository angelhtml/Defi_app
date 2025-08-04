'use client'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { BufferGeometry, Float32BufferAttribute } from 'three'

// Particle component
function FloatingParticles({ count = 2000 }) {
  const particlesRef = useRef()
  const particlesGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50
    }
    
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geometry
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005
      particlesRef.current.rotation.y += 0.0005
    }
  })

  return (
    <Points ref={particlesRef} positions={particlesGeometry.attributes.position.array}>
      <PointMaterial 
        transparent
        color="#00a2ff"
        size={0.02}
        sizeAttenuation={true}
        opacity={0.8}
        alphaTest={0.01}
      />
    </Points>
  )
}

function Model({ url }) {
  const group = useRef()
  const { scene } = useGLTF(url)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (mousePosition.x * Math.PI - group.current.rotation.y) * 0.1
      group.current.rotation.x += (mousePosition.y * Math.PI * 0.5 - group.current.rotation.x) * 0.1
    }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.sub(center)
      scene.scale.set(4, 4, 4)
      
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          child.material.envMapIntensity = 0.8
        }
      })
    }
  }, [scene])

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

export default function SpaceViewer({ modelUrl }) {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Canvas
      style={{width:"100vw",height:"100vh"}}
        shadows
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Dark Space Background */}
        <color attach="background" args={["black"]} />
        
        {/* Animated Particles */}
        <FloatingParticles count={30000} />
        
        {/* Lighting */}
        <ambientLight intensity={0.1} color="#f0f" />
        {<directionalLight
          position={[5, 10, 7]}
          intensity={1.5}
          color="#f0f"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />}

        
        {/* Model */}
        <Model url={modelUrl} />
        
        {/* Environment Effects */}
        {<Environment preset="night" background={false} blur={1} />}
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    
    </div>
  )
}