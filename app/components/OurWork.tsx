"use client"
import CircularGallery from './CircularGallery'

export default function OurWork(){
return (

<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
</div>
)
}