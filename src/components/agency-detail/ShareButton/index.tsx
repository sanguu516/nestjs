import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import KakaoShare from '@/components/agency-detail/ShareButton/kakao'
import UrlShare from '@/components/agency-detail/ShareButton/url'
import { IconShare } from '@/assets/icons'

export interface AgencyShareData {
  title: string
  text: string
  image?: string
}

function ShareButton({ shareData }: { shareData: AgencyShareData }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button border="none" w="12">
          <IconShare width={20} height={20} color="black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="auto">
        <PopoverArrow left="9px" />
        <PopoverBody display="flex" alignItems="center" gap={1}>
          <UrlShare shareData={shareData} />
          <KakaoShare />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ShareButton
