import { Box, Button, Slide } from '@chakra-ui/react'
import { type InferGetStaticPropsType } from 'next'
import Script from 'next/script'
import { useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

export function getStaticProps() {
  const kakaoMapSdkSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY!}&autoload=false`
  return {
    props: {
      kakaoMapSdkSrc,
    },
  }
}

function MapTest({ kakaoMapSdkSrc }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const mapRef = useRef<kakao.maps.Map | null>(null)

  return (
    <Box sx={{ position: 'relative', width: '100dvw', height: '100dvh' }}>
      {/* TODO: Consider moving it to document */}
      <Script src={kakaoMapSdkSrc} strategy="beforeInteractive" />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 2,
        }}
      >
        <Map
          ref={mapRef}
          onZoomChanged={(target) => {
            console.log('current Zoom: ', target.getLevel())
          }}
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <MapMarker
            onClick={() => {
              mapRef.current?.setLevel(mapRef.current?.getLevel() + 1)
            }}
            position={{ lat: 33.55635, lng: 126.795841 }}
          ></MapMarker>
        </Map>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <Button
          sx={{ position: 'absolute', top: 40, left: 0, width: 100, height: 100, zIndex: 2 }}
          onClick={() => {
            setDrawerOpen((prev) => !prev)
          }}
        >
          Floating
        </Button>
        <Slide
          in={isDrawerOpen}
          direction="bottom"
          style={{
            position: 'absolute',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              height: 400,
              bgColor: 'lightgray',
            }}
          ></Box>
        </Slide>
      </Box>
    </Box>
  )
}

export default MapTest
