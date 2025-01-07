'use client'
import { type AnimationProps, motion } from 'framer-motion'

const animationProps = {
    initial: { '--x': '100%', 'scale': 0.8 },
    animate: { '--x': '-100%', 'scale': 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: 'spring',
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
} as AnimationProps

export function ShinyButton({ text = 'shiny-button' }) {
    return (
        <motion.button
            {...animationProps}
            className="relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            <span
                className="relative block size-full text-sm uppercase tracking-wide font-light text-white"
                style={{
                    maskImage:
                        'linear-gradient(-75deg, rgba(255,255,255,1) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(255,255,255,1) calc(var(--x) + 100%))',
                    WebkitMaskImage:
                        'linear-gradient(-75deg, rgba(255,255,255,1) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgba(255,255,255,1) calc(var(--x) + 100%))',
                }}
            >
                {text}
            </span>
            <span
                style={{
                    mask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
                    WebkitMask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'exclude',
                }}
                className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.2)_calc(var(--x)+20%),rgba(255,255,255,0.6)_calc(var(--x)+25%),rgba(255,255,255,0.2)_calc(var(--x)+100%))] p-px"
            >
            </span>
        </motion.button>
    )
}