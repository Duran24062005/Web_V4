import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, ChromaticAberration, EffectComposer, Noise, Scanline, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import type { GfxTier } from '../../experience/gfx'
import { pointer } from '../../experience/motion/pointer'
import { addTick } from '../../experience/motion/runtime'
import { heroScroll } from './heroScroll'

/**
 * EP.00 backdrop: a holographic torus-knot "data crystal" floating over a synthwave grid in
 * neon rain. Reacts to the mouse (camera rig) and to scroll (spin, rise, dolly).
 * Loaded lazily; frames are driven by the shared GSAP ticker (frameloop="never") and stop
 * while the hero is off screen. Post-processing only on the `full` tier.
 */
const CYAN = new THREE.Color('#00f0ff')
const MAGENTA = new THREE.Color('#ff2bd6')
const VIOLET = new THREE.Color('#7b2ff7')
const VOID = '#07060f'

interface HeroSceneProps {
  tier: Exclude<GfxTier, 'off'>
  /** false under reduced motion: one still frame, no loop. */
  animate: boolean
  /** false while the hero is scrolled out of view. */
  running: boolean
  onReady: () => void
}

export default function HeroScene({ tier, animate, running, onReady }: HeroSceneProps) {
  return (
    <Canvas
      className="yk-hero-canvas"
      dpr={tier === 'full' ? [1, 1.75] : [1, 1.25]}
      frameloop={animate ? 'never' : 'demand'}
      camera={{ position: [0, 0.3, 7.5], fov: 40, near: 0.1, far: 60 }}
      gl={{ antialias: tier !== 'full', powerPreference: 'high-performance', alpha: false, stencil: false }}
      onCreated={onReady}
    >
      <color attach="background" args={[VOID]} />
      {animate ? <TickerDriver running={running} /> : null}
      <CameraRig />
      <Crystal tier={tier} />
      <GridFloor />
      <Rain count={tier === 'full' ? 1100 : 420} />
      {tier === 'full' ? <Effects /> : null}
    </Canvas>
  )
}

/** Renders a frame on every tick of the shared GSAP loop — one rAF for the whole site. */
const TickerDriver = ({ running }: { running: boolean }) => {
  const advance = useThree((state) => state.advance)

  useEffect(() => {
    if (!running) {
      return
    }
    return addTick(() => advance(performance.now()))
  }, [running, advance])

  return null
}

const CameraRig = () => {
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((state, delta) => {
    const scroll = heroScroll.progress
    const camera = state.camera
    const ease = 1 - Math.exp(-Math.min(delta, 0.1) * 3)
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * ease
    camera.position.y += (0.3 + pointer.y * 0.35 + scroll * 0.9 - camera.position.y) * ease
    camera.position.z += (7.5 + scroll * 2.8 - camera.position.z) * ease
    camera.lookAt(target)
  })

  return null
}

/* ----- Holographic crystal --------------------------------------------------- */

const crystalVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  void main() {
    vec3 p = position + normal * sin(position.y * 3.0 + uTime * 1.6) * 0.035;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    vPos = p;
    gl_Position = projectionMatrix * mv;
  }
`

const crystalFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCyan;
  uniform vec3 uMagenta;
  uniform vec3 uViolet;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  void main() {
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - clamp(abs(dot(n, normalize(vView))), 0.0, 1.0), 2.4);
    float bands = smoothstep(0.82, 1.0, sin(vPos.y * 18.0 - uTime * 2.4) * 0.5 + 0.5);
    float shift = sin(vPos.x * 1.7 + vPos.z * 1.3 + uTime * 0.7) * 0.5 + 0.5;
    vec3 color = mix(uCyan, uMagenta, shift);
    color = mix(color, uViolet, (1.0 - fresnel) * 0.55);
    float alpha = clamp(0.07 + fresnel * 0.85 + bands * 0.25, 0.0, 1.0);
    gl_FragColor = vec4(color * (0.35 + fresnel * 1.6 + bands * 0.9), alpha);
  }
`

const createCrystalMaterial = () =>
  new THREE.ShaderMaterial({
    vertexShader: crystalVertex,
    fragmentShader: crystalFragment,
    uniforms: { uTime: { value: 0 }, uCyan: { value: CYAN }, uMagenta: { value: MAGENTA }, uViolet: { value: VIOLET } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  })

/** Sets `uTime` on a mesh's shader material. Goes through the ref so hook values stay immutable. */
const setShaderTime = (object: THREE.Mesh | THREE.LineSegments | null, time: number) => {
  const material = object?.material
  if (material instanceof THREE.ShaderMaterial) {
    material.uniforms.uTime.value = time
  }
}

const Crystal = ({ tier }: { tier: HeroSceneProps['tier'] }) => {
  const group = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)
  // Two-column hero (≥1024px, same breakpoint as the CSS): sit behind the portrait panel as an aura.
  const wide = useThree((state) => state.size.width >= 1024)
  const worldWidth = useThree((state) => state.viewport.width)

  const material = useMemo(() => createCrystalMaterial(), [])
  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(1.15, 0.34, tier === 'full' ? 260 : 160, tier === 'full' ? 36 : 20, 2, 3),
    [tier],
  )
  const wire = useMemo(() => new THREE.TorusKnotGeometry(1.15, 0.34, 96, 10, 2, 3), [])

  useEffect(
    () => () => {
      material.dispose()
      geometry.dispose()
      wire.dispose()
    },
    [material, geometry, wire],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const scroll = heroScroll.progress
    setShaderTime(shell.current, t)

    if (group.current) {
      group.current.rotation.y += delta * (0.22 + scroll * 1.8)
      group.current.rotation.x += delta * 0.07
      group.current.rotation.z += (pointer.x * 0.3 - group.current.rotation.z) * Math.min(1, delta * 2)
      group.current.position.y = (wide ? 0.15 : 1.1) + Math.sin(t * 0.8) * 0.12 + scroll * 1.4
    }
    if (core.current) {
      core.current.rotation.x -= delta * 0.6
      core.current.rotation.y -= delta * 0.9
      core.current.scale.setScalar(0.42 + Math.sin(t * 2.2) * 0.04)
    }
  })

  return (
    <group ref={group} position={[wide ? worldWidth * 0.28 : 0, 0.15, wide ? -0.6 : -1.5]} scale={wide ? 1.05 : 0.8}>
      <mesh ref={shell} geometry={geometry} material={material} />
      <mesh geometry={wire} scale={1.035}>
        <meshBasicMaterial
          wireframe
          color={VIOLET}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial wireframe color={MAGENTA} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

/* ----- Synthwave grid ------------------------------------------------------- */

const gridVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const gridFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMajor;
  uniform vec3 uMinor;
  varying vec3 vWorld;

  float gridLine(vec2 coord) {
    vec2 g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  void main() {
    vec2 c = vWorld.xz;
    c.y -= uTime * 1.1;
    float minor = gridLine(c);
    float major = gridLine(c / 4.0);
    float fade = smoothstep(28.0, 2.0, length(vWorld.xz));
    vec3 color = mix(uMinor, uMajor, major);
    gl_FragColor = vec4(color * (1.0 + major * 0.8), (minor * 0.28 + major * 0.85) * fade);
  }
`

const createGridMaterial = () =>
  new THREE.ShaderMaterial({
    vertexShader: gridVertex,
    fragmentShader: gridFragment,
    uniforms: { uTime: { value: 0 }, uMajor: { value: MAGENTA }, uMinor: { value: VIOLET } },
    transparent: true,
    depthWrite: false,
  })

const GridFloor = () => {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useMemo(() => createGridMaterial(), [])

  useEffect(() => () => material.dispose(), [material])
  useFrame((state) => setShaderTime(mesh.current, state.clock.elapsedTime))

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, -8]} material={material}>
      <planeGeometry args={[90, 70]} />
    </mesh>
  )
}

/* ----- Neon rain (GPU-animated line segments) -------------------------------- */

const rainVertex = /* glsl */ `
  uniform float uTime;
  uniform float uHeight;
  attribute vec3 aSeed;
  attribute float aSpeed;
  attribute float aEnd;
  attribute float aTint;
  varying float vFade;
  varying float vTint;

  void main() {
    float y = uHeight * 0.5 - mod(aSeed.z * uHeight + uTime * aSpeed, uHeight);
    y += aEnd * aSpeed * 0.07;
    vec3 p = vec3(aSeed.x + y * 0.07, y, aSeed.y);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = (1.0 - aEnd) * smoothstep(30.0, 5.0, -mv.z);
    vTint = aTint;
    gl_Position = projectionMatrix * mv;
  }
`

const rainFragment = /* glsl */ `
  uniform vec3 uCyan;
  uniform vec3 uMagenta;
  varying float vFade;
  varying float vTint;
  void main() {
    gl_FragColor = vec4(mix(uCyan, uMagenta, step(0.82, vTint)), vFade * 0.55);
  }
`

/** Random drop positions, speeds and tints; runs once per `count`, outside render. */
const createRain = (count: number) => {
  const seeds = new Float32Array(count * 2 * 3)
  const speeds = new Float32Array(count * 2)
  const ends = new Float32Array(count * 2)
  const tints = new Float32Array(count * 2)

  for (let i = 0; i < count; i += 1) {
    const x = (Math.random() - 0.5) * 28
    const z = -18 + Math.random() * 22
    const phase = Math.random()
    const speed = 6 + Math.random() * 7
    const tint = Math.random()
    for (let v = 0; v < 2; v += 1) {
      const index = i * 2 + v
      seeds.set([x, z, phase], index * 3)
      speeds[index] = speed
      ends[index] = v
      tints[index] = tint
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 2 * 3), 3))
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3))
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
  geometry.setAttribute('aEnd', new THREE.BufferAttribute(ends, 1))
  geometry.setAttribute('aTint', new THREE.BufferAttribute(tints, 1))

  const material = new THREE.ShaderMaterial({
    vertexShader: rainVertex,
    fragmentShader: rainFragment,
    uniforms: { uTime: { value: 0 }, uHeight: { value: 16 }, uCyan: { value: CYAN }, uMagenta: { value: MAGENTA } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return { geometry, material }
}

const Rain = ({ count }: { count: number }) => {
  const lines = useRef<THREE.LineSegments>(null)
  const { geometry, material } = useMemo(() => createRain(count), [count])

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((state) => setShaderTime(lines.current, state.clock.elapsedTime))

  return <lineSegments ref={lines} geometry={geometry} material={material} frustumCulled={false} />
}

/* ----- Post-processing (full tier only) ----------------------------------------- */

const Effects = () => {
  const offset = useMemo(() => new THREE.Vector2(0.0011, 0.0007), [])

  return (
    <EffectComposer multisampling={4}>
      <Bloom mipmapBlur intensity={1.25} luminanceThreshold={0.12} luminanceSmoothing={0.35} radius={0.75} />
      <ChromaticAberration offset={offset} radialModulation={false} modulationOffset={0} />
      <Scanline density={1.35} opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
      <Noise opacity={0.05} premultiply />
      <Vignette offset={0.25} darkness={0.8} />
    </EffectComposer>
  )
}
