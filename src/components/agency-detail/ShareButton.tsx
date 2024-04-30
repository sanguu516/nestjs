import { IconArrowDown, IconShare } from '@/assets/icons'
import { IconButton } from '@chakra-ui/react'
import CustomIConButton from '../CustomIconButton'

export interface AgencyShareData {
  title: string
  text: string
  image: string
}

function ShareButton({ shareData }: { shareData: AgencyShareData }) {
  const handleShare = async () => {
    const canUseShareApi =
      typeof window !== 'undefined' &&
      window.navigator.canShare &&
      window.navigator.canShare(shareData)

    // Consider other share methods when share api is not available.
    if (!canUseShareApi) {
      await window.navigator.clipboard.writeText(location.href)
      alert('클립보드에 복사되었습니다.')
      return
    }

    const data = {
      title: shareData.title,
      text: shareData.text,
      url: location.href,
    }
    void window.navigator.share(data)
  }
  return (
    <CustomIConButton
      variant="tertiary"
      onClick={handleShare}
      aria-label="share"
      size="sm"
      icon={<IconShare width={24} height={24} color="black" />}
      sx={{ mx: 2.5 }}
    />
  )
}

export default ShareButton
