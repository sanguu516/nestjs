import { NextResponse, type NextRequest } from 'next/server'
import { getRealEstateData } from './apis/realEstateApis'

export const middleware = async (request: NextRequest) => {
  const [_x, _y, id, seo_key] = decodeURI(request.nextUrl.pathname).split('/')
  if (_y === 'real-estate' && Number(id) > 0) {
    const agencyData = await getRealEstateData(Number(id))
    if (agencyData.seo_key !== seo_key) {
      return NextResponse.redirect(new URL(`/real-estate/${id}/${agencyData.seo_key}`, request.url))
    }
  }
}

export const config = {
  matcher: '/real-estate/:id*',
}
